"use client";

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  showNext?: boolean;
  routes?: string[]; // Optional array of routes for each step (1-indexed)
}

// Default route mapping based on the app flow
const DEFAULT_ROUTES = [
  '/',           // Step 1: Landing
  '/connect',    // Step 2: Connect
  '/loading',    // Step 3: Loading
  '/vibe-check', // Step 4: Vibe Check
  '/persona',    // Step 5: Persona
  '/share',      // Step 6: Share
];

export function ProgressIndicator({ currentStep, totalSteps, onNext, showNext = false, routes }: ProgressIndicatorProps) {
 const router = useRouter();
 const routeMap = routes || DEFAULT_ROUTES;
 const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
   if (typeof window === 'undefined') return;
   const checkMobile = () => setIsMobile(window.innerWidth < 768);
   checkMobile();
   window.addEventListener('resize', checkMobile);
   return () => window.removeEventListener('resize', checkMobile);
 }, []);

  return (
    <>
      {/* Home button */}
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

      {/* Progress dots */}
      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          const route = routeMap[index];
          const isClickable = route && stepNumber !== currentStep;
          
          const handleClick = () => {
            if (isClickable && route) {
              router.push(route);
            }
          };

          return (
            <motion.button
              key={index}
              onClick={handleClick}
              disabled={!isClickable}
              className="relative cursor-pointer disabled:cursor-default focus:outline-none p-2 -m-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={isClickable ? { scale: 1.2 } : {}}
              whileTap={isClickable ? { scale: 0.9 } : {}}
              title={route && isClickable ? `Go to step ${stepNumber}` : stepNumber === currentStep ? `Current step: ${stepNumber}` : undefined}
            >
              {/* Active indicator */}
              {stepNumber === currentStep ? (
                <motion.div
                  className="h-1.5 md:h-2 rounded-full"
                  style={{ 
                    width: isMobile ? '40px' : '60px',
                    backgroundColor: 'var(--color-theme-primary)',
                    boxShadow: `0 0 20px rgba(var(--color-theme-primary-rgb), 0.6)`,
                  }}
                  layoutId="active-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              ) : (
                /* Inactive indicator */
                <div
                  className="h-1.5 md:h-2 rounded-full transition-all"
                  style={{ 
                    width: stepNumber < currentStep ? (isMobile ? '30px' : '40px') : (isMobile ? '20px' : '30px'),
                    backgroundColor: stepNumber < currentStep ? `rgba(var(--color-theme-primary-rgb), 0.4)` : 'rgba(255, 255, 255, 0.2)',
                    opacity: isClickable ? 1 : 0.5,
                    cursor: isClickable ? 'pointer' : 'default',
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Next button */}
      {showNext && onNext && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
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
              <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </motion.button>
      )}
    </>
  );
}