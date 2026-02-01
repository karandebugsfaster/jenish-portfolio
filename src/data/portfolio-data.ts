// Portfolio data for Jenish Patel
// Replace video URLs with actual project content
// 
// INSTRUCTIONS:
// 1. If you have portfolio.zip, extract video files and thumbnails
// 2. Upload videos to a CDN or hosting service
// 3. Replace the videoUrl and thumbnailUrl below with your actual URLs
// 4. Update niche and editingStyle tags to match each project
// 5. Mark your 3-4 best videos with featured: true

export type Niche = 'General' | 'Finance' | 'Fitness' | 'Education';
export type EditingStyle = 'Motion Graphics' | 'Documentary Style' | 'Talking Head';

export interface PortfolioVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  niche: Niche[];
  editingStyle: EditingStyle[];
  featured?: boolean;
}

// TODO: Replace with actual video content from portfolio.zip
export const portfolioVideos: PortfolioVideo[] = [
  // Intro/Showcase Video
  {
    id: 'intro-1',
    title: 'Signature Showcase',
    videoUrl: '/videos/intro_video.mp4',
    thumbnailUrl: '/images/main-thumbnail.jpg',
    niche: ['General'],
    editingStyle: ['Motion Graphics'],
    featured: true,
  },
  
  // Featured "Best Of" Videos
  {
    id: '1',
    title: 'Featured Finance Project',
    videoUrl: '/videos/great_edits.mp4',
    thumbnailUrl: '/images/finance-img.jpg',
    niche: ['Finance'],
    editingStyle: ['Motion Graphics'],
    featured: true,
  },
  {
    id: '2',
    title: 'Featured Fitness Content',
    videoUrl: '/videos/gym_need_effort.mp4',
    thumbnailUrl: '/images/fitness-img.jpg',
    niche: ['Fitness'],
    editingStyle: ['Documentary Style'],
    featured: true,
  },
  {
    id: '3',
    title: 'Featured Educational Video',
    videoUrl: '/videos/educational-vid.mp4',
    thumbnailUrl: '/images/educational-img.jpg',
    niche: ['Education'],
    editingStyle: ['Talking Head', 'Motion Graphics'],
    featured: true,
  },
  
  // Regular Portfolio Videos
  {
    id: '4',
    title: 'Finance Analysis',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    niche: ['Finance'],
    editingStyle: ['Motion Graphics'],
  },
  {
    id: '5',
    title: 'Workout Motivation',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    niche: ['Fitness'],
    editingStyle: ['Documentary Style'],
  },
  {
    id: '6',
    title: 'Educational Tutorial',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    niche: ['Education'],
    editingStyle: ['Talking Head'],
  },
  {
    id: '7',
    title: 'General Content',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    niche: ['General'],
    editingStyle: ['Motion Graphics', 'Talking Head'],
  },
  {
    id: '8',
    title: 'Finance Documentary',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    niche: ['Finance'],
    editingStyle: ['Documentary Style'],
  },
  {
    id: '9',
    title: 'Fitness Journey',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    niche: ['Fitness'],
    editingStyle: ['Motion Graphics'],
  },
];

export const contactInfo = {
  name: 'Jenish Patel',
  email: 'jenishop001@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/jenish_unfiltered/',
    linkedin: 'https://www.linkedin.com/in/jenish-patel-5aa93420a',
    youtube: 'https://www.youtube.com/@Great_mindse7',
  },
};

export const processSteps = [
  {
    number: '01',
    title: 'Research & Context',
    description: 'Understanding your audience, message, and goals before a single frame is touched.',
  },
  {
    number: '02',
    title: 'Story & Structure',
    description: 'Building the narrative arc that keeps viewers engaged from start to finish.',
  },
  {
    number: '03',
    title: 'Editing & Visual Rhythm',
    description: 'Crafting pacing, transitions, and visual flow that feels intentional.',
  },
  {
    number: '04',
    title: 'Sound & Polish',
    description: 'Layering audio design and final refinements that elevate the entire piece.',
  },
  {
    number: '05',
    title: 'Final Delivery',
    description: 'Optimized exports tailored to your platform and distribution needs.',
  },
];