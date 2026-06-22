import { useState, useEffect } from 'react';

type AnimatedMetricCardProps = {
  label: string;
  value: number;
  animationKey: string;
  tone?: 'navy' | 'gold' | 'maroon' | 'blue';
};

export default function AnimatedMetricCard({
  label,
  value,
  animationKey,
  tone = 'navy',
}: AnimatedMetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const toneClasses = {
    navy: { value: 'text-toastmasters-navy' },
    gold: { value: 'text-toastmasters-gold-dark' },
    maroon: { value: 'text-toastmasters-maroon' },
    blue: { value: 'text-toastmasters-navy-light' },
  }[tone];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    let animationFrame = 0;
    const duration = 900;
    const startTime = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    setDisplayValue(0);
    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [animationKey, value]);

  return (
    <div className="px-0 py-4 text-center sm:py-5">
      <p className="font-['MyriadPro-Medium','MyriadPro-Light',Arial,sans-serif] text-[0.86rem] font-semibold uppercase tracking-[0.16em] text-black sm:text-[0.95rem]">
        {label}
      </p>
      <p className={`mt-1 text-[2.6rem] font-semibold leading-none tracking-[-0.04em] ${toneClasses.value} sm:text-[3.15rem]`}>
        {displayValue.toLocaleString()}
      </p>
    </div>
  );
}
