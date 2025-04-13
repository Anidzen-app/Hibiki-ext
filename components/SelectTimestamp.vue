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
    <UCard class="bg-[var(--ui-primary)]/50">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p class="text-2xl font-bold mb-1">Ваша временная зона: <span class="italic">{{ selectedZone }}</span></p>
          <p class="text-gray-300">
            Мы определили ваш часовой пояс как <strong>{{ selectedZone }}</strong>.
            Вы можете изменить его в любой момент, чтобы время серий отображалось корректно для вас.
          </p>
        </div>
        <USelect
            v-model="selectedZone"
            :items="timezones"
            placeholder="Выберите временную зону"
            class="min-w-[220px]"
        />
      </div>
    </UCard>
  </div>
</template>
