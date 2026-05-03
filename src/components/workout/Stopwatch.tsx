import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWorkoutStore } from '../../store/workoutStore';
import { Colors, Spacing, FontSize, FontWeight, Radius, Shadows } from '../../constants/tokens';

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function Stopwatch() {
  const { timerStatus, elapsedSeconds, startTimer, pauseTimer, resumeTimer, resetTimer, tickTimer } =
    useWorkoutStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerStatus === 'running') {
      intervalRef.current = setInterval(() => {
        tickTimer();
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerStatus, tickTimer]);

  const isIdle = timerStatus === 'idle';
  const isRunning = timerStatus === 'running';
  const isPaused = timerStatus === 'paused';

  return (
    <View style={styles.container}>
      <View style={styles.displayWrapper}>
        <View style={styles.display}>
          <Text style={styles.time}>{formatTime(elapsedSeconds)}</Text>
          <Text style={styles.statusLabel}>
            {isIdle ? 'Klaar om te starten' : isRunning ? 'Actief' : 'Gepauzeerd'}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        {isIdle && (
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={startTimer} activeOpacity={0.8}>
            <Ionicons name="play" size={28} color={Colors.text} />
          </TouchableOpacity>
        )}

        {isRunning && (
          <>
            <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={resetTimer} activeOpacity={0.8}>
              <Ionicons name="stop" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={pauseTimer} activeOpacity={0.8}>
              <Ionicons name="pause" size={28} color={Colors.text} />
            </TouchableOpacity>
          </>
        )}

        {isPaused && (
          <>
            <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={resetTimer} activeOpacity={0.8}>
              <Ionicons name="stop" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={resumeTimer} activeOpacity={0.8}>
              <Ionicons name="play" size={28} color={Colors.text} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing['3xl'],
  },
  displayWrapper: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: Colors.surface,
    borderWidth: 3,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  display: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  time: {
    fontSize: 52,
    fontWeight: FontWeight.black,
    color: Colors.text,
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
  },
  statusLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  controls: {
    flexDirection: 'row',
    gap: Spacing.xl,
    alignItems: 'center',
  },
  btn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: Colors.accent,
    width: 72,
    height: 72,
    borderRadius: 36,
    ...Shadows.accent,
  },
  btnSecondary: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
});
