# Current State — Fitness App MVP 1

## Versie
v1.0.0 — 2026-05-03

## Status
MVP 1 gebouwd en gereed voor installatie.

---

## Wat is gebouwd

### Schermen
| Scherm | Route | Beschrijving |
|---|---|---|
| Home | `/(tabs)/index` | Welkomstbanner, stats, quick access, aanbevolen oefeningen |
| Oefeningen | `/(tabs)/exercises` | Zoeken + filteren op niveau/spiergroep, lijst |
| Workout Tracker | `/(tabs)/workout` | Stopwatch met start/pause/stop/reset |
| Profiel | `/(tabs)/profile` | Naam, niveau, doelen, materiaal toggles |
| Oefening detail | `/exercise/[id]` | Volledige info: spieren, materiaal, instructies, tips |

### Componenten (`src/components/`)
| Component | Bestand |
|---|---|
| Card | `ui/Card.tsx` |
| Badge | `ui/Badge.tsx` |
| Button | `ui/Button.tsx` |
| SearchBar | `ui/SearchBar.tsx` |
| SectionHeader | `ui/SectionHeader.tsx` |
| ExerciseCard | `exercise/ExerciseCard.tsx` |
| FilterChip | `exercise/FilterChip.tsx` |
| StatCard | `home/StatCard.tsx` |
| Stopwatch | `workout/Stopwatch.tsx` |

### Data (`src/data/`)
- `muscleGroups.ts` — 29 spiergroepen uit v1.2.0 dataset
- `materials.ts` — 10 materialen (uitgebreid met bodyweight/cable)
- `exercises.ts` — 12 sample oefeningen met volledige metadata

### Stores (`src/store/`)
- `profileStore.ts` — Zustand: naam, niveau, doelen, materiaal, weekplan
- `workoutStore.ts` — Zustand: stopwatch state (idle/running/paused)

### Design tokens (`src/constants/tokens.ts`)
- Colors, Spacing, Radius, FontSize, FontWeight, Shadows

---

## Tech Stack
- Expo ~52 + Expo Router ~4
- React Native 0.76
- TypeScript strict
- Zustand v5
- expo-linear-gradient
- @expo/vector-icons (Ionicons)
- react-native-reanimated (geïnstalleerd, klaar voor animaties)

---

## Volgende stappen (MVP 2)
- Sets/reps loggen per oefening
- Workout logboek met datum
- Profiel bewerken scherm
- Persoonlijke records
- Workout generator op basis van profiel
