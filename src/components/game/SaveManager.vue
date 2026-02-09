<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="game-panel w-full max-w-md text-center relative max-h-[80vh] flex flex-col">
      <button class="absolute top-2 right-2 text-muted hover:text-text" @click="$emit('close')">
        <X :size="14" />
      </button>
      <p class="text-accent text-sm mb-4">—— 存档管理 ——</p>

      <div class="flex-1 flex flex-col gap-2 mb-3" @click="menuOpen = null">
        <div v-for="info in slots" :key="info.slot">
          <div v-if="info.exists" class="flex gap-1 w-full">
            <button v-if="allowLoad" class="btn flex-1 !justify-between text-xs" @click="$emit('load', info.slot)">
              <span class="inline-flex items-center gap-1">
                <FolderOpen :size="12" />
                存档 {{ info.slot + 1 }}
              </span>
              <span class="text-muted text-xs">
                {{ info.playerName ?? '未命名' }} · 第{{ info.year }}年 {{ SEASON_NAMES[info.season as keyof typeof SEASON_NAMES] }} 第{{
                  info.day
                }}天
              </span>
            </button>
            <div v-else class="btn flex-1 !justify-between text-xs cursor-default">
              <span class="inline-flex items-center gap-1">
                <FolderOpen :size="12" />
                存档 {{ info.slot + 1 }}
              </span>
              <span class="text-muted text-xs">
                {{ info.playerName ?? '未命名' }} · 第{{ info.year }}年 {{ SEASON_NAMES[info.season as keyof typeof SEASON_NAMES] }} 第{{
                  info.day
                }}天
              </span>
            </div>
            <div class="relative">
              <button class="btn px-2 text-xs h-full" @click.stop="menuOpen = menuOpen === info.slot ? null : info.slot">
                <Settings :size="12" />
              </button>
              <div
                v-if="menuOpen === info.slot"
                class="absolute right-0 top-full mt-1 z-10 flex flex-col border border-accent/30 rounded-[2px] overflow-hidden w-30"
              >
                <button
                  v-if="!isAndroidWebView"
                  class="btn text-center !rounded-none justify-center text-sm"
                  @click="handleExport(info.slot)"
                >
                  <Download :size="12" />
                  导出
                </button>
                <button class="btn btn-danger !rounded-none text-center justify-center text-sm" @click="handleDelete(info.slot)">
                  <Trash2 :size="12" />
                  删除
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-xs text-muted border border-accent/10 rounded-[2px] px-3 py-2">存档 {{ info.slot + 1 }} — 空</div>
        </div>
      </div>

      <!-- 导入存档 -->
      <template v-if="!isAndroidWebView">
        <button class="btn text-center justify-center text-sm w-full" @click="triggerImport">
          <Upload :size="14" />
          导入存档
        </button>
        <input ref="fileInputRef" type="file" accept=".tyx" class="hidden" @change="handleImportFile" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { X, FolderOpen, Settings, Download, Trash2, Upload } from 'lucide-vue-next'
  import { useSaveStore, SEASON_NAMES } from '@/stores'

  const props = defineProps<{ allowLoad?: boolean }>()
  const emit = defineEmits<{ close: []; load: [slot: number]; change: [] }>()

  const saveStore = useSaveStore()

  const ua = navigator.userAgent || ''
  const isAndroidWebView = /Android/.test(ua) && /wv/.test(ua)

  const slots = ref(saveStore.getSlots())
  const menuOpen = ref<number | null>(null)

  const refreshSlots = () => {
    slots.value = saveStore.getSlots()
  }

  const handleExport = (slot: number) => {
    if (!saveStore.exportSave(slot)) {
      alert('导出失败。')
    }
  }

  const handleDelete = (slot: number) => {
    if (confirm(`确定删除存档 ${slot + 1}？此操作不可恢复。`)) {
      saveStore.deleteSlot(slot)
      refreshSlots()
      emit('change')
    }
  }

  const fileInputRef = ref<HTMLInputElement | null>(null)

  const triggerImport = () => {
    fileInputRef.value?.click()
  }

  const handleImportFile = (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result as string
      const emptySlot = slots.value.find(s => !s.exists)
      if (!emptySlot) {
        alert('存档槽位已满，请先删除一个旧存档。')
      } else if (saveStore.importSave(emptySlot.slot, content)) {
        refreshSlots()
        emit('change')
        alert(`已导入到存档 ${emptySlot.slot + 1}。`)
      } else {
        alert('存档文件无效或已损坏。')
      }
      input.value = ''
    }
    reader.readAsText(file)
  }
</script>
