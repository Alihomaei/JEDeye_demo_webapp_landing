import { visibleClasses } from '@/config/segmentation';
import { demoContent } from '@/config/content';
import { cn } from '@/lib/utils';

interface SegmentationLegendProps {
  className?: string;
}

export function SegmentationLegend({ className }: SegmentationLegendProps) {
  return (
    <div className={cn('mt-8 max-w-[900px] mx-auto', className)}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        {demoContent.legendTitle}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {visibleClasses.map((segClass) => (
          <LegendItem key={segClass.id} name={segClass.name} hexColor={segClass.hexColor} />
        ))}
      </div>
    </div>
  );
}

interface LegendItemProps {
  name: string;
  hexColor: string;
}

function LegendItem({ name, hexColor }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-background-alt">
      <div
        className="w-5 h-5 rounded flex-shrink-0 border border-border"
        style={{ backgroundColor: hexColor }}
        aria-hidden="true"
      />
      <span className="text-sm text-text-primary truncate">{name}</span>
    </div>
  );
}
