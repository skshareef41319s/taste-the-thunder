interface ScrollProgressProps {
  activeIndex: number;
  total: number;
}

export function ScrollProgress({ activeIndex, total }: ScrollProgressProps) {
  return (
    <div className="fixed right-4 top-1/2 z-[55] hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className={`h-3 w-3 rounded-full border transition-all ${
              isActive ? 'scale-125 border-white bg-thunder-300 shadow-electric' : 'border-white/20 bg-white/8'
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}