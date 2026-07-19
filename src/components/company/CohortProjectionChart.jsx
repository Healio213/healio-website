import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const desktopChart = {
  left: 100,
  top: 46,
  width: 570,
  height: 232,
};

const mobileChart = {
  left: 58,
  top: 18,
  width: 278,
  height: 148,
};

const toLinePath = (points) => points
  .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
  .join(' ');

const buildProjection = (series, dimensions, tickStep) => {
  const maxValue = Math.max(
    ...series.flatMap((point) => [point.scenarioA, point.scenarioB, point.contributions]),
    1
  );
  const paddedMax = maxValue * 1.08;
  const lastElapsedYear = Math.max(series.at(-1)?.elapsedYears ?? 1, 1);
  const project = (value, elapsedYears) => ({
    x: dimensions.left + (elapsedYears / lastElapsedYear) * dimensions.width,
    y: dimensions.top + dimensions.height - (value / paddedMax) * dimensions.height,
  });
  const scenarioA = series.map((point) => project(point.scenarioA, point.elapsedYears));
  const scenarioB = series.map((point) => project(point.scenarioB, point.elapsedYears));
  const contributions = series.map((point) => project(point.contributions, point.elapsedYears));
  const differenceArea = `${toLinePath(scenarioB)} ${scenarioA
    .slice()
    .reverse()
    .map((point) => `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ')} Z`;

  const tickYears = Array.from(new Set([
    0,
    ...Array.from({ length: Math.floor(lastElapsedYear / tickStep) }, (_, index) => (index + 1) * tickStep),
    lastElapsedYear,
  ])).filter((value) => value <= lastElapsedYear);

  return {
    scenarioAPath: toLinePath(scenarioA),
    scenarioBPath: toLinePath(scenarioB),
    contributionsPath: toLinePath(contributions),
    differenceArea,
    yTicks: [0, 0.5, 1].map((ratio) => ({
      y: dimensions.top + dimensions.height - ratio * dimensions.height,
      value: paddedMax * ratio,
    })),
    xTicks: tickYears.map((elapsedYears) => ({
      x: dimensions.left + (elapsedYears / lastElapsedYear) * dimensions.width,
      year: series[0].year + elapsedYears,
    })),
  };
};

const CohortProjectionChart = ({
  series,
  ariaLabel,
  scenarioALabel,
  scenarioBLabel,
  contributionsLabel,
  formatAxisValue,
  formatMobileAxisValue,
}) => {
  const reducedMotion = useReducedMotion();
  const projections = useMemo(() => ({
    desktop: buildProjection(series, desktopChart, 5),
    mobile: buildProjection(series, mobileChart, 10),
  }), [series]);

  const pathAnimation = reducedMotion
    ? { initial: false, whileInView: { pathLength: 1, opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { pathLength: 0, opacity: 0.2 },
        whileInView: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
      };

  const renderProjection = ({ projection, dimensions, viewBox, className, gradientId, fontSize, axisFormatter }) => (
    <svg
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#25c990" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#25c990" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {projection.yTicks.map((tick) => (
        <g key={tick.y}>
          <line x1={dimensions.left} x2={dimensions.left + dimensions.width} y1={tick.y} y2={tick.y} stroke="rgba(255,255,255,0.1)" />
          <text x={dimensions.left - 10} y={tick.y + 4} textAnchor="end" fill="rgba(226,232,240,0.62)" fontSize={fontSize}>
            {axisFormatter(tick.value)}
          </text>
        </g>
      ))}

      {projection.xTicks.map((tick) => (
        <g key={tick.year}>
          <line x1={tick.x} x2={tick.x} y1={dimensions.top} y2={dimensions.top + dimensions.height} stroke="rgba(255,255,255,0.055)" />
          <text x={tick.x} y={dimensions.top + dimensions.height + 24} textAnchor="middle" fill="rgba(226,232,240,0.65)" fontSize={fontSize}>
            {tick.year}
          </text>
        </g>
      ))}

      <motion.path
        d={projection.differenceArea}
        fill={`url(#${gradientId})`}
        initial={reducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.35 }}
      />
      <motion.path
        d={projection.contributionsPath}
        fill="none"
        stroke="rgba(148,163,184,0.72)"
        strokeDasharray="6 7"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        {...pathAnimation}
        viewport={{ once: true, amount: 0.35 }}
      />
      <motion.path
        d={projection.scenarioAPath}
        fill="none"
        stroke="#d8e1e5"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        {...pathAnimation}
        viewport={{ once: true, amount: 0.35 }}
      />
      <motion.path
        d={projection.scenarioBPath}
        fill="none"
        stroke="#25c990"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        {...pathAnimation}
        transition={{ ...pathAnimation.transition, delay: reducedMotion ? 0 : 0.12 }}
        viewport={{ once: true, amount: 0.35 }}
      />
    </svg>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#071821] p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.13em] text-slate-300">
        <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 bg-[#25c990]" />{scenarioBLabel}</span>
        <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 bg-slate-300" />{scenarioALabel}</span>
        <span className="inline-flex items-center gap-2"><span className="h-px w-5 border-t border-dashed border-slate-500" />{contributionsLabel}</span>
      </div>

      {renderProjection({
        projection: projections.mobile,
        dimensions: mobileChart,
        viewBox: '0 0 360 210',
        className: 'block h-auto w-full sm:hidden',
        gradientId: 'company-projection-difference-mobile',
        fontSize: 13,
        axisFormatter: formatMobileAxisValue || formatAxisValue,
      })}
      {renderProjection({
        projection: projections.desktop,
        dimensions: desktopChart,
        viewBox: '0 0 760 330',
        className: 'hidden h-auto w-full sm:block',
        gradientId: 'company-projection-difference-desktop',
        fontSize: 11,
        axisFormatter: formatAxisValue,
      })}
    </div>
  );
};

export default CohortProjectionChart;
