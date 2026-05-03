import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../../src/components/ui/Badge';
import { Card } from '../../src/components/ui/Card';
import { exerciseById } from '../../src/data/exercises';
import { muscleGroupById } from '../../src/data/muscleGroups';
import { materialById } from '../../src/data/materials';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../src/constants/tokens';

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

const typeLabel: Record<string, string> = {
  strength: 'Kracht',
  cardio: 'Cardio',
  flexibility: 'Flexibiliteit',
  balance: 'Balans',
};

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const exercise = exerciseById[id ?? ''];

  if (!exercise) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Oefening niet gevonden</Text>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backLink}>Terug</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const primaryMuscles = exercise.primaryMuscleGroupIds
    .map((id) => muscleGroupById[id])
    .filter(Boolean);

  const secondaryMuscles = exercise.secondaryMuscleGroupIds
    .map((id) => muscleGroupById[id])
    .filter(Boolean);

  const mats = exercise.materialIds
    .map((id) => materialById[id])
    .filter(Boolean);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Title block */}
        <View style={styles.titleBlock}>
          <View style={styles.iconBox}>
            <Ionicons name="barbell" size={32} color={Colors.accent} />
          </View>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.description}>{exercise.description}</Text>
          <View style={styles.badgeRow}>
            <Badge
              label={difficultyLabel[exercise.difficulty]}
              variant={difficultyVariant[exercise.difficulty]}
            />
            <Badge label={typeLabel[exercise.type] ?? exercise.type} variant="purple" />
          </View>
        </View>

        {/* Muscles */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Primaire spiergroepen</Text>
          <View style={styles.muscleList}>
            {primaryMuscles.map((mg) => mg && (
              <View key={mg.id} style={styles.muscleItem}>
                <View style={styles.muscleDot} />
                <Text style={styles.muscleName}>{mg.name}</Text>
              </View>
            ))}
          </View>
          {secondaryMuscles.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, styles.sectionTitleSecondary]}>
                Secundaire spiergroepen
              </Text>
              <View style={styles.muscleList}>
                {secondaryMuscles.map((mg) => mg && (
                  <View key={mg.id} style={styles.muscleItem}>
                    <View style={[styles.muscleDot, styles.muscleDotSecondary]} />
                    <Text style={styles.muscleNameSecondary}>{mg.name}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </Card>

        {/* Materials */}
        {mats.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Benodigdheden</Text>
            <View style={styles.materialRow}>
              {mats.map((mat) => mat && (
                <Badge key={mat.id} label={mat.name} variant="muted" />
              ))}
            </View>
          </Card>
        )}

        {/* Instructions */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Uitvoering</Text>
          <View style={styles.stepList}>
            {exercise.instructions.map((step, i) => (
              <View key={i} style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Tips */}
        {exercise.tips && exercise.tips.length > 0 && (
          <Card style={styles.section}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb" size={18} color={Colors.warning} />
              <Text style={styles.sectionTitle}>Tips</Text>
            </View>
            {exercise.tips.map((tip, i) => (
              <Text key={i} style={styles.tipText}>· {tip}</Text>
            ))}
          </Card>
        )}
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
    paddingBottom: Spacing['3xl'],
    gap: Spacing.base,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.black,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  section: {
    marginHorizontal: Spacing.xl,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitleSecondary: {
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  muscleList: {
    gap: Spacing.sm,
  },
  muscleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  muscleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    flexShrink: 0,
  },
  muscleDotSecondary: {
    backgroundColor: Colors.textMuted,
  },
  muscleName: {
    fontSize: FontSize.base,
    color: Colors.text,
  },
  muscleNameSecondary: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  materialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  stepList: {
    gap: Spacing.md,
  },
  step: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  stepText: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.text,
    lineHeight: 22,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tipText: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.base,
  },
  notFoundText: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  backLink: {
    fontSize: FontSize.base,
    color: Colors.accent,
    fontWeight: FontWeight.semibold,
  },
});
