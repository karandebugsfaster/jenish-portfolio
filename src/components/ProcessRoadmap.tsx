import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { processSteps } from "../data/portfolio-data";

export function ProcessRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.3", "end 0.7"],
  });

  // Smooth spring animation for progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)",
            filter: "blur(60px)",
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      <div className="max-w-[var(--content-max-width)] mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(139, 92, 246, 0.08)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-sm tracking-wide text-accent">
              5-Step Framework
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl mb-6 tracking-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                backgroundSize: "200% auto",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: { duration: 0.6, delay: 0.3 },
                y: { duration: 0.6, delay: 0.3 },
              }}
            >
              The Process
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            A deliberate, thoughtful approach to crafting videos that perform
          </motion.p>
        </motion.div>

        {/* Wavy Path Timeline */}
        <div className="relative max-w-6xl mx-auto">
          <WavyTimeline
            pathLength={pathLength}
            scrollProgress={smoothProgress}
          />
        </div>
      </div>
    </section>
  );
}

function WavyTimeline({
  pathLength,
  scrollProgress,
}: {
  pathLength: any;
  scrollProgress: any;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Create wavy path - S-curve through all steps
  const createWavyPath = () => {
    const steps = processSteps.length;
    const spacing = 280; // Vertical spacing between steps
    const amplitude = 300; // Horizontal wave amplitude

    let path = `M 400 0`; // Start from center top

    for (let i = 0; i < steps; i++) {
      const y = i * spacing + spacing;
      const xOffset = i % 2 === 0 ? amplitude : -amplitude;
      const controlY = y - spacing / 2;

      path += ` Q ${400 + xOffset} ${controlY}, 400 ${y}`;
    }

    return path;
  };

  // Calculate checkpoint positions on the path
  const getCheckpointPosition = (index: number) => {
    const spacing = 280;
    const amplitude = 300;
    const y = index * spacing + spacing;
    const x = 400; // All checkpoints end up at x=400 (center)

    return { x, y };
  };

  const wavyPath = createWavyPath();

  return (
    <div
      className="relative"
      style={{ minHeight: `${processSteps.length * 280 + 200}px` }}
    >
      {/* SVG Path */}
      <svg
        ref={svgRef}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full pointer-events-none hidden md:block"
        viewBox="0 0 800 1600"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Gradient for the line */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.2)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 1)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base path (inactive) */}
        <motion.path
          d={wavyPath}
          fill="none"
          stroke="rgba(139, 92, 246, 0.1)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Animated progress path */}
        <motion.path
          d={wavyPath}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          style={{ pathLength }}
        />

        {/* Checkpoint nodes positioned on the path */}
        {processSteps.map((step, index) => {
          const pos = getCheckpointPosition(index);
          const checkpointProgress = (index + 1) / processSteps.length;

          return (
            <CheckpointNode
              key={step.number}
              x={pos.x}
              y={pos.y}
              index={index}
              pathLength={pathLength}
              checkpointProgress={checkpointProgress}
              scrollProgress={scrollProgress}
            />
          );
        })}
      </svg>

      {/* Process Steps */}
      <div className="relative z-10">
        {processSteps.map((step, index) => (
          <ProcessCheckpoint
            key={step.number}
            step={step}
            index={index}
            scrollProgress={scrollProgress}
            totalSteps={processSteps.length}
          />
        ))}
      </div>
    </div>
  );
}

// Checkpoint node component for SVG
function CheckpointNode({
  x,
  y,
  index,
  pathLength,
  checkpointProgress,
  scrollProgress,
}: {
  x: number;
  y: number;
  index: number;
  pathLength: any;
  checkpointProgress: number;
  scrollProgress: any;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest: number) => {
      const revealThreshold = checkpointProgress * 0.7;

      if (latest >= revealThreshold && !isRevealed) {
        setIsRevealed(true);
      }

      // Check if line has reached this checkpoint
      if (latest >= checkpointProgress - 0.05) {
        setIsActive(true);
      }
    });

    return () => unsubscribe();
  }, [scrollProgress, checkpointProgress, isRevealed]);

  return (
    <g>
      {/* Expanding reveal ring */}
      <motion.circle
        cx={x}
        cy={y}
        r="12"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isRevealed ? { scale: 3, opacity: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />

      {/* Outer glow */}
      <motion.circle
        cx={x}
        cy={y}
        r="24"
        fill="url(#glowGradient)"
        filter="url(#glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 0.3 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <defs>
        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Middle ring */}
      <motion.circle
        cx={x}
        cy={y}
        r="12"
        fill="rgba(139, 92, 246, 0.15)"
        stroke="rgba(139, 92, 246, 0.3)"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />

      {/* Core checkpoint with gradient */}
      <motion.circle
        cx={x}
        cy={y}
        r="6"
        fill="url(#coreGradient)"
        filter="url(#glow)"
        initial={{ scale: 0, opacity: 0 }}
        animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 200,
        }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />

      <defs>
        <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* Checkmark */}
      <motion.path
        d={`M ${x - 4} ${y} L ${x - 1} ${y + 3} L ${x + 4} ${y - 3}`}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isRevealed ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Pulsing rings */}
      {isRevealed && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: [1, 2.5],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          ))}
        </>
      )}
    </g>
  );
}

function ProcessCheckpoint({
  step,
  index,
  scrollProgress,
  totalSteps,
}: {
  step: any;
  index: number;
  scrollProgress: any;
  totalSteps: number;
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate when this checkpoint should be revealed based on scroll
  const startProgress = index / totalSteps;
  const endProgress = (index + 1) / totalSteps;

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest: number) => {
      if (latest >= startProgress * 0.8 && !isRevealed) {
        setIsRevealed(true);
      }
    });

    return () => unsubscribe();
  }, [scrollProgress, startProgress, isRevealed]);

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center justify-center mb-32 md:mb-64 ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
      style={{
        minHeight: "200px",
      }}
    >
      {/* Checkpoint Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={
          isRevealed
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
              }
            : {}
        }
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className={`w-full md:w-[480px] ${isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.03, y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Outer glow effect */}
          <motion.div
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(139, 92, 246, 0.15), transparent 70%)",
              filter: "blur(30px)",
            }}
            animate={{
              opacity: isRevealed ? (isHovered ? 0.8 : 0.4) : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Main card */}
          <div
            className="relative rounded-2xl p-8 md:p-10 backdrop-blur-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--glass-bg)",
              border: isRevealed
                ? "1px solid var(--glass-border)"
                : "1px solid transparent",
              boxShadow: isRevealed
                ? isHovered
                  ? "0 25px 70px rgba(139, 92, 246, 0.3), 0 0 50px rgba(139, 92, 246, 0.15)"
                  : "0 15px 50px rgba(0, 0, 0, 0.2)"
                : "none",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Animated corner accents */}
            {isRevealed && (
              <>
                <motion.div
                  className="absolute top-0 left-0 w-20 h-20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.3), transparent)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-20 h-20"
                  style={{
                    background:
                      "linear-gradient(315deg, rgba(139, 92, 246, 0.3), transparent)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </>
            )}

            {/* Shimmer effect on reveal */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)",
              }}
              initial={{ x: "-100%" }}
              animate={isRevealed ? { x: "200%" } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            />

            {/* Particle effects */}
            {isHovered && isRevealed && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-accent rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -60],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}

            <div className="relative z-10">
              {/* Step Number Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isRevealed ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                className="inline-flex mb-6"
              >
                <div
                  className="relative px-6 py-3 rounded-xl backdrop-blur-sm overflow-hidden"
                  style={{
                    backgroundColor: "rgba(139, 92, 246, 0.15)",
                    border: "2px solid rgba(139, 92, 246, 0.4)",
                  }}
                >
                  {/* Animated shine */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                    }}
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="relative text-base font-bold text-accent tracking-widest">
                    {step.number}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-2xl md:text-3xl mb-4 tracking-tight"
              >
                {step.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-muted-foreground leading-relaxed text-base md:text-lg"
              >
                {step.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
