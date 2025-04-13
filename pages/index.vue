<script setup lang="ts">
const { t, locale } = useI18n();

const ongoing = ref<any[]>([]);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatToLocal = (date: string) => {
  const localDate = new Date(date);
  return localDate.toLocaleString(locale.value, { timeZone: userTimeZone });
};

const formatDayName = (day: string) => {
  const date = new Date(day);
  const isToday = date.toDateString() === new Date().toDateString();

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const dayNumber = date.toLocaleDateString(locale.value, { day: 'numeric', month: 'long' });

  if (isToday) {
    return `${t(`calendar.weekday.${weekday}`)}, ${dayNumber}` + ' ' + `(${t('calendar.today')})`;
  }

  return `${t(`calendar.weekday.${weekday}`)}, ${dayNumber}`;
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
    if (Array.isArray(data)) {
      ongoing.value = data;
    } else {
      console.error(data);
    }
  } catch (error) {
    console.error(error);
  }
});

const groupedAnime = ref<{ [key: string]: any[] }>({});

const sortedDays = computed(() => {
  const daysArray = Object.entries(groupedAnime.value);
  return daysArray.sort(([dayA], [dayB]) => new Date(dayA) > new Date(dayB) ? 1 : -1);
});

watch(ongoing, () => {
  groupedAnime.value = groupByDay(ongoing.value);
});

const open = ref(false)
const selectedAnime = ref<any>(null);

const fetchAnimeDetails = async (id: number) => {
  try {
    open.value = true;
    selectedAnime.value = await $fetch(`/api/shikimori/anime/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const redirectToOtaKu = async (id: number) => {
  navigateTo(`https://ota-ku.am/openAnimeView?animeId=${id}`)
};
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mb-5">
    <UCard v-for="([day, animeList], index) in sortedDays" :key="index" class="bg-(--ui-bg-elevated)/25">
      <template #header>
        <h2 class="text-center lg:text-left text-2xl font-bold">
          {{ formatDayName(day) }}
        </h2>
      </template>
      <div>
        <div v-for="anime in animeList" :key="anime.id" @click="redirectToOtaKu(anime.id)">
          <div class="flex items-start gap-2 mb-2">
            <div class="rounded-lg min-w-[100px] max-w-[100px] overflow-hidden">
              <NuxtImg :src="anime.poster.mainUrl"/>
            </div>
            <div>
              <h4 class="font-bold text-[var(--ui-primary)] line-clamp-2">{{ anime.russian }}</h4>
              <span>следующая серия: {{ formatToLocal(anime.nextEpisodeAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>

  <div>
    <UModal v-model:open="open" :ui="{ footer: 'justify-end' }">

      <template #body>
        <div v-if="selectedAnime">
          <h3>{{ selectedAnime.russian }}</h3>
        </div>
        <div v-else>Loading...</div>
      </template>
    </UModal>
  </div>
</template>
