<script setup lang="ts">
import { ref, computed } from 'vue'
import carsData from '../data/cars.json'
import CarCard from '../components/organisms/CarCard.vue'

// Load our static database into a reactive variable
const cars = ref(carsData)

// Simple search/filter state
const searchQuery = ref('')
const selectedMake = ref('')

const uniqueMakes = computed(() => {
  const makes = cars.value.map(car => car.make)
  return [...new Set(makes)].sort()
})

const filteredCars = computed(() => {
  return cars.value.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesMake = selectedMake.value === '' || car.make === selectedMake.value
    return matchesSearch && matchesMake
  })
})
</script>

<template>
  <div class="inventory-page">
    <div class="page-header-bg">
      <div class="container">
        <header class="page-header">
          <h1 class="title">Bilar i lager</h1>
          <p class="subtitle">Upptäck våra bilar redo för leverans.</p>
        </header>
      </div>
    </div>

    <div class="container">
      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-group">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Sök märke eller modell..." 
            class="filter-input search-input"
          />
        </div>
        <div class="filter-group">
          <select v-model="selectedMake" class="filter-input select-input">
            <option value="">Alla märken</option>
            <option v-for="make in uniqueMakes" :key="make" :value="make">
              {{ make }}
            </option>
          </select>
        </div>
        <div class="results-count">
          Hittade {{ filteredCars.length }} bilar
        </div>
      </div>

      <div v-if="filteredCars.length > 0" class="car-grid">
        <CarCard 
          v-for="car in filteredCars" 
          :key="car.id" 
          :car="car" 
        />
      </div>
      
      <div v-else class="no-results">
        <h3>Inga bilar matchar din sökning</h3>
        <p>Prova att ändra dina filter eller sökord.</p>
        <BaseButton variant="outline" @click="searchQuery = ''; selectedMake = ''">Rensa filter</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-page {
  padding-bottom: var(--space-xl);
  background-color: var(--color-background-white);
}

.page-header-bg {
  background-color: var(--color-accent);
  color: var(--color-background-white);
  padding: var(--space-lg) 0;
  margin-bottom: var(--space-lg);
}

.page-header {
  text-align: left;
}

.title {
  font-size: 3rem;
  margin-bottom: var(--space-xs);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  align-items: center;
  flex-wrap: wrap;
  padding: var(--space-md);
  background-color: var(--color-background-light);
  border-radius: 12px;
}

.filter-input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: var(--color-background-white);
  transition: border-color var(--transition-fast);
}

.filter-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.search-input {
  min-width: 300px;
}

.results-count {
  margin-left: auto;
  font-weight: 600;
  color: var(--color-text-muted);
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-md);
}

.no-results {
  text-align: center;
  padding: var(--space-xl) 0;
}

.no-results h3 {
  margin-bottom: var(--space-sm);
}

.no-results p {
  margin-bottom: var(--space-md);
  color: var(--color-text-muted);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .title { font-size: 2.5rem; }
  .search-input { min-width: 100%; width: 100%; }
  .filter-group { width: 100%; }
  .select-input { width: 100%; }
  .results-count { margin-left: 0; width: 100%; }
  .car-grid { grid-template-columns: 1fr; }
}
</style>