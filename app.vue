<script setup lang="ts">
</script>

<template>
  <div>
    <UApp :toaster="{ expand: false }">
      <NuxtLoadingIndicator />
      <CommonAppShare/>

      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </UApp>
  </div>
</template>
