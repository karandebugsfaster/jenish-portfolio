import { motion } from 'motion/react';
import { Filter } from 'lucide-react';
import type { Niche, EditingStyle } from '../data/portfolio-data';

interface FilterPanelProps {
  selectedNiches: Niche[];
  selectedStyles: EditingStyle[];
  onNicheToggle: (niche: Niche) => void;
  onStyleToggle: (style: EditingStyle) => void;
  onReset: () => void;
}

const niches: Niche[] = ['General', 'Finance', 'Fitness', 'Education'];
const editingStyles: EditingStyle[] = ['Motion Graphics', 'Documentary Style', 'Talking Head'];

export function FilterPanel({
  selectedNiches,
  selectedStyles,
  onNicheToggle,
  onStyleToggle,
  onReset,
}: FilterPanelProps) {
  const hasActiveFilters = selectedNiches.length > 0 || selectedStyles.length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-xl p-6 mb-12"
      style={{
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg">Filter Portfolio</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
          >
            Reset Filters
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Niche filters */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">Niche</label>
          <div className="flex flex-wrap gap-2">
            {niches.map((niche) => {
              const isActive = selectedNiches.includes(niche);
              return (
                <motion.button
                  key={niche}
                  onClick={() => onNicheToggle(niche)}
                  className="px-4 py-2 rounded-lg text-sm transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? 'rgba(139, 74, 90, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid rgba(139, 74, 90, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? 'var(--accent)' : 'var(--foreground)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {niche}
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* Editing style filters */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">Editing Style</label>
          <div className="flex flex-wrap gap-2">
            {editingStyles.map((style) => {
              const isActive = selectedStyles.includes(style);
              return (
                <motion.button
                  key={style}
                  onClick={() => onStyleToggle(style)}
                  className="px-4 py-2 rounded-lg text-sm transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? 'rgba(139, 74, 90, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid rgba(139, 74, 90, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? 'var(--accent)' : 'var(--foreground)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {style}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
