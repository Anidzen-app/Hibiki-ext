<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const STORAGE_KEY = 'user_current_timezone';

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const selectedZone = ref<string>(
    localStorage.getItem(STORAGE_KEY) || defaultTimezone
);

const timezones = ref([
  'Asia/Yerevan',
  'Europe/Moscow',
  'America/New_York',
  'Asia/Tokyo'
]);

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && timezones.value.includes(saved)) {
    selectedZone.value = saved;
  }
});

watch(selectedZone, (newZone) => {
  if (newZone) {
    localStorage.setItem(STORAGE_KEY, newZone);
  }
});
</script>

<template>
  <div class="mb-5">
    <UCard class="bg-[var(--ui-primary)]/90">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p class="text-white text-2xl font-bold mb-1">
            {{ $t('select_timestamp.title') }}: <span class="italic">{{ selectedZone }}</span>
          </p>
          <p class="text-white" v-html="$t('select_timestamp.detected', { zone: selectedZone })" />
        </div>
        <USelect
            v-model="selectedZone"
            :items="timezones"
            :placeholder="$t('timezone.placeholder')"
            class="min-w-[220px]"
        />
      </div>
    </UCard>
  </div>
</template>
