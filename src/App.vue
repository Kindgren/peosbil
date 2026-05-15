<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/organisms/TheNavbar.vue'
import TheFooter from './components/organisms/TheFooter.vue'
</script>

<template>
  <div class="app-wrapper">
    <TheNavbar />
    
    <main class="page-content">
      <RouterView />
    </main>

    <TheFooter />
  </div>
</template>

<style>
/* Global App Styles */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex-grow: 1;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>