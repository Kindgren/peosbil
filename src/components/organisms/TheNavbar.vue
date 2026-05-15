<template>
  <header class="site-header">
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="contact-info">
          <a href="tel:0703213388" class="contact-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>070 - 321 33 88</span>
          </a>
          <a href="mailto:peo.peosbil@outlook.com" class="contact-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>peo.peosbil@outlook.com</span>
          </a>
        </div>
        <div class="top-bar-right">
          <span class="location-tag">Åtvidaberg</span>
        </div>
      </div>
    </div>

    <nav class="main-nav" :class="{ 'is-sticky': isSticky }">
      <div class="container nav-inner">
        <div class="logo">
          <RouterLink to="/" @click="scrollToTop">
            <img src="/peosbil-logo.png" alt="PeosBil Logo" class="logo-img" />
          </RouterLink>
        </div>
        
        <div class="nav-links">
          <RouterLink to="/" class="nav-item" @click="scrollToTop">Hem</RouterLink>
          <RouterLink to="/bilar" class="nav-item" @click="scrollToTop">Våra Bilar</RouterLink>
          <a href="#om-oss" class="nav-item" @click="handleNavClick">Om oss</a>
          <a href="#kontakt" class="nav-item" @click="scrollToBottom">Kontakt</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

const isSticky = ref(false)
const router = useRouter()
const route = useRoute()

const handleScroll = () => {
  isSticky.value = window.scrollY > 40
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToBottom = (e) => {
  e.preventDefault()
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
}

const handleNavClick = async (e) => {
  const href = e.currentTarget.getAttribute('href')
  if (href.startsWith('#')) {
    e.preventDefault()
    
    if (route.path !== '/') {
      // If not on home page, navigate home first
      await router.push('/')
      // Small delay to ensure the component is mounted
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Already on home page, just scroll
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.site-header {
  width: 100%;
  position: relative;
  z-index: 1000;
}

/* Top Bar Styles */
.top-bar {
  background-color: var(--color-background-light);
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.top-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-info {
  display: flex;
  gap: 1.5rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.contact-link:hover {
  color: var(--color-primary);
}

.location-tag {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.icon {
  width: 14px;
  height: 14px;
}

/* Main Navigation Styles */
.main-nav {
  background-color: var(--color-background-white);
  padding: 1rem 0;
  transition: all var(--transition-fast);
  border-bottom: 1px solid transparent;
}

.main-nav.is-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.6rem 0;
  box-shadow: var(--shadow-md);
  border-bottom: 1px solid var(--color-border);
}

.nav-inner {
  display: flex;
  justify-content: center; /* Center links since button is gone */
  align-items: center;
  position: relative;
}

.logo {
  position: absolute;
  left: 0;
}

.logo-img {
  height: 40px;
  width: auto;
  transition: height var(--transition-fast);
}

.is-sticky .logo-img {
  height: 32px;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-item {
  color: var(--color-text-main);
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 4px;
  transition: all var(--transition-fast);
}

.nav-item:hover {
  color: var(--color-primary);
  background-color: var(--color-background-light);
}

.nav-item.router-link-active {
  color: var(--color-primary);
}

/* Mobile responsiveness */
@media (max-width: 992px) {
  .nav-inner {
    justify-content: flex-end;
  }
  .logo {
    position: static;
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .top-bar-right {
    display: none;
  }
}

@media (max-width: 576px) {
  .contact-info {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>