<script setup lang="ts">
const todayAnime = await useAnimeSchedule()
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const formatToLocal = (isoDate: string | null) => {
  if (!isoDate) return '—'
  const date = new Date(isoDate)
  return date.toLocaleString('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: userTimeZone,
  })
}
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">🎥 Онгоинги на сегодня</h1>
    <ul>
      <li v-for="anime in todayAnime" :key="anime.id">
        <strong>{{ anime.russian }}</strong> — следующая серия:
        {{ formatToLocal(anime.nextEpisodeAt) }}
      </li>
    </ul>
  </div>

</template>
