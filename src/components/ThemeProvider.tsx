'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Apply transition styles to the document when theme changes
  useEffect(() => {
    // Add transition styles to the document
    document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    // Add a class to enable transitions on all elements that might change with theme
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        transition: background-color 0.5s ease, 
                    border-color 0.5s ease, 
                    color 0.5s ease, 
                    box-shadow 0.5s ease,
                    fill 0.5s ease,
                    stroke 0.5s ease;
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup function
    return () => {
      document.documentElement.style.transition = '';
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem={true}
      storageKey="theme-preference"
      enableColorScheme
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
