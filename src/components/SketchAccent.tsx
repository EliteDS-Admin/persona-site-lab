import { cn } from '@/lib/utils';

interface SketchAccentProps {
  className?: string;
  intensity?: 'subtle' | 'bold';
}

export const SketchAccent = ({ className, intensity = 'subtle' }: SketchAccentProps) => {
  const opacity = intensity === 'bold' ? 0.45 : 0.25;

  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      className={cn('pointer-events-none text-primary', className)}
      aria-hidden="true"
    >
      <path
        d="M18 110C40 72 96 132 188 54"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
      />
      <path
        d="M32 46C82 18 140 64 226 18"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity - 0.1}
      />
    </svg>
  );
};
