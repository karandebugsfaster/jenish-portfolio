import { motion, useScroll, useTransform } from 'motion/react';
import { Maximize2, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import type { PortfolioVideo } from '../data/portfolio-data';

interface IntroSectionProps {
  video: PortfolioVideo;
  onVideoPlay: (video: PortfolioVideo) => void;
}

// Helper function to check if URL is a Google Drive link
function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com');
}

// Helper function to convert Google Drive URL to embed format with autoplay
function getGoogleDriveEmbedUrl(url: string, autoplay: boolean = true): string {
  const fileIdMatch = url.match(/[-\w]{25,}/);
  if (fileIdMatch) {
    const baseUrl = `https://drive.google.com/file/d/${fileIdMatch[0]}/preview`;
    return autoplay ? `${baseUrl}?autoplay=1&mute=1` : baseUrl;
  }
  return url;
}

export function IntroSection({ video, onVideoPlay }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isGoogleDrive = isGoogleDriveUrl(video.videoUrl);
  const embedUrl = isGoogleDrive ? getGoogleDriveEmbedUrl(video.videoUrl) : video.videoUrl;

  // Detect when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-play video when in view
  useEffect(() => {
    const currentRef = videoRef.current;
    if (currentRef && isInView && !isGoogleDrive) {
      currentRef.muted = isMuted;
      currentRef.play().catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
  }, [isMuted, isInView, isGoogleDrive]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="intro" 
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          y,
          opacity,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          {/* Simple Title */}
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            INTRO
          </motion.h2>
        </div>

        {/* Featured Video Card */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="relative aspect-video rounded-3xl overflow-hidden backdrop-blur-xl cursor-pointer"
            style={{
              backgroundColor: 'rgba(18, 18, 26, 0.4)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
            onClick={() => onVideoPlay(video)}
          >
            {/* Autoplay Video */}
            {isGoogleDrive ? (
              <iframe
                ref={iframeRef}
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ border: 'none' }}
              />
            ) : (
              <video
                ref={videoRef}
                src={video.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              />
            )}

            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(10, 10, 13, 0.8) 0%, transparent 50%, rgba(10, 10, 13, 0.4) 100%)',
              }}
            />

            {/* Bottom right controls */}
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
              {/* Mute/Unmute button - only for non-Google Drive videos */}
              {!isGoogleDrive && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="p-2.5 rounded-lg backdrop-blur-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(18, 18, 26, 0.8)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(139, 92, 246, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              )}

              {/* Maximize button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onVideoPlay(video);
                }}
                className="p-2.5 rounded-lg backdrop-blur-xl transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(18, 18, 26, 0.8)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(139, 92, 246, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Video info overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0.8, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3">{video.title}</h3>
              <div className="flex flex-wrap gap-2">
                {video.niche.map((n, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    {n}
                  </span>
                ))}
                {video.editingStyle.map((style, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    {style}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                boxShadow: isHovered ? '0 0 60px rgba(139, 92, 246, 0.5), inset 0 0 80px rgba(139, 92, 246, 0.15)' : 'none',
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}