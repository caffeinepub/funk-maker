import { useEffect } from 'react';
import { usePatternSession } from '../../state/usePatternSession';
import { useSequencerAudio } from '../../audio/useSequencerAudio';
import TransportControls from './TransportControls';
import StepGrid from './StepGrid';
import TrackList from './TrackList';
import PatternManager from '../patterns/PatternManager';
import CloudSaveLoadPanel from '../patterns/CloudSaveLoadPanel';
import { Card } from '@/components/ui/card';

export default function SequencerWorkspace() {
  const { getActivePattern, updatePattern } = usePatternSession();
  const { isPlaying, currentStep, play, stop, updateTracks, updateBpm } = useSequencerAudio();

  const activePattern = getActivePattern();

  useEffect(() => {
    if (activePattern && isPlaying) {
      updateTracks(activePattern.tracks);
      updateBpm(activePattern.bpm);
    }
  }, [activePattern, isPlaying, updateTracks, updateBpm]);

  if (!activePattern) return null;

  const handlePlay = () => {
    play(activePattern.tracks, activePattern.bpm);
  };

  const handleStop = () => {
    stop();
  };

  const handleBpmChange = (bpm: number) => {
    updatePattern(activePattern.id, { bpm });
    if (isPlaying) {
      updateBpm(bpm);
    }
  };

  const handleStepToggle = (trackIndex: number, stepIndex: number) => {
    const newTracks = [...activePattern.tracks];
    newTracks[trackIndex].steps[stepIndex] = !newTracks[trackIndex].steps[stepIndex];
    updatePattern(activePattern.id, { tracks: newTracks });
  };

  const handleTrackMuteToggle = (trackIndex: number) => {
    const newTracks = [...activePattern.tracks];
    newTracks[trackIndex].muted = !newTracks[trackIndex].muted;
    updatePattern(activePattern.id, { tracks: newTracks });
  };

  const handleTrackVolumeChange = (trackIndex: number, volume: number) => {
    const newTracks = [...activePattern.tracks];
    newTracks[trackIndex].volume = volume;
    updatePattern(activePattern.id, { tracks: newTracks });
  };

  return (
    <div className="space-y-6">
      {/* Pattern and Save/Load Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PatternManager />
        <CloudSaveLoadPanel />
      </div>

      {/* Main Sequencer */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-2">
        <div className="space-y-6">
          {/* Transport Controls */}
          <TransportControls
            isPlaying={isPlaying}
            bpm={activePattern.bpm}
            onPlay={handlePlay}
            onStop={handleStop}
            onBpmChange={handleBpmChange}
          />

          {/* Sequencer Grid */}
          <div className="flex gap-4">
            <TrackList
              tracks={activePattern.tracks}
              onMuteToggle={handleTrackMuteToggle}
              onVolumeChange={handleTrackVolumeChange}
            />
            <StepGrid
              tracks={activePattern.tracks}
              currentStep={isPlaying ? currentStep : -1}
              onStepToggle={handleStepToggle}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
