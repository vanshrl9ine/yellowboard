import { useLayoutEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

const useIsMobile = (): boolean => {
  const [debouncedValue, setValue] = useDebounceValue(765, 10)

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', debounce(updateSize, 250));
    // updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};