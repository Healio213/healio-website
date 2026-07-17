import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { damp, disposeObject3D, easeOutCubic } from './sceneShared';

const HeroWebGLCanvas = ({
  createExperience,
  onReady,
  onError,
  className = '',
  trackScroll = false,
}) => {
  const canvasRef = useRef(null);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !trackScroll) {
      scrollProgressRef.current = 0;
      return undefined;
    }

    const container = canvas.parentElement || canvas;
    const updateScrollProgress = () => {
      const rect = container.getBoundingClientRect();
      const travel = Math.max(window.innerHeight * 0.78, rect.height * 0.86, 1);
      scrollProgressRef.current = Math.min(
        Math.max((-rect.top + (window.innerHeight * 0.12)) / travel, 0),
        1
      );
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [trackScroll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof createExperience !== 'function') return undefined;

    const sizeTarget = canvas.parentElement || canvas;
    const isSmallViewport = window.matchMedia('(max-width: 767px)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    let renderer;
    let experience;
    let resizeObserver;
    let intersectionObserver;
    let frameId = null;
    let lastFrameTime = null;
    let elapsed = 0;
    let isIntersecting = false;
    let disposed = false;
    let didSignalReady = false;
    let didSignalError = false;

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    const reportError = (error) => {
      if (didSignalError) return;
      didSignalError = true;
      onErrorRef.current?.(error);
    };

    const stopAnimation = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      lastFrameTime = null;
    };

    const canAnimate = () => !disposed && !didSignalError && isIntersecting && !document.hidden;

    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      stopAnimation();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);

      try {
        experience?.dispose?.();
      } catch (error) {
        reportError(error);
      }

      disposeObject3D(scene);
      scene.background?.dispose?.();
      if (scene.environment !== scene.background) scene.environment?.dispose?.();
      scene.clear();
      renderer?.renderLists?.dispose?.();
      if (renderer) renderer.dispose();
    };

    const resize = () => {
      const bounds = sizeTarget.getBoundingClientRect();
      const width = Math.max(Math.round(bounds.width || canvas.clientWidth || 1), 1);
      const height = Math.max(Math.round(bounds.height || canvas.clientHeight || 1), 1);
      const currentIsSmall = window.matchMedia('(max-width: 767px)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, currentIsSmall ? 1.25 : 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      experience?.resize?.({ width, height });
    };

    const handleResize = () => {
      if (disposed || didSignalError) return;
      try {
        resize();
      } catch (error) {
        stopAnimation();
        reportError(error);
      }
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      pointerTarget.x = (((event.clientX - bounds.left) / bounds.width) * 2) - 1;
      pointerTarget.y = 1 - (((event.clientY - bounds.top) / bounds.height) * 2);
    };

    const handlePointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    let renderFrame;

    const startAnimation = () => {
      if (!canAnimate() || frameId !== null) return;
      frameId = requestAnimationFrame(renderFrame);
    };

    const refreshAnimation = () => {
      if (canAnimate()) startAnimation();
      else stopAnimation();
    };

    const handleVisibilityChange = () => {
      refreshAnimation();
    };

    renderFrame = (time) => {
      frameId = null;
      if (!canAnimate()) return;

      const delta = lastFrameTime === null ? 0 : Math.min((time - lastFrameTime) / 1000, 0.1);
      lastFrameTime = time;
      elapsed += delta;
      pointer.x = damp(pointer.x, pointerTarget.x, 0.08);
      pointer.y = damp(pointer.y, pointerTarget.y, 0.08);

      try {
        experience.update({
          elapsed,
          delta,
          introProgress: easeOutCubic(Math.min(elapsed / 1.2, 1)),
          pointer,
          scrollProgress: scrollProgressRef.current,
        });
        renderer.render(scene, camera);
        if (!didSignalReady) {
          didSignalReady = true;
          onReadyRef.current?.();
        }
      } catch (error) {
        stopAnimation();
        reportError(error);
        return;
      }

      startAnimation();
    };

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallViewport ? 1.25 : 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);

      experience = createExperience({ THREE, scene, camera, renderer, isSmallViewport });
      resizeObserver = new ResizeObserver(handleResize);
      intersectionObserver = new IntersectionObserver(([entry]) => {
        isIntersecting = Boolean(entry?.isIntersecting);
        refreshAnimation();
      });

      resizeObserver.observe(sizeTarget);
      intersectionObserver.observe(canvas);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
      canvas.addEventListener('pointerleave', handlePointerLeave);
      resize();
    } catch (error) {
      reportError(error);
      cleanup();
    }

    return cleanup;
  }, [createExperience]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`.trim()}
    />
  );
};

export default HeroWebGLCanvas;
