'use client';

type LoaderProps = {
  show: boolean;
  className?: string;
  size?: number;
  thickness?: number;
  colorClass?: string;
};

export function PageLoader({ show, className }: LoaderProps) {
  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-999 flex items-center justify-center">
      <div
        className="relative size-16 animate-spin"
        style={{ animationDuration: '2s' }}
      >
        {[...Array(8)]?.map((_, i) => (
          <div
            key={i}
            className="bg-secondary absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-24px)`,
              opacity: 1 - i * 0.1,
            }}
          ></div>
        ))}
        {/* <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary"></div> */}
      </div>
    </div>
  );
}
