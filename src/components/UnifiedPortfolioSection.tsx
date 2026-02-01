import { useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { VideoCard } from './VideoCard';
import type { PortfolioVideo, Niche, EditingStyle } from '../data/portfolio-data';
import { useRef } from 'react';

type FilterType = 'best-of-all' | 'niche' | 'editing-style';

interface UnifiedPortfolioSectionProps {
  videos: PortfolioVideo[];
  onVideoPlay: (video: PortfolioVideo) => void;
}

export function UnifiedPortfolioSection({ videos, onVideoPlay }: UnifiedPortfolioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [filterType, setFilterType] = useState<FilterType>('best-of-all');
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<EditingStyle | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Get unique values for filters
  const allNiches: Niche[] = useMemo(
    () => ['General', 'Finance', 'Fitness', 'Education'],
    []
  );

  const allStyles: EditingStyle[] = useMemo(
    () => ['Motion Graphics', 'Documentary Style', 'Talking Head'],
    []
  );

  // Filter videos based on active filter
  const filteredVideos = useMemo(() => {
    if (filterType === 'best-of-all') {
      return videos.filter(v => v.featured);
    }
    
    if (filterType === 'niche' && selectedNiche) {
      return videos.filter(v => v.niche.includes(selectedNiche));
    }
    
    if (filterType === 'editing-style' && selectedStyle) {
      return videos.filter(v => v.editingStyle.includes(selectedStyle));
    }
    
    return videos;
  }, [videos, filterType, selectedNiche, selectedStyle]);

  const handleNicheClick = (niche: Niche) => {
    setFilterType('niche');
    setSelectedNiche(niche);
    setSelectedStyle(null);
  };

  const handleStyleClick = (style: EditingStyle) => {
    setFilterType('editing-style');
    setSelectedStyle(style);
    setSelectedNiche(null);
  };

  const handleBestOfAllClick = () => {
    setFilterType('best-of-all');
    setSelectedNiche(null);
    setSelectedStyle(null);
  };

  // Determine if a filter is active
  const isFilterActive = (type: string, value?: string) => {
    if (type === 'best-of-all') return filterType === 'best-of-all';
    if (type === 'niche') return filterType === 'niche' && selectedNiche === value;
    if (type === 'style') return filterType === 'editing-style' && selectedStyle === value;
    return false;
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="relative min-h-screen px-6 py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          y,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Filter by category to explore my work
          </motion.p>

          {/* Simplified Single-Row Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Best of All */}
            <button
              onClick={handleBestOfAllClick}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isFilterActive('best-of-all') 
                  ? 'rgba(139, 92, 246, 0.2)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: isFilterActive('best-of-all')
                  ? '1px solid rgba(139, 92, 246, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: isFilterActive('best-of-all') ? '#a78bfa' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Best of All
            </button>

            {/* Divider */}
            <div className="w-px bg-white/10 mx-1" />

            {/* Niche Filters */}
            {allNiches.map((niche) => (
              <button
                key={niche}
                onClick={() => handleNicheClick(niche)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: isFilterActive('niche', niche)
                    ? 'rgba(139, 92, 246, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isFilterActive('niche', niche)
                    ? '1px solid rgba(139, 92, 246, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isFilterActive('niche', niche) ? '#a78bfa' : 'rgba(255, 255, 255, 0.7)',
                }}
              >
                {niche}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px bg-white/10 mx-1" />

            {/* Editing Style Filters */}
            {allStyles.map((style) => (
              <button
                key={style}
                onClick={() => handleStyleClick(style)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: isFilterActive('style', style)
                    ? 'rgba(139, 92, 246, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isFilterActive('style', style)
                    ? '1px solid rgba(139, 92, 246, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isFilterActive('style', style) ? '#a78bfa' : 'rgba(255, 255, 255, 0.7)',
                }}
              >
                {style}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Video Grid */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          key={`${filterType}-${selectedNiche}-${selectedStyle}`}
        >
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <VideoCard video={video} onPlay={() => onVideoPlay(video)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No videos in this category yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}