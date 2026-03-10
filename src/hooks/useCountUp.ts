'use client';
import { useEffect, useState } from 'react';

export function useCountUp(target: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const inc = Math.ceil(target / 50);
    const timer = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setCount(cur);
      if (cur >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);

  return count;
}
