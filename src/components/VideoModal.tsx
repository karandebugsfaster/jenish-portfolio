import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { PortfolioVideo } from '../data/portfolio-data';

interface VideoModalProps {
  video: PortfolioVideo | null;
  onClose: () => void;
}

// Helper function to check if URL is a Google Drive link
function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com');
}

// Helper function to convert Google Drive URL to embed format
function getGoogleDriveEmbedUrl(url: string): string {
  const fileIdMatch = url.match(/[-\w]{25,}/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[0]}/preview`;
  }
  return url;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isGoogleDrive = video ? isGoogleDriveUrl(video.videoUrl) : false;
  
  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.play();
    }
  }, [video]);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (video) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [video, onClose]);
  
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(12px)',
            }}
          />
          
          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 rounded-full transition-all duration-300 hover:bg-white/10 group z-10"
              aria-label="Close video"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            {/* Video container with glassmorphism */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-blur))',
                border: '1px solid var(--glass-border)',
              }}
            >
              {isGoogleDrive ? (
                <iframe
                  src={getGoogleDriveEmbedUrl(video.videoUrl)}
                  className="w-full aspect-video"
                  allow="autoplay"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  className="w-full aspect-video"
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>
            
            {/* Video title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center"
            >
              <h3 className="text-xl text-muted-foreground">{video.title}</h3>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}