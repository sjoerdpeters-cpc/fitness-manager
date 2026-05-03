import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/tokens';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  accent?: boolean;
}

export function StatCard({ label, value, icon, accent = false }: StatCardProps) {
  return (
    <Card style={styles.card} elevated>
      <View style={[styles.iconBox, accent && styles.iconBoxAccent]}>
        <Ionicons name={icon as any} size={20} color={accent ? Colors.accent : Colors.textSecondary} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: Spacing.base,
    gap: Spacing.sm,
    minWidth: 100,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxAccent: {
    backgroundColor: Colors.accentMuted,
  },
  value: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.black,
    color: Colors.text,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
