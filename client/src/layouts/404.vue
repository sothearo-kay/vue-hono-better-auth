<script setup lang="ts">
const router = useRouter();

useHead({
  title: "not-found",
});
</script>

<template>
  <main>
    <RouterView />
    <div>
      <button @click="router.back()">back</button>
    </div>
  </main>
</template>
