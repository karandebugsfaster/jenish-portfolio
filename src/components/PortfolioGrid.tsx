import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoCard } from './VideoCard';
import { FilterPanel } from './FilterPanel';
import type { PortfolioVideo, Niche, EditingStyle } from '../data/portfolio-data';

interface PortfolioGridProps {
  videos: PortfolioVideo[];
  onVideoPlay: (video: PortfolioVideo) => void;
}

export function PortfolioGrid({ videos, onVideoPlay }: PortfolioGridProps) {
  const [selectedNiches, setSelectedNiches] = useState<Niche[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<EditingStyle[]>([]);
  
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const nicheMatch = selectedNiches.length === 0 || 
        selectedNiches.some((niche) => video.niche.includes(niche));
      
      const styleMatch = selectedStyles.length === 0 || 
        selectedStyles.some((style) => video.editingStyle.includes(style));
      
      return nicheMatch && styleMatch;
    });
  }, [videos, selectedNiches, selectedStyles]);
  
  const handleNicheToggle = (niche: Niche) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };
  
  const handleStyleToggle = (style: EditingStyle) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };
  
  const handleReset = () => {
    setSelectedNiches([]);
    setSelectedStyles([]);
  };
  
  return (
    <section id="portfolio" className="py-32 relative">
      <div className="max-w-[var(--content-max-width)] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tight">Full Portfolio</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the complete collection of projects across different niches and styles
          </p>
        </motion.div>
        
        <FilterPanel
          selectedNiches={selectedNiches}
          selectedStyles={selectedStyles}
          onNicheToggle={handleNicheToggle}
          onStyleToggle={handleStyleToggle}
          onReset={handleReset}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedNiches.join('-')}-${selectedStyles.join('-')}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <VideoCard video={video} onPlay={onVideoPlay} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No videos match the selected filters. Try adjusting your selection.
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Parallax background element */}
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 74, 90, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </section>
  );
}
