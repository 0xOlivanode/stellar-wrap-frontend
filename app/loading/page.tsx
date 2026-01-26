"use client";

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProgressIndicator } from '../components/ProgressIndicator';

export default function LoadingScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/persona');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--color-theme-background)' }}>
      
      <ProgressIndicator 
        currentStep={3} 
        totalSteps={6}
        showNext={false}
      />
      
      <div className="absolute inset-0 from-black via-black to-black opacity-60" />
      
      <motion.button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-30 group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl backdrop-blur-xl border border-white/20"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Home className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors" />
          <span className="text-xs md:text-sm font-black text-white/80 group-hover:text-white transition-colors hidden sm:inline">
            HOME
          </span>
        </div>
      </motion.button>

      <motion.button
        onClick={handleComplete}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <motion.div
              className="absolute -inset-2 rounded-full blur-lg"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div 
              className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all"
              style={{ 
                backgroundColor: '#000000',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
          </div>
          <span className="text-xs font-black text-white/60 group-hover:text-white/80 transition-colors">
            SKIP
          </span>
        </div>
      </motion.button>
      
      <div className="absolute inset-0 opacity-20">

        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(var(--color-theme-primary-rgb), 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(var(--color-theme-primary-rgb), 0.3) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: 'var(--color-theme-primary)',
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[120px]"
        style={{ backgroundColor: 'rgba(var(--color-theme-primary-rgb), 0.3)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-[100px]"
        style={{ backgroundColor: 'rgba(var(--color-theme-primary-rgb), 0.2)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [50, -50, 50],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-none"
            animate={{
              textShadow: [
                `0 0 20px rgba(var(--color-theme-primary-rgb), 0.5)`,
                `0 0 40px rgba(var(--color-theme-primary-rgb), 0.8)`,
                `0 0 20px rgba(var(--color-theme-primary-rgb), 0.5)`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            WRAPPING
          </motion.h1>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white/80 mb-6 md:mb-10 tracking-tight leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            YOUR JOURNEY
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="inline-block"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 blur-lg md:blur-xl rounded-xl md:rounded-2xl"
                style={{ backgroundColor: 'rgba(var(--color-theme-primary-rgb), 0.4)' }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative backdrop-blur-sm px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderColor: 'rgba(var(--color-theme-primary-rgb), 0.5)',
                  borderWidth: '1px',
                }}
              >
                <h3 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black"
                  style={{
                    background: `linear-gradient(to right, #ffffff, var(--color-theme-primary))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  STELLAR
                </h3>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <motion.div 
          className="mt-12 md:mt-16 w-48 sm:w-56 md:w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: 'var(--color-theme-primary)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}