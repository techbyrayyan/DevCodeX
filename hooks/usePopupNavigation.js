import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function usePopupNavigation(onNavigate) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToolUrl, setSelectedToolUrl] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

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
    setIsOpen(false);

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
