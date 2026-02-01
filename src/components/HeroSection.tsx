import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import heroImage from 'figma:asset/5358d9c2b5df6b8d61b97a6d94f9b29be2fc35fe.png';

interface HeroSectionProps {
  onViewWork: () => void;
}

export function HeroSection({ onViewWork }: HeroSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '120px' }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            y,
          }}
        />
        
        {/* Animated spotlight effect */}
        <motion.div
          className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 30%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-[var(--content-max-width)] mx-auto px-8 text-center"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Profile Image */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glowing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(139, 92, 246, 0.2))',
                  filter: 'blur(20px)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Image container with glassmorphism border */}
              <div
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden backdrop-blur-xl"
                style={{
                  border: '3px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3), inset 0 0 40px rgba(139, 92, 246, 0.1)',
                }}
              >
                <img
                  src={heroImage}
                  alt="Jenish Patel"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Premium badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm tracking-wide text-accent">Premium Visual Storytelling</span>
          </motion.div>
          
          <motion.h1
            className="text-7xl md:text-9xl mb-6 tracking-tight font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 40px rgba(139, 92, 246, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Jenish
            </motion.span>
            {' '}
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% auto',
              }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Patel
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-3xl text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="text-accent font-semibold">Video Editor</span> & <span className="text-accent font-semibold">Thumbnail Designer</span>
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Crafting <span className="text-foreground font-medium">cinematic visual narratives</span> that connect, engage, and convert.
            <br />
            Every frame serves the story. Every edit builds trust.
          </motion.p>
          
          <motion.button
            onClick={onViewWork}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-xl transition-all duration-500 overflow-hidden"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              borderColor: 'rgba(139, 92, 246, 0.5)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient background on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))',
              }}
            />
            <span className="relative text-base tracking-wide font-medium">View Selected Work</span>
            <ChevronDown className="relative w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Enhanced gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
        }}
      />
      
      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 13, 0.4) 100%)',
        }}
      />
    </section>
  );
}