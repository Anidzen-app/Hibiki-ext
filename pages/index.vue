<script setup lang="ts">
const todayAnime = await useAnimeSchedule()
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">🎥 Онгоинги на сегодня</h1>
    <ul>
      <li v-for="anime in todayAnime" :key="anime.anime.id">
        {{ anime }} — серия {{ anime.next_episode }}
      </li>
    </ul>
  </div>
</template>
