import { create } from 'zustand';

type TimerStatus = 'idle' | 'running' | 'paused';

interface WorkoutState {
  timerStatus: TimerStatus;
  elapsedSeconds: number;
  startTime: number | null;
  pausedAt: number | null;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  timerStatus: 'idle',
  elapsedSeconds: 0,
  startTime: null,
  pausedAt: null,

  startTimer: () =>
    set({
      timerStatus: 'running',
      startTime: Date.now(),
      elapsedSeconds: 0,
      pausedAt: null,
    }),

  pauseTimer: () =>
    set((state) => ({
      timerStatus: 'paused',
      pausedAt: Date.now(),
    })),

  resumeTimer: () =>
    set((state) => {
      if (!state.startTime || !state.pausedAt) return state;
      const pausedDuration = Date.now() - state.pausedAt;
      return {
        timerStatus: 'running',
        startTime: state.startTime + pausedDuration,
        pausedAt: null,
      };
    }),

  resetTimer: () =>
    set({
      timerStatus: 'idle',
      elapsedSeconds: 0,
      startTime: null,
      pausedAt: null,
    }),

  tickTimer: () =>
    set((state) => {
      if (state.timerStatus !== 'running' || !state.startTime) return state;
      return { elapsedSeconds: Math.floor((Date.now() - state.startTime) / 1000) };
    }),
}));
