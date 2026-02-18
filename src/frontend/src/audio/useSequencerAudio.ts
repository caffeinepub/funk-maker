import { useEffect, useRef, useState } from 'react';
import { DrumVoice } from './drumVoices';
import { Track, TrackId } from '../types/music';

const LOOKAHEAD = 25.0; // ms
const SCHEDULE_AHEAD_TIME = 0.1; // seconds

export function useSequencerAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const drumVoiceRef = useRef<DrumVoice | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentStepRef = useRef(0);
  const timerIdRef = useRef<number | null>(null);
  const bpmRef = useRef(120);
  const tracksRef = useRef<Track[]>([]);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      drumVoiceRef.current = new DrumVoice(audioContextRef.current);
    }
  };

  const scheduleNote = (stepIndex: number, time: number) => {
    tracksRef.current.forEach((track) => {
      if (track.muted || !track.steps[stepIndex]) return;

      const volume = track.volume;
      const voice = drumVoiceRef.current;
      if (!voice) return;

      switch (track.id) {
        case 'kick':
          voice.playKick(time, volume);
          break;
        case 'snare':
          voice.playSnare(time, volume);
          break;
        case 'hihat':
          voice.playHiHat(time, volume);
          break;
        case 'clap':
          voice.playClap(time, volume);
          break;
      }
    });
  };

  const scheduler = () => {
    if (!audioContextRef.current) return;

    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + SCHEDULE_AHEAD_TIME) {
      scheduleNote(currentStepRef.current, nextNoteTimeRef.current);
      nextStep();
    }
    timerIdRef.current = window.setTimeout(scheduler, LOOKAHEAD);
  };

  const nextStep = () => {
    const secondsPerBeat = 60.0 / bpmRef.current;
    nextNoteTimeRef.current += 0.25 * secondsPerBeat; // 16th notes

    currentStepRef.current = (currentStepRef.current + 1) % 16;
    setCurrentStep(currentStepRef.current);
  };

  const play = (tracks: Track[], bpm: number) => {
    initAudioContext();
    if (!audioContextRef.current) return;

    tracksRef.current = tracks;
    bpmRef.current = bpm;
    currentStepRef.current = 0;
    setCurrentStep(0);
    nextNoteTimeRef.current = audioContextRef.current.currentTime;
    setIsPlaying(true);
    scheduler();
  };

  const stop = () => {
    setIsPlaying(false);
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    currentStepRef.current = 0;
    setCurrentStep(0);
  };

  const updateTracks = (tracks: Track[]) => {
    tracksRef.current = tracks;
  };

  const updateBpm = (bpm: number) => {
    bpmRef.current = bpm;
  };

  return {
    isPlaying,
    currentStep,
    play,
    stop,
    updateTracks,
    updateBpm,
  };
}
