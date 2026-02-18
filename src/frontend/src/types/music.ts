// Core music types for the sequencer

export const STEPS_PER_PATTERN = 16;
export const DEFAULT_BPM = 120;

export type TrackId = 'kick' | 'snare' | 'hihat' | 'clap';

export interface Track {
  id: TrackId;
  name: string;
  steps: boolean[];
  muted: boolean;
  volume: number;
}

export interface Pattern {
  id: number;
  name: string;
  bpm: number;
  tracks: Track[];
}

export interface SessionState {
  patterns: Pattern[];
  activePatternId: number;
}

export function createEmptyTrack(id: TrackId, name: string): Track {
  return {
    id,
    name,
    steps: Array(STEPS_PER_PATTERN).fill(false),
    muted: false,
    volume: 0.7,
  };
}

export function createEmptyPattern(id: number, name: string): Pattern {
  return {
    id,
    name,
    bpm: DEFAULT_BPM,
    tracks: [
      createEmptyTrack('kick', 'Kick'),
      createEmptyTrack('snare', 'Snare'),
      createEmptyTrack('hihat', 'Hi-Hat'),
      createEmptyTrack('clap', 'Clap'),
    ],
  };
}

// Convert frontend pattern to backend format
export function patternToBackend(pattern: Pattern): {
  id: bigint;
  name: string;
  data: bigint[][];
} {
  const data = pattern.tracks.map((track) =>
    track.steps.map((step, idx) => BigInt(step ? idx : -1)).filter((v) => v >= 0)
  );
  return {
    id: BigInt(pattern.id),
    name: pattern.name,
    data,
  };
}

// Convert backend pattern to frontend format
export function patternFromBackend(
  backendPattern: { id: bigint; name: string; data: bigint[][] },
  trackIds: TrackId[]
): Pattern {
  const tracks = backendPattern.data.map((trackData, idx) => {
    const steps = Array(STEPS_PER_PATTERN).fill(false);
    trackData.forEach((stepIdx) => {
      const index = Number(stepIdx);
      if (index >= 0 && index < STEPS_PER_PATTERN) {
        steps[index] = true;
      }
    });
    const trackId = trackIds[idx] || 'kick';
    return createEmptyTrack(trackId, trackId.charAt(0).toUpperCase() + trackId.slice(1));
  });

  return {
    id: Number(backendPattern.id),
    name: backendPattern.name,
    bpm: DEFAULT_BPM,
    tracks,
  };
}
