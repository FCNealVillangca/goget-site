import * as migration_20260507_165458_remove_hero_field from './20260507_165458_remove_hero_field';

export const migrations = [
  {
    up: migration_20260507_165458_remove_hero_field.up,
    down: migration_20260507_165458_remove_hero_field.down,
    name: '20260507_165458_remove_hero_field'
  },
];
