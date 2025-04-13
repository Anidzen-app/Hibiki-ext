<script setup lang="ts">
const socialLinks = [
  {
    id: 1,
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/Anidzen-app/Aira-ext'
  },
  {
    id: 2,
    name: 'Telegram',
    icon: 'telegram',
    link: 'https://t.me/AnidzenEcosystems'
  }
]
</script>

<template>
  <div>
    <section class="share fixed bottom-0 left-0 sm:top-0 z-50 sm:h-dvh">
      <div class="px-2 py-4 h-full flex gap-4">
        <div class="flex flex-col gap-4 items-center justify-center">
          <UTooltip
              v-for="data in socialLinks"
              :key="data.id"
              :delay-duration="1"
              :text="data.name"
              :content="{
              align: 'center',
              side: 'right',
              sideOffset: 8
          }"
          >
            <UButton
                size="xl"
                :to="data.link"
                target="_blank"
                :icon="'i-simple-icons-' + data.icon"
            />
          </UTooltip>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>