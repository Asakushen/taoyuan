<template>
  <Transition name="panel-fade">
    <div v-if="open" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3" @click.self="$emit('close')">
      <div class="map-container game-panel w-full max-w-sm max-h-[85vh] overflow-y-auto">
        <p class="text-accent text-sm text-center mb-3 tracking-widest">—— 桃源乡地图 ——</p>

        <!-- 田庄 -->
        <div class="map-area">
          <p class="map-area-title">田庄</p>
          <div class="map-area-grid">
            <button v-for="t in farmGroup" :key="t.key" class="map-loc" :class="{ 'map-loc-active': current === t.key }" @click="go(t.key)">
              <component :is="t.icon" :size="18" />
              <span>{{ t.label }}</span>
            </button>
          </div>
        </div>

        <div class="map-path">···</div>

        <!-- 野外 -->
        <div class="flex gap-2">
          <div class="map-area flex-1">
            <p class="map-area-title">村落</p>
            <div class="map-area-grid">
              <button
                v-for="t in villageGroup"
                :key="t.key"
                class="map-loc"
                :class="{ 'map-loc-active': current === t.key }"
                @click="go(t.key)"
              >
                <component :is="t.icon" :size="18" />
                <span>{{ t.label }}</span>
              </button>
            </div>
          </div>
          <div class="map-area flex-1">
            <p class="map-area-title">野外</p>
            <div class="map-area-grid">
              <button
                v-for="t in wildGroup"
                :key="t.key"
                class="map-loc"
                :class="{ 'map-loc-active': current === t.key }"
                @click="go(t.key)"
              >
                <component :is="t.icon" :size="18" />
                <span>{{ t.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="map-path">···</div>

        <!-- 工坊 -->
        <div class="map-area">
          <p class="map-area-title">工坊</p>
          <div class="map-area-grid">
            <button
              v-for="t in craftGroup"
              :key="t.key"
              class="map-loc"
              :class="{ 'map-loc-active': current === t.key }"
              @click="go(t.key)"
            >
              <component :is="t.icon" :size="18" />
              <span>{{ t.label }}</span>
            </button>
          </div>
        </div>

        <div class="map-path">···</div>

        <!-- 随身 -->
        <div class="map-area">
          <p class="map-area-title">随身</p>
          <div class="map-area-grid">
            <button
              v-for="t in personalGroup"
              :key="t.key"
              class="map-loc"
              :class="{ 'map-loc-active': current === t.key }"
              @click="go(t.key)"
            >
              <component :is="t.icon" :size="18" />
              <span>{{ t.label }}</span>
            </button>
          </div>
        </div>

        <!-- 关闭 -->
        <button class="btn text-xs w-full mt-3" @click="$emit('close')">
          <X :size="14" />
          收起地图
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { X } from 'lucide-vue-next'
  import { TABS, navigateToPanel } from '@/composables/useNavigation'
  import type { PanelKey } from '@/composables/useNavigation'

  defineProps<{ open: boolean; current: string }>()
  const emit = defineEmits<{ close: [] }>()

  const tabMap = computed(() => {
    const m = new Map<string, (typeof TABS)[number]>()
    for (const t of TABS) m.set(t.key, t)
    return m
  })

  const pick = (keys: PanelKey[]) => keys.map(k => tabMap.value.get(k)!).filter(Boolean)

  const farmGroup = computed(() => pick(['farm', 'animal', 'home']))
  const villageGroup = computed(() => pick(['village', 'shop']))
  const wildGroup = computed(() => pick(['forage', 'fishing', 'mining']))
  const craftGroup = computed(() => pick(['cooking', 'workshop', 'upgrade']))
  const personalGroup = computed(() => pick(['inventory', 'skills', 'achievement', 'wallet', 'quest']))

  const go = (key: PanelKey) => {
    navigateToPanel(key)
    emit('close')
  }
</script>
