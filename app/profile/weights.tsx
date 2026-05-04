import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { WeightRangeSlider } from '../../src/components/profile/WeightRangeSlider';
import { useProfileStore } from '../../src/store/profileStore';
import { materialById } from '../../src/data/materials';
import { MATERIAL_WEIGHT_CONFIGS } from '../../src/data/weights';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../src/constants/tokens';
import type { WeightRange } from '../../src/models/material';

export default function WeightsScreen() {
  const router = useRouter();
  const { profile, materialWeightRanges, setWeightRange } = useProfileStore();

  // Alleen free_weight materialen die de gebruiker heeft aangevinkt
  const activeConfigs = MATERIAL_WEIGHT_CONFIGS.filter((c) =>
    profile.availableMaterialIds.includes(c.materialId)
  );

  // Alle free_weight configs (ook niet-aangevinkte), grayed out
  const allConfigs = MATERIAL_WEIGHT_CONFIGS;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Gewichten</Text>
          <Text style={styles.subtitle}>Stel in welke gewichten je beschikbaar hebt</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeConfigs.length === 0 && (
          <Card style={styles.emptyCard}>
            <Ionicons name="barbell-outline" size={32} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>Geen vrije gewichten geselecteerd</Text>
            <Text style={styles.emptyText}>
              Ga naar Profiel en selecteer materialen zoals Dumbbell, Barbell of Kettlebell.
            </Text>
          </Card>
        )}

        {activeConfigs.map((config) => {
          const material = materialById[config.materialId];
          if (!material) return null;
          const range = materialWeightRanges[config.materialId] ?? {
            minKg: config.defaultMin,
            maxKg: config.defaultMax,
          };
          return (
            <Card key={config.materialId} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                  <Ionicons name="barbell" size={20} color={Colors.accent} />
                </View>
                <Text style={styles.cardTitle}>{material.name}</Text>
              </View>
              <WeightRangeSlider
                materialName={material.name}
                applicableWeights={config.applicableWeights}
                range={range}
                onRangeChange={(newRange: WeightRange) =>
                  setWeightRange(config.materialId, newRange)
                }
              />
            </Card>
          );
        })}

        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>
              Het ingestelde bereik wordt later gebruikt door de workout generator om
              oefeningen en gewichten op jouw niveau voor te stellen.
            </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  titleBlock: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.black,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.base,
  },
  card: {
    padding: Spacing.base,
    gap: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  emptyCard: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    padding: Spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
