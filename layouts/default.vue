<script setup lang="ts">

</script>

<template>
  <div>
    <CommonAppHeader/>

    <UMain class="mt-5">

      <UContainer class="max-w-[var(--container-8xl)]">

        <SelectTimestamp/>
        <slot/>
      </UContainer>
    </UMain>
  </div>
</template>

<style scoped>

</style>