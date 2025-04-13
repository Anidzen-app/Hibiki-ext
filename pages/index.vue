<script setup lang="ts">
const ongoing = await useAnimeSchedule()
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
</script>

<template>
  <div>
    <ul>
      <li v-for="anime in ongoing" :key="anime.id">
        <strong>{{ anime.russian }}</strong> — следующая серия:
        {{ formatToLocal(anime.nextEpisodeAt) }}
      </li>
    </ul>
  </div>
</template>
