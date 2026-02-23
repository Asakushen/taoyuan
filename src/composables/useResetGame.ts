import {
  useGameStore,
  usePlayerStore,
  useInventoryStore,
  useFarmStore,
  useSkillStore,
  useNpcStore,
  useMiningStore,
  useCookingStore,
  useProcessingStore,
  useAchievementStore,
  useAnimalStore,
  useHomeStore,
  useFishingStore,
  useWalletStore,
  useQuestStore,
  useShopStore,
  useWarehouseStore,
  useBreedingStore,
  useMuseumStore,
  useGuildStore,
  useSecretNoteStore,
  useHanhaiStore,
  useFishPondStore,
  useTutorialStore
} from '@/stores'

/**
 * 重置所有游戏相关 store 到初始状态（开新游戏时调用）。
 * 不重置: useSettingsStore（跨存档设置）、useSaveStore（存档管理）。
 */
export const resetAllStoresForNewGame = () => {
  useGameStore().$reset()
  usePlayerStore().$reset()
  useInventoryStore().$reset()
  useFarmStore().$reset()
  useSkillStore().$reset()
  useNpcStore().$reset()
  useMiningStore().$reset()
  useCookingStore().$reset()
  useProcessingStore().$reset()
  useAchievementStore().$reset()
  useAnimalStore().$reset()
  useHomeStore().$reset()
  useFishingStore().$reset()
  useWalletStore().$reset()
  useQuestStore().$reset()
  useShopStore().$reset()
  useWarehouseStore().$reset()
  useBreedingStore().$reset()
  useMuseumStore().$reset()
  useGuildStore().$reset()
  useSecretNoteStore().$reset()
  useHanhaiStore().$reset()
  useFishPondStore().$reset()
  useTutorialStore().$reset()
}
