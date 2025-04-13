<script setup lang="ts">
import  { en, hy, ja, ru } from '@nuxt/ui/locale'

const localeRoute = useLocaleRoute();

const homePath = computed(() => localeRoute('/')?.fullPath ?? '/');

const { locale } = useI18n()
</script>

<template>
    <UHeader :to="homePath" class="py-3 h-auto" :ui="{ container: 'max-w-[var(--container-8xl)]'}">
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <NuxtImg
              src="/logo.webp"
              :width="50"
              :height="50"
          />
          <div class="flex flex-col">
            <h2
                class="text-3xl font-bold"
            >
              <span class="text-(--ui-primary)">Ai</span>ra
            </h2>
            <span class="text-xs">{{ $t('common_app_header.name_description') }}</span>
          </div>
        </div>
      </template>

      <template #right>
        <ULocaleSelect v-model="locale" :locales="[en, hy, ja, ru]" />
        <UColorModeButton variant="soft" color="primary" class="cursor-pointer"/>
      </template>
    </UHeader>
</template>