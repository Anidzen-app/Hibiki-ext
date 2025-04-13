<script setup lang="ts">

</script>

<template>
  <div>
    <CommonAppHeader/>

    <div class="mt-5">
      <UContainer class="max-w-[var(--container-8xl)]">
        <SelectTimestamp/>

        <slot/>
      </UContainer>
    </div>
  </div>
</template>