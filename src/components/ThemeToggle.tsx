import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark for cinematic portfolio
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('light', initialTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full backdrop-blur-xl" style={{
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
      }} />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full backdrop-blur-xl overflow-hidden group"
      style={{
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 0.4)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun icon */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 180,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Sun className="w-5 h-5 text-accent" />
        </motion.div>

        {/* Moon icon */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Moon className="w-5 h-5 text-accent" />
        </motion.div>
      </div>

      {/* Tooltip on hover */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md backdrop-blur-xl whitespace-nowrap pointer-events-none"
        style={{
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        }}
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs text-muted-foreground">
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </span>
      </motion.div>
    </motion.button>
  );
}
