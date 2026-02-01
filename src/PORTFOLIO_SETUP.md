# Portfolio Setup Instructions

## Adding Your Real Content

This portfolio is ready to accept your real video content. Follow these steps:

### 1. Update Portfolio Data

Open `/data/portfolio-data.ts` and replace the placeholder videos with your actual content:

```typescript
export const portfolioVideos: PortfolioVideo[] = [
  {
    id: '1',
    title: 'Your Project Title',
    videoUrl: '/path/to/your/video.mp4', // or external URL
    thumbnailUrl: '/path/to/thumbnail.jpg', // or Unsplash URL
    niche: ['Finance'], // Choose from: General, Finance, Fitness, Education
    editingStyle: ['Motion Graphics'], // Choose from: Motion Graphics, Documentary Style, Talking Head
    featured: true, // Set to true for "Best Of" section
  },
  // Add more videos...
];
```

### 2. Video File Storage

**Option A: External Hosting (Recommended)**
- Upload videos to YouTube, Vimeo, or a CDN
- Use direct video URLs in `videoUrl`

**Option B: Local Files**
- Place video files in a `/public/videos/` folder
- Reference as `/videos/your-video.mp4`

### 3. Thumbnail Images

**Option A: Use Unsplash (Current)**
- Already configured
- Replace with relevant search terms or specific URLs

**Option B: Custom Thumbnails**
- Place images in `/public/thumbnails/`
- Reference as `/thumbnails/your-thumbnail.jpg`

### 4. Filtering System

Videos are filtered by:
- **Niche**: General, Finance, Fitness, Education
- **Editing Style**: Motion Graphics, Documentary Style, Talking Head

Each video can have multiple tags for both categories.

### 5. Featured Section

Mark your best 3-4 videos with `featured: true` to display them in the "Best Of" section.

### 6. Contact Information

Already configured with:
- Email: jenishop001@gmail.com
- Instagram: @jenish_unfiltered
- LinkedIn: jenish-patel-5aa93420a
- YouTube: @Great_mindse7

Update in `/data/portfolio-data.ts` if needed.

### 7. Color Accent

Current accent: **Muted Crimson** (#8b4a5a)

To change to **Soft Blue**:
1. Open `/styles/globals.css`
2. Change `--accent: #8b4a5a;` to `--accent: #6b8c9a;`

### 8. Performance Tips

- Keep video file sizes optimized (under 50MB recommended)
- Use poster images for faster loading
- Consider lazy loading for large portfolios
- Use external CDN hosting for production

## Project Structure

```
/data
  portfolio-data.ts          ← Main content file

/components
  Background3D.tsx           ← Subtle 3D background element
  GlassNavigation.tsx        ← Fixed navigation with glassmorphism
  HeroSection.tsx            ← Landing hero with name and CTA
  FeaturedSection.tsx        ← "Best Of" curated videos
  PortfolioGrid.tsx          ← Full portfolio with filtering
  FilterPanel.tsx            ← Glass-style filter controls
  VideoCard.tsx              ← Individual video card with hover preview
  VideoModal.tsx             ← Immersive video playback modal
  ProcessRoadmap.tsx         ← Scroll-animated process timeline
  ContactSection.tsx         ← Contact info and social links

/styles
  globals.css                ← Cinematic dark theme configuration
```

## Features Implemented

✅ Cinematic dark theme with deep charcoal background
✅ Subtle 3D geometric background element
✅ Glassmorphism on navigation, filters, and modals
✅ Scroll-triggered animations with parallax effects
✅ Video hover previews (muted, looped)
✅ Click for full playback modal
✅ Multi-select filtering by niche and editing style
✅ Featured "Best Of" section
✅ Scroll-animated process roadmap
✅ Contact section with social links
✅ Reduced motion accessibility support
✅ Responsive design for all screen sizes
✅ Scroll progress indicator
✅ Back-to-top button
✅ Subtle film grain texture overlay
✅ Active section tracking in navigation
✅ Smooth scroll navigation
✅ Lazy-loaded video content

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Graceful degradation for older browsers

## Performance Optimization

The portfolio includes several performance optimizations:

1. **Lazy Loading**: Videos load only when needed
2. **Hover Previews**: Set to `preload="none"` for faster initial load
3. **3D Background**: Optional component - can be removed for better performance
4. **Scroll Animations**: Use `viewport={{ once: true }}` to prevent re-triggering
5. **Reduced Motion**: Automatically respects user preferences

To disable the 3D background for better performance, remove or comment out:
```typescript
<Background3D />
```
in `/App.tsx`

## Customization Options

### Change Accent Color to Soft Blue

1. Open `/styles/globals.css`
2. Change:
   ```css
   --accent: #8b4a5a;  /* Current: Muted Crimson */
   ```
   To:
   ```css
   --accent: #6b8c9a;  /* Soft Blue */
   ```

### Adjust Animation Speed

All animations use Motion (Framer Motion). To adjust speeds globally:
- Find `duration` values in component files
- Increase for slower, decrease for faster
- Default: 0.6-0.8s for most animations

### Modify Section Spacing

In `/styles/globals.css`:
```css
--section-padding: 8rem;  /* Adjust this value */
```