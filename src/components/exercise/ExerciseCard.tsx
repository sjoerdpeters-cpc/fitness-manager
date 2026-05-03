import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/tokens';
import type { Exercise } from '../../models/exercise';
import { muscleGroupById } from '../../data/muscleGroups';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
}

const difficultyVariant: Record<string, 'green' | 'blue' | 'accent'> = {
  beginner: 'green',
  intermediate: 'blue',
  advanced: 'accent',
};

const difficultyLabel: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Gevorderd',
  advanced: 'Expert',
};

const patternIcon: Record<string, string> = {
  push: 'arrow-up-circle',
  pull: 'arrow-down-circle',
  squat: 'body',
  hinge: 'sync',
  carry: 'barbell',
  rotation: 'refresh-circle',
  lunge: 'walk',
};

export function ExerciseCard({ exercise, onPress }: ExerciseCardProps) {
  const primaryMuscle = muscleGroupById[exercise.primaryMuscleGroupIds[0]];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons
            name={(patternIcon[exercise.movementPattern] as any) ?? 'barbell'}
            size={24}
            color={Colors.accent}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {exercise.name}
          </Text>
          {primaryMuscle && (
            <Text style={styles.muscle} numberOfLines={1}>
              {primaryMuscle.name}
            </Text>
          )}
          <View style={styles.badges}>
            <Badge
              label={difficultyLabel[exercise.difficulty]}
              variant={difficultyVariant[exercise.difficulty]}
            />
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  muscle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  badges: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
});
