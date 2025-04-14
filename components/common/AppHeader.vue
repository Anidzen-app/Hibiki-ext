<script setup lang="ts">
import  { en, hy, ja, ru } from '@nuxt/ui/locale'

const localeRoute = useLocaleRoute();

const homePath = computed(() => localeRoute('/')?.fullPath ?? '/');

const { locale } = useI18n()
</script>

<template>
    <UHeader :toggle="false" :to="homePath" class="py-3 h-auto" :ui="{ container: 'max-w-[var(--container-8xl)]'}">
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <NuxtImg
              src="/logo.png"
              :width="50"
              :height="50"
              class="pointer-events-none select-none"
          />
          <div class="flex flex-col">
            <h2
                class="text-3xl font-bold"
            >
              <span class="text-(--ui-primary)">Ai</span>ra
            </h2>
            <span class="hidden md:block text-xs text-gray-300">{{ $t('common_app_header.name_description') }}</span>
          </div>
        </div>
      </template>

      <template #right>
        <ULocaleSelect v-model="locale" :locales="[en, hy, ja, ru]" />
        <UiColorModeButton/>
      </template>
    </UHeader>
</template>