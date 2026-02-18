import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface TransportControlsProps {
  isPlaying: boolean;
  bpm: number;
  onPlay: () => void;
  onStop: () => void;
  onBpmChange: (bpm: number) => void;
}

export default function TransportControls({
  isPlaying,
  bpm,
  onPlay,
  onStop,
  onBpmChange,
}: TransportControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Play/Stop */}
      <div className="flex gap-2">
        <Button
          onClick={isPlaying ? onStop : onPlay}
          size="lg"
          className="gap-2 min-w-[120px] font-semibold"
          variant={isPlaying ? 'secondary' : 'default'}
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" />
              Stop
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Play
            </>
          )}
        </Button>
      </div>

      {/* BPM Control */}
      <div className="flex items-center gap-4 flex-1 min-w-[300px]">
        <Label htmlFor="bpm-input" className="text-sm font-medium whitespace-nowrap">
          BPM
        </Label>
        <Input
          id="bpm-input"
          type="number"
          min={60}
          max={200}
          value={bpm}
          onChange={(e) => onBpmChange(Number(e.target.value))}
          className="w-20"
        />
        <Slider
          value={[bpm]}
          onValueChange={([value]) => onBpmChange(value)}
          min={60}
          max={200}
          step={1}
          className="flex-1"
        />
      </div>
    </div>
  );
}
