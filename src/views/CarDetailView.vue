<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import carsData from '../data/cars.json'
import BaseButton from '../components/atoms/BaseButton.vue'
import BaseBadge from '../components/atoms/BaseBadge.vue'

const route = useRoute()
const carId = route.params.id as string

const car = computed(() => {
  return carsData.find(c => c.id === carId)
})

const activeImage = ref(0)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(price)
}

const technicalData = computed(() => {
  if (!car.value) return []
  return [
    { label: 'Modellår', value: car.value.year },
    { label: 'Mätarställning', value: `${car.value.mileage} mil` },
    { label: 'Växellåda', value: car.value.transmission },
    { label: 'Drivmedel', value: car.value.fuel },
    { label: 'Hästkrafter', value: car.value.enginePower || 'N/A' },
    { label: 'Färg', value: car.value.color || 'N/A' },
    { label: 'Kaross', value: car.value.bodyType || 'N/A' },
    { label: 'Drivning', value: car.value.driveType || 'N/A' },
    { label: 'Plats', value: car.value.location }
  ]
})
</script>

<template>
  <div v-if="car" class="car-detail-view">
    <div class="container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumb">
        <RouterLink to="/bilar">Tillbaka till alla bilar</RouterLink>
        <span class="separator">/</span>
        <span class="current">{{ car.make }} {{ car.model }}</span>
      </nav>

      <div class="detail-grid">
        <!-- Gallery Section -->
        <div class="gallery-column">
          <div class="main-image">
            <img :src="car.images[activeImage]" :alt="car.model" />
          </div>
          <div v-if="car.images.length > 1" class="thumbnail-grid">
            <button 
              v-for="(img, index) in car.images" 
              :key="index"
              class="thumbnail"
              :class="{ active: activeImage === index }"
              @click="activeImage = index"
            >
              <img :src="img" :alt="`${car.model} view ${index + 1}`" />
            </button>
          </div>
        </div>

        <!-- Info Column -->
        <div class="info-column">
          <header class="car-header">
            <h1 class="car-title">{{ car.make }} <br /><span>{{ car.model }}</span></h1>
            <p class="car-price">{{ formatPrice(car.price) }}</p>
          </header>

          <div class="quick-specs">
            <div class="q-spec">
              <span class="q-label">År</span>
              <span class="q-value">{{ car.year }}</span>
            </div>
            <div class="q-spec">
              <span class="q-label">Mil</span>
              <span class="q-value">{{ car.mileage }}</span>
            </div>
            <div class="q-spec">
              <span class="q-label">Växel</span>
              <span class="q-value">{{ car.transmission }}</span>
            </div>
          </div>

          <div class="action-card">
            <h3>Intresserad av denna bil?</h3>
            <p>Kontakta Peo direkt för visning eller provkörning.</p>
            <div class="cta-buttons">
              <BaseButton variant="primary" size="large" href="tel:0703213388" class="full-width">
                Ring 070-321 33 88
              </BaseButton>
              <BaseButton variant="outline" size="large" href="mailto:peo.peosbil@outlook.com" class="full-width">
                Skicka e-post
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Tabs/Sections -->
      <div class="more-info">
        <div class="info-section">
          <h2>Teknisk data</h2>
          <div class="tech-grid">
            <div v-for="item in technicalData" :key="item.label" class="tech-item">
              <span class="tech-label">{{ item.label }}</span>
              <span class="tech-value">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2>Utrustning</h2>
          <div class="equipment-list">
            <div v-for="item in car.equipment" :key="item" class="eq-item">
              <span class="check">✓</span> {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container not-found">
    <h1>Bilen hittades inte</h1>
    <p>Det verkar som att denna bil inte längre finns i vårt lager.</p>
    <BaseButton to="/bilar" variant="primary">Se alla bilar</BaseButton>
  </div>
</template>

<style scoped>
.car-detail-view {
  padding: var(--space-lg) 0 var(--space-xl) 0;
  background-color: var(--color-background-white);
}

.breadcrumb {
  margin-bottom: var(--space-md);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.separator {
  margin: 0 0.5rem;
}

.current {
  font-weight: 600;
  color: var(--color-text-main);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

/* Gallery */
.main-image {
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--color-background-light);
  margin-bottom: var(--space-sm);
  box-shadow: var(--shadow-md);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-sm);
}

.thumbnail {
  aspect-ratio: 16 / 10;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all var(--transition-fast);
  padding: 0;
}

.thumbnail.active {
  border-color: var(--color-primary);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info Column */
.car-title {
  font-size: 3rem;
  line-height: 1;
  margin-bottom: var(--space-sm);
}

.car-title span {
  font-weight: 400;
  color: var(--color-text-muted);
}

.car-price {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
}

.quick-specs {
  display: flex;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
  padding: var(--space-md) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.q-spec {
  display: flex;
  flex-direction: column;
}

.q-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-weight: 700;
}

.q-value {
  font-size: 1.25rem;
  font-weight: 700;
}

.action-card {
  background-color: var(--color-background-light);
  padding: var(--space-lg);
  border-radius: 12px;
}

.action-card h3 {
  margin-bottom: var(--space-xs);
}

.action-card p {
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.full-width {
  width: 100%;
}

/* Sections */
.more-info {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--space-xl);
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-xl);
}

.info-section h2 {
  margin-bottom: var(--space-lg);
  font-size: 1.75rem;
}

.tech-grid {
  display: flex;
  flex-direction: column;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
}

.tech-label {
  color: var(--color-text-muted);
  font-weight: 500;
}

.tech-value {
  font-weight: 700;
}

.equipment-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 2rem;
}

.eq-item {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.check {
  color: var(--color-primary);
  font-weight: 800;
  margin-right: 0.5rem;
}

/* Not Found */
.not-found {
  text-align: center;
  padding: var(--space-xl) 0;
}

@media (max-width: 992px) {
  .detail-grid { grid-template-columns: 1fr; }
  .more-info { grid-template-columns: 1fr; }
}

@media (max-width: 576px) {
  .car-title { font-size: 2.25rem; }
  .car-price { font-size: 2rem; }
  .equipment-list { grid-template-columns: 1fr; }
}
</style>