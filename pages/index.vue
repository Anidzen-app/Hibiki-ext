<script setup lang="ts">
import {fetchShikimoriCalendar} from "~/composables/useShikimoriCalendar";

const { t, locale } = useI18n();

const ongoing = ref<any[]>([]);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const isLoading = ref(true);

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
  const cachedData = localStorage.getItem('ongoing_animes_data');
  const cacheTimestamp = localStorage.getItem('ongoing_animes_timestamp');

  const currentTime = new Date().getTime();

  if (cachedData && cacheTimestamp && currentTime - parseInt(cacheTimestamp) < 60 * 60 * 1000) {

    ongoing.value = JSON.parse(cachedData);
    isLoading.value = false;
  } else {
    try {
      // const data = await $fetch('/api/shikimori/calendar');
      // if (Array.isArray(data)) {
      //   ongoing.value = data;
      //   isLoading.value = false;
      //
      //   localStorage.setItem('ongoing_animes_data', JSON.stringify(data))
      //   localStorage.setItem('ongoing_animes_timestamp', currentTime.toString())
      // } else {
      //   console.error(data);
      // }

      const data = await fetchShikimoriCalendar('https://shikimori.one/api/graphql')
      if (Array.isArray(data)) {
        ongoing.value = data;
        isLoading.value = false;

        localStorage.setItem('ongoing_animes_data', JSON.stringify(data))
        localStorage.setItem('ongoing_animes_timestamp', currentTime.toString())
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
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

// const fetchAnimeDetails = async (id: number) => {
//   try {
//     open.value = true;
//     selectedAnime.value = await $fetch(`/api/shikimori/anime/${id}`);
//   } catch (error) {
//     console.error(error);
//   }
// };

const redirectToOtaKu = async (id: number) => {
  navigateTo(`https://ota-ku.am/OpenAnimeView?animeId=${id}`, {external: true})
};
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mb-5">

    <UCard v-for="(datum, index) in 6" v-if="isLoading" :key="index">
      <template #header>
        <USkeleton class="w-full h-[32px]"/>
      </template>
      <template #default>
        <div>
          <div v-for="(datum, index) in 3" :key="index">
            <div class="flex items-start gap-2 mb-2">
              <USkeleton class="rounded-lg min-w-[100px] max-w-[100px] min-h-[141.3px] max-h-[141.3px] overflow-hidden"/>
              <div class="flex gap-2 flex-col w-full items-start">
                <USkeleton class="w-full max-w-[200px] min-h-[23px]"/>
                <USkeleton class="w-full max-w-[400px] min-h-[23px]"/>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UCard>

    <UCard v-else v-for="([day, animeList]) in sortedDays" class="bg-(--ui-bg-elevated)/25">
      <template #header>
        <h2 class="text-center lg:text-left text-2xl font-bold">
          {{ formatDayName(day) }}
        </h2>
      </template>
      <template #default>
        <div>
          <div v-for="anime in animeList" :key="anime.id" class="cursor-pointer" @click="redirectToOtaKu(anime.id)">
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
      </template>
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
