import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { useProfileStore } from '../../src/store/profileStore';
import { materials, materialById } from '../../src/data/materials';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../src/constants/tokens';

const goalLabels: Record<string, string> = {
  muscle_gain: 'Spiermassa',
  fat_loss: 'Afvallen',
  endurance: 'Uithoudingsvermogen',
  strength: 'Kracht',
  flexibility: 'Flexibiliteit',
  general_fitness: 'Algemene Fitness',
};

const levelLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Gevorderd',
  advanced: 'Expert',
};

export default function ProfileScreen() {
  const { profile, toggleMaterial } = useProfileStore();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar & name */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={Colors.accent} />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Badge label={levelLabels[profile.fitnessLevel]} variant="blue" />
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <ProfileStatItem label="Workouts/week" value={String(profile.weeklyWorkouts)} icon="flash" />
          {profile.heightCm && (
            <ProfileStatItem label="Lengte" value={`${profile.heightCm} cm`} icon="resize-outline" />
          )}
          {profile.weightKg && (
            <ProfileStatItem label="Gewicht" value={`${profile.weightKg} kg`} icon="scale-outline" />
          )}
        </View>

        {/* Goals */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flag" size={18} color={Colors.accent} />
            <Text style={styles.sectionTitle}>Doelstellingen</Text>
          </View>
          <View style={styles.badgeRow}>
            {profile.goals.map((goal) => (
              <Badge key={goal} label={goalLabels[goal] ?? goal} variant="accent" />
            ))}
          </View>
        </Card>

        {/* Materials */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="barbell" size={18} color={Colors.accent} />
            <Text style={styles.sectionTitle}>Beschikbaar Materiaal</Text>
          </View>
          <View style={styles.materialList}>
            {materials.map((mat) => {
              const isSelected = profile.availableMaterialIds.includes(mat.id);
              return (
                <TouchableOpacity
                  key={mat.id}
                  style={[styles.materialItem, isSelected && styles.materialSelected]}
                  onPress={() => toggleMaterial(mat.id)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.materialName, isSelected && styles.materialNameSelected]}>
                    {mat.name}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={18} color={Colors.accent} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Info */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={18} color={Colors.textSecondary} />
            <Text style={styles.sectionTitle}>Over de app</Text>
          </View>
          <Text style={styles.infoText}>
            Fitness Manager v1.0 — MVP{'\n'}
            Profielbewerking beschikbaar in de volgende versie.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

interface ProfileStatItemProps {
  label: string;
  value: string;
  icon: string;
}

function ProfileStatItem({ label, value, icon }: ProfileStatItemProps) {
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon as any} size={18} color={Colors.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
    alignItems: 'center',
    paddingTop: Spacing['2xl'],
    gap: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentMuted,
    borderWidth: 2,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.black,
    color: Colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing['2xl'],
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    padding: Spacing.base,
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  materialList: {
    gap: Spacing.sm,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  materialSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentMuted,
  },
  materialName: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  materialNameSelected: {
    color: Colors.accent,
    fontWeight: FontWeight.semibold,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
