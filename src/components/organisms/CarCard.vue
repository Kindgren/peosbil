<script setup lang="ts">
import BaseButton from '../atoms/BaseButton.vue'
import BaseBadge from '../atoms/BaseBadge.vue'

// Define the expected structure of the car prop
defineProps<{
  car: {
    id: string
    make: string
    model: string
    price: number
    year: number
    mileage: number
    transmission: string
    fuel: string
    images: string[]
  }
}>()

// Helper to format currency (e.g., 69500 -> 69 500 kr)
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(price)
}
</script>

<template>
  <article class="car-card">
    <div class="image-container">
      <img :src="car.images[0] || '/image.png'" :alt="`${car.make} ${car.model}`" class="car-image" />
      <div class="card-badges">
        <BaseBadge variant="dark">{{ car.fuel }}</BaseBadge>
      </div>
    </div>
    
    <div class="card-content">
      <div class="title-row">
        <h3 class="car-title">{{ car.make }} {{ car.model }}</h3>
        <span class="car-year">{{ car.year }}</span>
      </div>
      
      <p class="car-price">{{ formatPrice(car.price) }}</p>
      
      <div class="specs-grid">
        <div class="spec-item">
          <span class="spec-label">Mätarställning</span>
          <span class="spec-value">{{ car.mileage }} mil</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Växellåda</span>
          <span class="spec-value">{{ car.transmission }}</span>
        </div>
      </div>
      
      <div class="card-actions">
        <BaseButton variant="primary" :to="`/bilar/${car.id}`" class="full-width">
          Visa detaljer
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.car-card {
  background: var(--color-background-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.car-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

.image-container {
  position: relative;
  aspect-ratio: 16 / 10;
  background-color: var(--color-background-light);
  overflow: hidden;
}

.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.car-card:hover .car-image {
  transform: scale(1.05);
}

.card-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.car-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-main);
  line-height: 1.2;
}

.car-year {
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: 1rem;
}

.car-price {
  margin: 0 0 1.25rem 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.spec-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-main);
}

.card-actions {
  margin-top: auto;
}

.full-width {
  width: 100%;
}
</style>