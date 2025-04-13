<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

const ongoing = ref<any[]>([]);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatToLocal = (date: string) => {
  const localDate = new Date(date);
  return localDate.toLocaleString('ru-RU', { timeZone: userTimeZone });
};

const groupByDay = (animeList: any[]) => {
  const days: { [key: string]: any[] } = {};

  animeList.forEach((anime) => {
    const episodeDate = new Date(anime.nextEpisodeAt);
    const dayKey = episodeDate.toISOString().split('T')[0];

    if (!days[dayKey]) {
      days[dayKey] = [];
    }

    days[dayKey].push(anime);
  });

  return days;
};

onMounted(async () => {
  try {
    const data = await $fetch('/api/shikimori/calendar');
    console.log(data);

    if (Array.isArray(data)) {
      ongoing.value = data;
    } else {
      console.error('Полученные данные не являются массивом', data);
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
});

// Сгруппированные данные по дням
const groupedAnime = ref<{ [key: string]: any[] }>({});

// Сортировка по дате, начиная с сегодняшнего дня
const sortedDays = computed(() => {
  const daysArray = Object.entries(groupedAnime.value);

  // Сортируем по дате
  return daysArray.sort(([dayA], [dayB]) => {
    return new Date(dayA) > new Date(dayB) ? 1 : -1;
  });
});

watch(ongoing, () => {
  groupedAnime.value = groupByDay(ongoing.value);
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4 mb-5">
    <UCard v-for="([day, animeList], index) in sortedDays" :key="index" class="bg-(--ui-bg-elevated)/25">
      <template #header>
        <h2 class="text-2xl font-bold">
          {{ new Date(day).toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' }) }}
        </h2>
      </template>
      <ul>
        <li v-for="anime in animeList" :key="anime.id">
          <div class="flex items-start gap-2 mb-2">
            <div class="rounded-lg min-w-[100px] max-w-[100px] overflow-hidden">
              <NuxtImg :src="anime.poster.mainUrl"/>
            </div>
            <div>
              <h4 class="font-bold text-[var(--ui-primary)] line-clamp-2">{{ anime.russian }}</h4>
              <span>следующая серия: {{ formatToLocal(anime.nextEpisodeAt) }}</span>
            </div>
          </div>
        </li>
      </ul>
    </UCard>
  </div>
</template>
