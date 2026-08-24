import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom Hook: usePopupNavigation
 * 
 * Flow:
 * 1. User clicks Tool Card -> handleToolClick triggers card click animation.
 * 2. Delay 350ms to allow card click & glow animation to complete visually.
 * 3. Opens Welcome Popup with smooth Framer Motion backdrop & content animation.
 * 4. User clicks "Continue to Tool" -> handleContinue plays popup exit animation (450ms).
 * 5. Navigates to selected tool.
 * 6. Locks body scrolling while popup is open.
 */
export default function usePopupNavigation(onNavigate) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToolUrl, setSelectedToolUrl] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Lock page scrolling while popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleToolClick = useCallback((e, toolUrl, toolData = null) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    let url = toolUrl;
    let data = toolData;

    if (typeof toolUrl === 'object' && toolUrl !== null) {
      data = toolUrl;
      url = toolUrl.url || toolUrl.href || toolUrl.id || '/tools';
    }

    setSelectedToolUrl(url);
    setSelectedTool(data);

    // Wait 350ms so card click & glow animation plays FIRST before popup covers screen
    setTimeout(() => {
      setIsOpen(true);
      setIsNavigating(false);
    }, 350);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleContinue = useCallback(() => {
    setIsNavigating(true);
    // Trigger Framer Motion exit animation
    setIsOpen(false);

    // Wait for the exit animation duration (450ms) before opening tool
    setTimeout(() => {
      if (typeof onNavigate === 'function' && selectedToolUrl) {
        onNavigate(selectedToolUrl, selectedTool);
      } else if (selectedToolUrl) {
        if (selectedToolUrl.startsWith('/')) {
          router.push(selectedToolUrl);
        } else {
          router.push(`/tools?tool=${selectedToolUrl}`);
        }
      }
      setIsNavigating(false);
    }, 450);
  }, [selectedToolUrl, selectedTool, onNavigate, router]);

  return {
    isOpen,
    selectedToolUrl,
    selectedTool,
    isNavigating,
    handleToolClick,
    handleClose,
    handleContinue,
    openPopup: handleToolClick,
    closePopup: handleClose,
  };
}
