import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin, Youtube } from 'lucide-react';
import { contactInfo } from '../data/portfolio-data';

export function ContactSection() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-[var(--content-max-width)] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl mb-6 tracking-tight">Let's Work Together</h2>
          <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
            Available for select projects. Reach out to discuss how we can elevate your content.
          </p>
          
          {/* Email */}
          <motion.a
            href={`mailto:${contactInfo.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg mb-12 transition-all duration-500 group"
            style={{
              backgroundColor: 'rgba(139, 74, 90, 0.1)',
              border: '1px solid rgba(139, 74, 90, 0.2)',
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(139, 74, 90, 0.15)',
              borderColor: 'rgba(139, 74, 90, 0.4)',
            }}
          >
            <Mail className="w-5 h-5" />
            <span className="text-lg">{contactInfo.email}</span>
          </motion.a>
          
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            <SocialLink
              href={contactInfo.social.instagram}
              icon={<Instagram className="w-6 h-6" />}
              label="Instagram"
            />
            <SocialLink
              href={contactInfo.social.linkedin}
              icon={<Linkedin className="w-6 h-6" />}
              label="LinkedIn"
            />
            <SocialLink
              href={contactInfo.social.youtube}
              icon={<Youtube className="w-6 h-6" />}
              label="YouTube"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-20 text-sm text-muted-foreground"
      >
        <p>© {new Date().getFullYear()} Jenish Patel. All rights reserved.</p>
      </motion.div>
    </section>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full transition-all duration-300 group"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: 'rgba(139, 74, 90, 0.1)',
        borderColor: 'rgba(139, 74, 90, 0.3)',
      }}
      aria-label={label}
    >
      <div className="group-hover:text-accent transition-colors duration-300">
        {icon}
      </div>
    </motion.a>
  );
}
