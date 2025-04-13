<script setup lang="ts">
import * as locales from '@nuxt/ui-pro/locale'

const { locale } = useI18n()
</script>

<template>
  <div>
    <UApp :locale="locales[locale]" :toaster="{ expand: false }">
      <NuxtLoadingIndicator />
      <CommonAppShare/>

      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </UApp>
  </div>
</template>
