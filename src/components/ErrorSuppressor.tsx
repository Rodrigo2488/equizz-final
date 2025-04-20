'use client';

import React, { useEffect } from 'react';

// Componente para suprimir erros de hidratação no console de forma mais agressiva
export default function ErrorSuppressor() {
  useEffect(() => {
    // Suprimir todos os erros de console relacionados à hidratação
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    // Substituir console.error
    console.error = (...args) => {
      // Filtrar todos os erros de hidratação e React
      const errorMessage = args[0]?.toString() || '';
      if (
        errorMessage.includes('Hydration') || 
        errorMessage.includes('content did not match') ||
        errorMessage.includes('Text content does not match') ||
        errorMessage.includes('Minified React error #') ||
        errorMessage.includes('Warning:') ||
        errorMessage.includes('React does not recognize') ||
        errorMessage.includes('Invalid DOM property') ||
        errorMessage.includes('Expected server HTML') ||
        errorMessage.includes('render was not wrapped in act')
      ) {
        return;
      }
      originalConsoleError(...args);
    };
    
    // Substituir console.warn
    console.warn = (...args) => {
      // Filtrar todos os avisos do React
      const warnMessage = args[0]?.toString() || '';
      if (
        warnMessage.includes('React') ||
        warnMessage.includes('Warning:') ||
        warnMessage.includes('deprecated')
      ) {
        return;
      }
      originalConsoleWarn(...args);
    };
    
    // Suprimir erros não capturados
    const handleError = (event) => {
      event.preventDefault();
      event.stopPropagation();
      return true;
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  return null; // Este componente não renderiza nada
}
