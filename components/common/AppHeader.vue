<script setup lang="ts">

</script>

<template>
    <UHeader class="py-3 h-auto" :ui="{ container: 'max-w-[var(--container-8xl)]'}">
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <NuxtImg
              src="/logo.webp"
              :width="55"
              :height="55"
          />
          <div class="flex flex-col">
            <h2
                class="text-3xl font-bold"
            >
              <span class="text-(--ui-primary)">Ai</span>ra
            </h2>
            <span class="text-xs">ongoing callendar</span>
          </div>
        </div>
      </template>

      <template #right>
        <UColorModeButton size="xl" variant="soft" color="primary" class="cursor-pointer"/>
      </template>
    </UHeader>
</template>

<style scoped>

</style>