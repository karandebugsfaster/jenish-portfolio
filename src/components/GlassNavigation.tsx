import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface GlassNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function GlassNavigation({ activeSection, onNavigate }: GlassNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [20, 30]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'intro', label: 'Intro' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];
  
  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? `blur(${navBlur}px)` : 'blur(12px)',
          backgroundColor: scrolled 
            ? 'rgba(18, 18, 26, 0.7)' 
            : 'rgba(18, 18, 26, 0.3)',
          borderBottom: scrolled 
            ? '1px solid rgba(139, 92, 246, 0.2)' 
            : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 1px rgba(139, 92, 246, 0.3)' 
            : 'none',
        }}
      >
        <div className="max-w-[var(--content-max-width)] mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="text-xl tracking-wide font-semibold"
              whileHover={{ 
                textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                Jenish Patel
              </span>
            </motion.div>
            
            {/* Premium indicator */}
            <motion.div
              className="hidden sm:block px-2 py-1 rounded-full text-[10px] tracking-wider backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              PRO
            </motion.div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center gap-8"
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <motion.button
                  onClick={() => handleNavClick(item.id)}
                  className="relative text-sm tracking-wide transition-colors duration-300 group"
                  style={{
                    color: activeSection === item.id ? 'var(--accent)' : 'inherit',
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    color: 'var(--accent)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                      boxShadow: '0 0 8px var(--accent)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{
                      width: activeSection === item.id ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Hover indicator */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-accent/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      width: activeSection === item.id ? '0%' : '100%',
                    }}
                  />
                </motion.button>
              </motion.li>
            ))}
            
            {/* Theme Toggle */}
            <motion.li
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <ThemeToggle />
            </motion.li>
          </motion.ul>
          
          {/* Mobile Right Side Controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              className="p-2 rounded-lg backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          x: mobileMenuOpen ? 0 : '100%',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-[73px] right-0 bottom-0 w-64 z-40 md:hidden"
        style={{
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <ul className="p-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: mobileMenuOpen ? 1 : 0,
                x: mobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: activeSection === item.id 
                    ? 'rgba(139, 92, 246, 0.2)' 
                    : 'transparent',
                  border: activeSection === item.id 
                    ? '1px solid rgba(139, 92, 246, 0.3)' 
                    : '1px solid transparent',
                  color: activeSection === item.id ? 'var(--accent)' : 'inherit',
                }}
              >
                {item.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}