<script setup lang="ts">
</script>

<template>
  <div>
    <UApp :toaster="{ expand: false }">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </UApp>
  </div>
</template>
