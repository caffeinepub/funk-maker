import { Track } from '../../types/music';
import { cn } from '@/lib/utils';

interface StepGridProps {
  tracks: Track[];
  currentStep: number;
  onStepToggle: (trackIndex: number, stepIndex: number) => void;
}

export default function StepGrid({ tracks, currentStep, onStepToggle }: StepGridProps) {
  return (
    <div className="flex-1 overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Step numbers */}
        <div className="flex gap-1 mb-2 pl-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-10 h-6 flex items-center justify-center text-xs font-medium',
                i % 4 === 0 ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="space-y-2">
          {tracks.map((track, trackIndex) => (
            <div key={track.id} className="flex gap-1">
              {track.steps.map((active, stepIndex) => (
                <button
                  key={stepIndex}
                  onClick={() => onStepToggle(trackIndex, stepIndex)}
                  className={cn(
                    'w-10 h-10 rounded-md border-2 transition-all duration-150',
                    'hover:scale-105 active:scale-95',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    active
                      ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                      : 'bg-muted/30 border-border hover:bg-muted/50',
                    currentStep === stepIndex && 'ring-2 ring-accent ring-offset-2 ring-offset-background',
                    stepIndex % 4 === 0 && 'ml-1'
                  )}
                  aria-label={`Track ${track.name}, Step ${stepIndex + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
