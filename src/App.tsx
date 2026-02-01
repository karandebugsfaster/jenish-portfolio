import { useState, useEffect } from 'react';
import { Background3D } from './components/Background3D';
import { GlassNavigation } from './components/GlassNavigation';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { UnifiedPortfolioSection } from './components/UnifiedPortfolioSection';
import { ProcessRoadmap } from './components/ProcessRoadmap';
import { ContactSection } from './components/ContactSection';
import { VideoModal } from './components/VideoModal';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { portfolioVideos } from './data/portfolio-data';
import type { PortfolioVideo } from './data/portfolio-data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'intro', 'portfolio', 'process', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed nav
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleViewWork = () => {
    handleNavigate('intro');
  };

  // Get the first featured video for intro section
  const introVideo = portfolioVideos.find(v => v.featured) || portfolioVideos[0];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* 3D Background - Optional: Remove this component for better performance on lower-end devices */}
      

      {/* Glass Navigation */}
      <GlassNavigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection onViewWork={handleViewWork} />
        <IntroSection video={introVideo} onVideoPlay={setSelectedVideo} />
        <UnifiedPortfolioSection videos={portfolioVideos} onVideoPlay={setSelectedVideo} />
        <ProcessRoadmap />
        <ContactSection />
      </main>

      {/* Video playback modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      
      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}