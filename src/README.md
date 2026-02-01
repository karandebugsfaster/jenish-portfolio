# Jenish Patel - Video Editor Portfolio

A premium, cinematic portfolio website built for professional video editors and thumbnail designers.

## 🎯 Overview

This is an **experience-driven** portfolio designed to:
- Build instant trust with potential clients
- Showcase editing experience through presentation, not hype
- Feel calm, confident, and senior-level
- Make clients want to work with you

## 🚀 Quick Start

1. **Add your videos**: Edit `/data/portfolio-data.ts`
2. **Customize colors** (optional): Edit `/styles/globals.css`
3. **Test everything**: Scroll, hover, click videos, try filters
4. **Deploy**: Your portfolio is production-ready

📖 Read `/QUICK_START.md` for a 5-minute setup guide.

## ✨ Features

### Design
- 🎬 Cinematic dark theme with deep charcoal background
- 💎 Premium glassmorphism on navigation and modals
- 🎨 Muted crimson accent color (easily customizable)
- 📱 Fully responsive across all devices
- 🎞️ Subtle film grain texture overlay

### Interactions
- 🎥 Video hover previews (muted, looped)
- 🎬 Full-screen playback modal
- 📊 Multi-select filtering by niche and editing style
- 📜 Scroll-triggered animations with parallax
- 🔝 Back-to-top button
- 📈 Scroll progress indicator
- 🧭 Active section tracking in navigation

### 3D Elements
- 📦 Subtle geometric 3D background (optional)
- 🌊 Smooth, slow-moving animations
- 🎭 Positioned to support, not distract

### Sections
- **Hero**: Authority-first landing
- **Featured**: "Best Of" curated showcase
- **Portfolio**: Full grid with smart filtering
- **Process**: 5-step animated roadmap
- **Contact**: Email and social links

## 📁 Project Structure

```
/
├── App.tsx                    # Main application
├── data/
│   └── portfolio-data.ts      # Content (videos, contact, process)
├── components/
│   ├── Background3D.tsx       # Optional 3D element
│   ├── GlassNavigation.tsx    # Fixed glass navigation
│   ├── HeroSection.tsx        # Landing section
│   ├── FeaturedSection.tsx    # Best of showcase
│   ├── PortfolioGrid.tsx      # Full portfolio with filters
│   ├── FilterPanel.tsx        # Smart filtering UI
│   ├── VideoCard.tsx          # Video preview card
│   ├── VideoModal.tsx         # Full-screen playback
│   ├── ProcessRoadmap.tsx     # Animated timeline
│   ├── ContactSection.tsx     # Contact info
│   ├── ScrollProgress.tsx     # Top progress bar
│   ├── BackToTop.tsx          # Scroll-to-top button
│   └── LoadingScreen.tsx      # Loading state
└── styles/
    └── globals.css            # Theme configuration
```

## 🎨 Customization

### Change Accent Color

**Current**: Muted Crimson (`#8b4a5a`)

To change to **Soft Blue**:
```css
/* /styles/globals.css - Line 18 */
--accent: #6b8c9a;
```

### Disable 3D Background

For better performance on lower-end devices:
```typescript
// /App.tsx - Comment out line 70
{/* <Background3D /> */}
```

### Adjust Animation Speed

Search for `duration` in component files and adjust values:
- Faster: `duration: 0.3`
- Slower: `duration: 1.2`
- Default: `0.6-0.8`

## 📝 Adding Your Content

### Update Video Data

Edit `/data/portfolio-data.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Your Project Name',
  videoUrl: 'https://your-video-url.mp4',
  thumbnailUrl: 'https://your-thumbnail.jpg',
  niche: ['Finance'], // or Fitness, Education, General
  editingStyle: ['Motion Graphics'], // or Documentary Style, Talking Head
  featured: true, // Appears in "Best Of" section
}
```

### Video Hosting Options

**Recommended**: Use a CDN or video hosting service
- YouTube (with direct video URL)
- Vimeo
- AWS S3 + CloudFront
- Bunny CDN

**Alternative**: Local hosting
- Place files in `/public/videos/`
- Reference as `/videos/your-file.mp4`

## 🎯 Design Philosophy

> "Experienced editors communicate through restraint"

- **Effects support storytelling**, they don't dominate
- **UI disappears**, work shines
- **Premium ≠ loud**
- **Calm confidence** > flashy effects

## 🔧 Technical Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion** (Framer Motion) - Animations
- **React Three Fiber** - 3D elements
- **Lucide React** - Icons

## ♿ Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Reduced motion preferences respected
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML structure

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📞 Contact Information

**Jenish Patel**
- Email: jenishop001@gmail.com
- Instagram: [@jenish_unfiltered](https://www.instagram.com/jenish_unfiltered/)
- LinkedIn: [jenish-patel-5aa93420a](https://www.linkedin.com/in/jenish-patel-5aa93420a)
- YouTube: [@Great_mindse7](https://www.youtube.com/@Great_mindse7)

---

## 📚 Documentation

- `/QUICK_START.md` - 5-minute setup guide
- `/PORTFOLIO_SETUP.md` - Detailed configuration
- `/README.md` - This file

## 🎬 What This Portfolio Feels Like

- A calm creative studio
- A cinematic editing timeline
- A space where serious clients feel confident investing

**Not loud. Not flashy.**
**Experienced, intentional, and premium.**

---

Built with precision for video editors who let their work speak.
