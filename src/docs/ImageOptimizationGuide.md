# Image Optimization Guide

This guide outlines best practices for optimizing images in this React application to ensure fast load times, improved SEO, and a better user experience.

## 1. Converting Existing Images to WebP Format

WebP provides superior lossless and lossy compression for images on the web compared to traditional formats like JPEG and PNG.

**Instructions:**
- Use tools like Squoosh (https://squoosh.app/) or online batch converters to convert existing `.jpg` and `.png` files to `.webp`.
- **Quality Settings:** For most hero and background images, a lossy compression setting of `75-80%` is recommended to balance visual quality and file size.
- Ensure you keep the original files backed up if further editing is needed.

## 2. Using the `OptimizedImage` Component

We have introduced an `<OptimizedImage />` component that handles responsive sizing and lazy loading automatically.

**Usage Example:**