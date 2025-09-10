'use client';

import { useEffect, useState } from 'react';

interface KeyboardState {
  isVisible: boolean;
  height: number;
}

export function useMobileKeyboard(): KeyboardState {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isVisible: false,
    height: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let initialViewportHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;

      // 키보드가 올라왔다고 간주하는 임계값 (100px)
      const isKeyboardVisible = heightDifference > 100;

      setKeyboardState({
        isVisible: isKeyboardVisible,
        height: isKeyboardVisible ? heightDifference : 0,
      });
    };

    const handleVisualViewportChange = () => {
      if (!window.visualViewport) return;

      const viewport = window.visualViewport;
      const keyboardHeight = window.innerHeight - viewport.height;
      const isVisible = keyboardHeight > 50; // 50px 이상이면 키보드로 간주

      setKeyboardState({
        isVisible,
        height: isVisible ? keyboardHeight : 0,
      });
    };

    // Visual Viewport API 지원 여부 확인
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
      window.visualViewport.addEventListener('scroll', handleVisualViewportChange);
    } else {
      // fallback: window resize 이벤트 사용
      window.addEventListener('resize', handleResize);
    }

    // 초기 상태 설정
    handleResize();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
        window.visualViewport.removeEventListener('scroll', handleVisualViewportChange);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return keyboardState;
}




