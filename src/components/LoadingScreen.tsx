import { motion } from 'motion/react';
import { Film } from 'lucide-react';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(139, 74, 90, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(139, 74, 90, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(139, 74, 90, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="text-center relative z-10">
        {/* Film icon with animation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Film className="w-16 h-16 text-accent" />
            
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Brand name with stagger animation */}
        <motion.div
          className="text-5xl md:text-6xl tracking-tight mb-3 font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Jenish
          </motion.span>
          {' '}
          <motion.span
            className="inline-block bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Patel
          </motion.span>
        </motion.div>
        
        <motion.div
          className="text-sm text-muted-foreground mb-8 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Video Editor & Thumbnail Designer
        </motion.div>
        
        {/* Loading bar */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            className="h-1 w-48 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(139, 74, 90, 0.2)' }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(139, 74, 90, 0.5), rgba(139, 74, 90, 1), rgba(139, 74, 90, 0.5))',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
        
        <motion.div
          className="text-xs text-muted-foreground tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          Loading premium experience...
        </motion.div>
      </div>
      
      {/* Corner decorations */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32"
        style={{
          background: 'radial-gradient(circle at top left, rgba(139, 74, 90, 0.1), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32"
        style={{
          background: 'radial-gradient(circle at bottom right, rgba(139, 74, 90, 0.1), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}