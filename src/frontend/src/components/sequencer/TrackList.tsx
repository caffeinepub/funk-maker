import { Volume2, VolumeX } from 'lucide-react';
import { Track } from '../../types/music';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface TrackListProps {
  tracks: Track[];
  onMuteToggle: (trackIndex: number) => void;
  onVolumeChange: (trackIndex: number, volume: number) => void;
}

export default function TrackList({ tracks, onMuteToggle, onVolumeChange }: TrackListProps) {
  return (
    <div className="w-48 space-y-2">
      {/* Header spacer */}
      <div className="h-6 mb-2" />

      {/* Track controls */}
      {tracks.map((track, index) => (
        <div key={track.id} className="h-10 flex items-center gap-2 px-2 rounded-md bg-muted/20">
          <span className="text-sm font-medium flex-shrink-0 w-16">{track.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8 flex-shrink-0', track.muted && 'text-muted-foreground')}
            onClick={() => onMuteToggle(index)}
          >
            {track.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[track.volume * 100]}
            onValueChange={([value]) => onVolumeChange(index, value / 100)}
            min={0}
            max={100}
            step={1}
            className="flex-1"
            disabled={track.muted}
          />
        </div>
      ))}
    </div>
  );
}
