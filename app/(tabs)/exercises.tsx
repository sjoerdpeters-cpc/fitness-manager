import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { FilterChip } from '../../src/components/exercise/FilterChip';
import { ExerciseCard } from '../../src/components/exercise/ExerciseCard';
import { exercises } from '../../src/data/exercises';
import { regionGroups } from '../../src/data/muscleGroups';
import { Colors, Spacing, FontSize, FontWeight } from '../../src/constants/tokens';
import type { Exercise } from '../../src/models/exercise';

const ALL_FILTER = 'all';

const difficultyFilters = [
  { id: ALL_FILTER, label: 'Alle' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Gevorderd' },
  { id: 'advanced', label: 'Expert' },
];

export default function ExercisesScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(ALL_FILTER);
  const [selectedRegion, setSelectedRegion] = useState(ALL_FILTER);

  const regionFilters = useMemo(() => [
    { id: ALL_FILTER, label: 'Alle' },
    ...regionGroups.map((r) => ({ id: r.id, label: r.name })),
  ], []);

  const filtered = useMemo<Exercise[]>(() => {
    return exercises.filter((ex) => {
      const matchesQuery =
        query.length === 0 ||
        ex.name.toLowerCase().includes(query.toLowerCase()) ||
        ex.description.toLowerCase().includes(query.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === ALL_FILTER || ex.difficulty === selectedDifficulty;

      const matchesRegion =
        selectedRegion === ALL_FILTER ||
        ex.primaryMuscleGroupIds.some((mgId) => {
          return mgId.startsWith(selectedRegion) || selectedRegion === mgId;
        }) ||
        selectedRegion === 'full_body';

      return matchesQuery && matchesDifficulty && matchesRegion;
    });
  }, [query, selectedDifficulty, selectedRegion]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Oefeningen</Text>
        <Text style={styles.subtitle}>{filtered.length} oefeningen</Text>
      </View>

      <View style={styles.searchWrapper}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Zoek oefening..." />
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Niveau</Text>
        <FlatList
          horizontal
          data={difficultyFilters}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <FilterChip
              label={item.label}
              selected={selectedDifficulty === item.id}
              onPress={() => setSelectedDifficulty(item.id)}
            />
          )}
        />
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Spiergroep</Text>
        <FlatList
          horizontal
          data={regionFilters}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <FilterChip
              label={item.label}
              selected={selectedRegion === item.id}
              onPress={() => setSelectedRegion(item.id)}
            />
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            onPress={() => router.push(`/exercise/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Geen oefeningen gevonden</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
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
    marginTop: Spacing.xs,
  },
  searchWrapper: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  filterSection: {
    marginBottom: Spacing.sm,
  },
  filterLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  filterList: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  list: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  empty: {
    alignItems: 'center',
    paddingTop: Spacing['3xl'],
  },
  emptyText: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
});
