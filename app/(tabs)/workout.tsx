import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stopwatch } from '../../src/components/workout/Stopwatch';
import { Card } from '../../src/components/ui/Card';
import { Colors, Spacing, FontSize, FontWeight } from '../../src/constants/tokens';

export default function WorkoutScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Workout Tracker</Text>
          <Text style={styles.subtitle}>Track je sessie met de stopwatch</Text>
        </View>

        <View style={styles.stopwatchSection}>
          <Stopwatch />
        </View>

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>Tip</Text>
          <Text style={styles.tipText}>
            Start de stopwatch zodra je begint met je workout. Pauzeer bij rust en stop wanneer je klaar bent.
          </Text>
        </Card>

        <Card style={styles.comingSoonCard}>
          <Text style={styles.comingTitle}>Binnenkort</Text>
          <View style={styles.comingList}>
            {[
              'Sets & reps bijhouden',
              'Workout logboek',
              'Persoonlijke records',
              'Workout generator',
            ].map((item) => (
              <Text key={item} style={styles.comingItem}>
                · {item}
              </Text>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  header: {
    paddingTop: Spacing.lg,
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.black,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  stopwatchSection: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
  },
  tipCard: {
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  tipTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  comingSoonCard: {
    padding: Spacing.base,
    gap: Spacing.md,
  },
  comingTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  comingList: {
    gap: Spacing.sm,
  },
  comingItem: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
});
