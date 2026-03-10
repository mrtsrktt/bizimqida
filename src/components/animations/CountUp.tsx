'use client';
import { useRef, useEffect, useState } from 'react';

interface Props {
  target: number;
  suffix?: string;
  className?: string;
  threshold?: number;
}

export default function CountUp({ target, suffix = '', className = '', threshold = 0.3 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started, threshold]);

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

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
