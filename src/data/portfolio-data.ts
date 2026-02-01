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
    videoUrl: 'https://drive.google.com/file/d/1_hQYn3CavD1pQQ0j6-COkJU672QHamyc/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/15CJjKLUJAoPNnXYnofpFNnMHmIlYNCYR/view?usp=drive_link',
    niche: ['General'],
    editingStyle: ['Motion Graphics'],
    featured: true,
  },
  
  // Featured "Best Of" Videos
  {
    id: '1',
    title: 'Business Truth',
    videoUrl: 'https://drive.google.com/file/d/1-vtGNrXfT1osZwzP2Ru2YWuo7qGAovRm/view?usp=drive_link',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    niche: ['Finance'],
    editingStyle: ['Motion Graphics'],
    featured: true,
  },
  {
    id: '2',
    title: 'Featured Fitness Content',
    videoUrl: 'https://drive.google.com/file/d/18IkLB4gW4kHPxlFTA_U1px02FIWxjXPQ/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1eK3o_bnrYwdpKFcBSNMHwedplpBu5wa3/view?usp=drive_link',
    niche: ['Fitness'],
    editingStyle: ['Talking Head'],
    featured: true,
  },
  {
    id: '3',
    title: 'Social housing crises',
    videoUrl: 'https://drive.google.com/file/d/1rYtWxAxea2winRMUCnazHOfkV4iBKpRj/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1INgoDphcHw3jH7XDgbc_ussiu4Zvns4z/view?usp=drive_link',
    niche: ['Education'],
    editingStyle: ['Documentary Style'],
    featured: true,
  },
  
  // Regular Portfolio Videos
  {
    id: '4',
    title: 'Social Media',
    videoUrl: 'https://drive.google.com/file/d/17MEAIvQPtQIFlERhPT-rb3pfY9uTJMA2/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1RTkkxsyts7QqaetJOaiGbzZppe0PmHQR/view?usp=drive_link',
    niche: ['General'],
    editingStyle: ['Motion Graphics'],
  },
  {
    id: '5',
    title: 'Great Edits',
    videoUrl: 'https://drive.google.com/file/d/1gRp6aFIdySZxeNHqptrlmazdAejhv1_u/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1DIK4YYrSaPW4MXjCaupgykt5Aevrx9sl/view?usp=drive_link',
    niche: ['General'],
    editingStyle: ['Motion Graphics'],
  },
  {
    id: '6',
    title: 'Wearable ChatGPT',
    videoUrl: 'https://drive.google.com/file/d/12pEDqQZaguUOSQeUkQOedDYksyQ3-MVe/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1T1AU_5EJhykeiDtIh9ye867vWuOLESsz/view?usp=drive_link',
    niche: ['General'],
    editingStyle: ['Talking Head'],
  },
  {
    id: '7',
    title: 'ClickUP journey',
    videoUrl: 'https://drive.google.com/file/d/1DAexkEvN6hoJAZ7HRjknaKSpxkJKyFYc/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1bE8X-za8Q9xaSkudHzL3LstvDFqO5Z-6/view?usp=drive_link',
    niche: ['General'],
    editingStyle: ['Motion Graphics', 'Talking Head'],
  },
  {
    id: '8',
    title: 'Social housing crises',
    videoUrl: 'https://drive.google.com/file/d/1rYtWxAxea2winRMUCnazHOfkV4iBKpRj/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1INgoDphcHw3jH7XDgbc_ussiu4Zvns4z/view?usp=drive_link',
    niche: ['Finance'],
    editingStyle: ['Documentary Style'],
  },
  {
    id: '9',
    title: 'Fitness Journey',
    videoUrl: 'https://drive.google.com/file/d/18IkLB4gW4kHPxlFTA_U1px02FIWxjXPQ/view?usp=drive_link',
    thumbnailUrl: 'https://drive.google.com/file/d/1eK3o_bnrYwdpKFcBSNMHwedplpBu5wa3/view?usp=drive_link',
    niche: ['Fitness'],
    editingStyle: ['Talking Head'],
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