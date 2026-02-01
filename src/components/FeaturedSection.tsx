import { motion, useScroll, useTransform } from 'motion/react';
import { VideoCard } from './VideoCard';
import { Star, Award } from 'lucide-react';
import type { PortfolioVideo } from '../data/portfolio-data';
import { useRef } from 'react';

interface FeaturedSectionProps {
  videos: PortfolioVideo[];
  onVideoPlay: (video: PortfolioVideo) => void;
}

export function FeaturedSection({ videos, onVideoPlay }: FeaturedSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="featured" className="py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          y,
          opacity,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
        }}
      />
      
      <div className="max-w-[var(--content-max-width)] mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Premium badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm tracking-wide text-accent">Featured Work</span>
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-7xl mb-6 tracking-tight font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block">Best</span>
            {' '}
            <span className="inline-block bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent">
              Of
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A curated selection of work that defines my approach to <span className="text-foreground font-medium">visual storytelling</span>
          </motion.p>
          
          {/* Decorative line */}
          <motion.div
            className="h-px w-32 mx-auto mt-8"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.5), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* Premium card wrapper */}
              <div className="relative group">
                {/* Floating badge */}
                {index === 0 && (
                  <motion.div
                    className="absolute -top-4 -right-4 z-20 px-3 py-1.5 rounded-full backdrop-blur-xl"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: -12 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <Star className="w-3 h-3" fill="currentColor" />
                      <span>Top Pick</span>
                    </div>
                  </motion.div>
                )}
                
                <VideoCard video={video} onPlay={onVideoPlay} featured />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}