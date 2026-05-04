# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm install --legacy-peer-deps   # Vereist vanwege peer dep conflicten tussen Expo 51 en RN 0.74
npm run start                    # Expo dev server (QR-code voor Expo Go)
npm run web                      # Web versie in browser
npm run typecheck                # TypeScript check (tsc --noEmit)
npx expo export --platform web  # Web build → dist/
vercel --prod                    # Deploy naar Vercel
```

**Geen lint-script geconfigureerd.** TypeScript strict mode is de enige statische check.

---

## Architectuur

### Routering — Expo Router (file-based)

```
app/
  _layout.tsx          # Root: StatusBar + Stack navigator
  (tabs)/
    _layout.tsx        # Tab bar: Home / Oefeningen / Workout / Profiel
    index.tsx          # Home scherm
    exercises.tsx      # Oefeningenbibliotheek
    workout.tsx        # Stopwatch tracker
    profile.tsx        # Gebruikersprofiel + materiaal toggles
  exercise/[id].tsx    # Dynamische oefening-detailpagina
```

De `(tabs)` group gebruikt een bottom tab navigator. Alle schermen binnen de group delen de tab bar. De detail route `exercise/[id]` valt buiten de tabs en heeft geen tab bar.

### Data — statische TypeScript bestanden

```
src/data/
  exercises.ts      # 12 oefeningen met spiergroepen, materiaal, instructies
  muscleGroups.ts   # 29 spiergroepen (hiërarchie: region → parent_group → muscle_group)
  materials.ts      # 10 materialen
```

Alle data is geëxporteerd als arrays + `ById`-lookup-objecten (bijv. `muscleGroupById`, `exerciseById`). Er is geen backend of AsyncStorage — alles is in-memory. De originele JSON-bestanden staan in `../Input_files/` (buiten de app).

### State — Zustand

```
src/store/
  profileStore.ts   # UserProfile: naam, niveau, doelen, beschikbare materialen, weekplan
  workoutStore.ts   # Stopwatch: idle/running/paused, elapsedSeconds, startTime
```

Stores hebben geen persistentie (geen AsyncStorage/MMKV). State reset bij app-herstart. `workoutStore` berekent `elapsedSeconds` via `tickTimer()` die elke 500ms vanuit de `Stopwatch` component wordt aangeroepen via `setInterval`.

### Design systeem

Alle tokens staan in `src/constants/tokens.ts`: `Colors`, `Spacing`, `Radius`, `FontSize`, `FontWeight`, `Shadows`.

Regels:
- Geen inline styling — altijd `StyleSheet.create()`
- Geen hardcoded kleurwaarden in componenten — altijd via `Colors.*`
- Accent kleur: `#FF6B35` (oranje). Donker thema: background `#0A0A0A`.

### Componenten

```
src/components/
  ui/           # Generieke bouwstenen: Card, Badge, Button, SearchBar, SectionHeader
  exercise/     # ExerciseCard, FilterChip
  home/         # StatCard
  workout/      # Stopwatch
```

UI-componenten accepteren geen inline style overrides via props behalve via een expliciete `style?: ViewStyle` prop op wrappers.

### TypeScript paden

`@/*` mapt naar `src/*` (geconfigureerd in `tsconfig.json`). Importeer dus `@/constants/tokens` i.p.v. relatieve paden vanuit diep geneste bestanden.

---

## Deployment

- **Vercel**: `vercel --prod` vanuit `FitnessApp/`. Build command: `npx expo export --platform web`, output: `dist/`. SPA rewrites zorgen dat Expo Router client-side routing werkt.
- **GitHub**: `sjoerdpeters-cpc/fitness-manager`, branch `main`.
- **Mobiel**: Expo Go app + `npm run start`, scan QR-code.

---

## Modellen

```
src/models/
  exercise.ts      # Exercise, WorkoutExercise, DifficultyLevel, MovementPattern
  muscleGroup.ts   # MuscleGroup, BodyRegion, MuscleGroupType
  material.ts      # Material, MaterialCategory
  profile.ts       # UserProfile, FitnessGoal, FitnessLevel
```

Wanneer je oefeningen toevoegt: gebruik bestaande `muscleGroupId`'s uit `muscleGroups.ts` en `materialId`'s uit `materials.ts`. Onbekende ID's worden stil genegeerd door de detail-pagina (gefilterd via `.filter(Boolean)`).

---

## Documentatie bijhouden

Na elke feature: update `docs/current-state.md` met gewijzigde schermen, componenten en stores.
