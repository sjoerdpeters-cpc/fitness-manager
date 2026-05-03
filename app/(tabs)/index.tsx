import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatCard } from '../../src/components/home/StatCard';
import { SectionHeader } from '../../src/components/ui/SectionHeader';
import { ExerciseCard } from '../../src/components/exercise/ExerciseCard';
import { Card } from '../../src/components/ui/Card';
import { useProfileStore } from '../../src/store/profileStore';
import { exercises } from '../../src/data/exercises';
import { Colors, Spacing, FontSize, FontWeight, Radius, Shadows } from '../../src/constants/tokens';

const featuredExercises = exercises.slice(0, 3);

const goalLabels: Record<string, string> = {
  muscle_gain: 'Spiermassa',
  fat_loss: 'Afvallen',
  endurance: 'Uithoudingsvermogen',
  strength: 'Kracht',
  flexibility: 'Flexibiliteit',
  general_fitness: 'Algemene Fitness',
};

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useProfileStore();

  const primaryGoal = profile.goals[0] ? goalLabels[profile.goals[0]] : 'Fitness';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero banner */}
        <LinearGradient
          colors={['#2A1000', '#FF6B3520', Colors.background]}
          style={styles.hero}
        >
          <View style={styles.heroContent}>
            <Text style={styles.greeting}>Goedemorgen,</Text>
            <Text style={styles.heroName}>{profile.name} 👋</Text>
            <Text style={styles.heroSub}>Doel: {primaryGoal}</Text>
          </View>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => router.push('/(tabs)/workout')}
            activeOpacity={0.8}
          >
            <LinearGradient colors={[Colors.accent, '#FF8C42']} style={styles.startBtnGradient}>
              <Ionicons name="play" size={20} color={Colors.text} />
              <Text style={styles.startBtnLabel}>Start Workout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.section}>
          <SectionHeader title="Overzicht" />
          <View style={styles.statsRow}>
            <StatCard label="Workouts / week" value={String(profile.weeklyWorkouts)} icon="flash" accent />
            <StatCard label="Niveau" value={profile.fitnessLevel === 'beginner' ? 'Starter' : profile.fitnessLevel === 'intermediate' ? 'Gevorderd' : 'Expert'} icon="trophy-outline" />
            <StatCard label="Doelen" value={String(profile.goals.length)} icon="flag-outline" />
          </View>
        </View>

        {/* Quick access */}
        <View style={styles.section}>
          <SectionHeader title="Snel starten" />
          <View style={styles.quickRow}>
            <QuickAccessCard
              icon="barbell"
              label="Oefeningen"
              sublabel={`${exercises.length} beschikbaar`}
              onPress={() => router.push('/(tabs)/exercises')}
            />
            <QuickAccessCard
              icon="timer"
              label="Stopwatch"
              sublabel="Track je tijd"
              onPress={() => router.push('/(tabs)/workout')}
            />
          </View>
        </View>

        {/* Featured exercises */}
        <View style={styles.section}>
          <SectionHeader
            title="Aanbevolen"
            actionLabel="Alles zien"
            onAction={() => router.push('/(tabs)/exercises')}
          />
          {featuredExercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onPress={() => router.push(`/exercise/${ex.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface QuickAccessCardProps {
  icon: string;
  label: string;
  sublabel: string;
  onPress: () => void;
}

function QuickAccessCard({ icon, label, sublabel, onPress }: QuickAccessCardProps) {
  return (
    <TouchableOpacity style={styles.quickCard} onPress={onPress} activeOpacity={0.8}>
      <Card elevated style={styles.quickCardInner}>
        <View style={styles.quickIconBox}>
          <Ionicons name={icon as any} size={24} color={Colors.accent} />
        </View>
        <Text style={styles.quickLabel}>{label}</Text>
        <Text style={styles.quickSublabel}>{sublabel}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing['3xl'],
  },
  hero: {
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  heroContent: {
    gap: Spacing.xs,
  },
  greeting: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  heroName: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.black,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  startBtn: {
    alignSelf: 'flex-start',
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadows.accent,
  },
  startBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  startBtnLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickCard: {
    flex: 1,
  },
  quickCardInner: {
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  quickIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  quickSublabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
