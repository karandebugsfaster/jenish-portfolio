# Quick Start Guide

## 🎬 Jenish Patel - Video Editor Portfolio

Welcome! Your premium portfolio is ready. Here's how to get started:

## Step 1: Add Your Videos (5 minutes)

Open `/data/portfolio-data.ts` and update the portfolio array:

```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  videoUrl: 'https://your-video-url.mp4',
  thumbnailUrl: 'https://your-thumbnail.jpg',
  niche: ['Finance'], // or ['Fitness'], ['Education'], ['General']
  editingStyle: ['Motion Graphics'], // or ['Documentary Style'], ['Talking Head']
  featured: true, // Make this a "Best Of" video
}
```

## Step 2: Test the Portfolio

1. The site is already live and running
2. Scroll through each section
3. Hover over videos to see previews
4. Click videos to play full-screen
5. Test the filters

## Step 3: Customize (Optional)

### Change Accent Color
`/styles/globals.css` → Line 18:
- Current: `--accent: #8b4a5a;` (Muted Crimson)
- Blue option: `--accent: #6b8c9a;` (Soft Blue)

### Disable 3D Background (for better mobile performance)
`/App.tsx` → Line 70:
```typescript
{/* <Background3D /> */}  // Comment out this line
```

## Key Features

- **Hero**: Authority-first landing with your name
- **Featured**: 3 "Best Of" videos in large format
- **Portfolio**: Full grid with smart filtering
- **Process**: 5-step animated roadmap
- **Contact**: Email + social links

## Navigation

Users can:
- Click navigation links to jump to sections
- Use the scroll progress bar at the top
- Click "Back to Top" button (appears after scrolling)

## Video Playback

- **Hover**: Silent preview loops automatically
- **Click**: Opens full-screen modal with controls
- **Only one video plays at a time** (automatic pause)

## Filtering

Multi-select filters work together:
- Select "Finance" + "Motion Graphics" = shows videos with BOTH tags
- Reset button clears all filters

## Mobile Responsive

Everything adapts:
- Navigation collapses on mobile (if needed, add hamburger menu)
- Grid adjusts: 3 cols → 2 cols → 1 col
- Videos scale proportionally

## Next Steps

1. Replace placeholder videos with real content
2. Test on different devices
3. Share with potential clients
4. Update as you complete new projects

## Need Help?

Read `/PORTFOLIO_SETUP.md` for detailed instructions on:
- Video hosting options
- Performance optimization
- Advanced customization
- Browser compatibility

---

**Portfolio built for Jenish Patel**
Video Editor & Thumbnail Designer
jenishop001@gmail.com
