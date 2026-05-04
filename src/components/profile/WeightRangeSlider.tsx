import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/tokens';
import type { WeightRange } from '../../models/material';

interface WeightRangeSliderProps {
  materialName: string;
  applicableWeights: number[];
  range: WeightRange;
  onRangeChange: (range: WeightRange) => void;
}

function weightLabel(kg: number): string {
  return `${kg} kg`;
}

export function WeightRangeSlider({
  materialName,
  applicableWeights,
  range,
  onRangeChange,
}: WeightRangeSliderProps) {
  const minIndex = applicableWeights.indexOf(range.minKg);
  const maxIndex = applicableWeights.indexOf(range.maxKg);

  // Fallback naar geldige indices als waarde niet in de lijst staat
  const safeMinIdx = minIndex >= 0 ? minIndex : 0;
  const safeMaxIdx = maxIndex >= 0 ? maxIndex : applicableWeights.length - 1;

  const [localMinIdx, setLocalMinIdx] = useState(safeMinIdx);
  const [localMaxIdx, setLocalMaxIdx] = useState(safeMaxIdx);

  const minWeight = applicableWeights[localMinIdx];
  const maxWeight = applicableWeights[localMaxIdx];
  const lastIdx = applicableWeights.length - 1;

  function handleMinChange(value: number) {
    const idx = Math.round(value);
    const clamped = Math.min(idx, localMaxIdx);
    setLocalMinIdx(clamped);
    onRangeChange({ minKg: applicableWeights[clamped], maxKg: maxWeight });
  }

  function handleMaxChange(value: number) {
    const idx = Math.round(value);
    const clamped = Math.max(idx, localMinIdx);
    setLocalMaxIdx(clamped);
    onRangeChange({ minKg: minWeight, maxKg: applicableWeights[clamped] });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.materialName}>{materialName}</Text>
        <View style={styles.rangeBadge}>
          <Text style={styles.rangeText}>
            {weightLabel(minWeight)} — {weightLabel(maxWeight)}
          </Text>
        </View>
      </View>

      <View style={styles.sliderBlock}>
        <View style={styles.sliderRow}>
          <Text style={styles.sliderLabel}>Min</Text>
          <Text style={styles.sliderValue}>{weightLabel(minWeight)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={lastIdx}
          step={1}
          value={localMinIdx}
          onValueChange={handleMinChange}
          minimumTrackTintColor={Colors.accent}
          maximumTrackTintColor={Colors.surfaceBorder}
          thumbTintColor={Colors.accent}
        />
      </View>

      <View style={styles.sliderBlock}>
        <View style={styles.sliderRow}>
          <Text style={styles.sliderLabel}>Max</Text>
          <Text style={styles.sliderValue}>{weightLabel(maxWeight)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={lastIdx}
          step={1}
          value={localMaxIdx}
          onValueChange={handleMaxChange}
          minimumTrackTintColor={Colors.surfaceBorder}
          maximumTrackTintColor={Colors.surfaceBorder}
          thumbTintColor={Colors.accentSecondary}
        />
      </View>

      <View style={styles.weightScale}>
        {applicableWeights
          .filter((_, i) => i % Math.ceil(applicableWeights.length / 5) === 0 || i === applicableWeights.length - 1)
          .map((w) => {
            const idx = applicableWeights.indexOf(w);
            const active = idx >= localMinIdx && idx <= localMaxIdx;
            return (
              <Text key={w} style={[styles.scaleLabel, active && styles.scaleLabelActive]}>
                {w}
              </Text>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  materialName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  rangeBadge: {
    backgroundColor: Colors.accentMuted,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  rangeText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.accent,
  },
  sliderBlock: {
    gap: Spacing.xs,
  },
  sliderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    width: 30,
  },
  sliderValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  weightScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xs,
  },
  scaleLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  scaleLabelActive: {
    color: Colors.accent,
    fontWeight: FontWeight.semibold,
  },
});
