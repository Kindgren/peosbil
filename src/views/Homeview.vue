<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../components/atoms/BaseButton.vue'
import CarCard from '../components/organisms/CarCard.vue'
import carsData from '../data/cars.json'
import type { Car } from '@/interface/Car.ts'

// Typa om den tomma JSON-datan till den uppdaterade Car-arrayen innan vi kör slice
const latestCars = ref<Car[]>((carsData as unknown as Car[]).slice(0, 3))
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">Personliga bilar <br />sedan 1996</h1>
        <p class="hero-subtitle">
          Vi säljer, byter och köper begagnade bilar av hög kvalitet. <br />
          Välkommen till en trygg bilaffär i Åtvidaberg.
        </p>
        <div class="hero-actions">
          <BaseButton variant="primary" size="large" to="/bilar">Se alla bilar i lager</BaseButton>
          <BaseButton variant="outline" size="large" href="#om-oss">Läs mer om oss</BaseButton>
        </div>
      </div>
    </section>

    <section v-if="latestCars.length > 0" class="latest-cars">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Senast inkommet</h2>
            <p class="section-subtitle">Här är våra senaste tillskott i bilhallen.</p>
          </div>
          <BaseButton variant="outline" to="/bilar">Visa alla bilar</BaseButton>
        </div>
        
        <div class="car-grid">
          <CarCard 
            v-for="car in latestCars" 
            :key="car.id" 
            :car="car" 
          />
        </div>
      </div>
    </section>

    <section id="om-oss" class="about-section">
      <div class="container about-grid">
        <div class="about-image">
          <div class="image-wrapper">
             <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000" alt="Peos Bil" class="actual-image" />
             <div class="image-experience-badge">
               <span class="years">25+</span>
               <span class="label">Års erfarenhet</span>
             </div>
          </div>
        </div>
        <div class="about-content">
          <span class="badge">Vår historia</span>
          <h2 class="section-title">Om Peos Bil</h2>
          
          <div class="about-text">
            <p>Företaget startade 1996 av Peo Kindgren. Till en början hyrde vi några parkeringsplatser på dåvarande Q8 macken, samt en mindre kontorslokal. Verkstad hade vi i hemmet som då ligger några hundra meter bort.</p>
            
            <p>År 2000 revs macken när RV 35 skulle byggas om. Vi köpte då een lokal på Prästängsvägen som vi byggde om till bilhall och bilverkstad med tvätthall och kontor.</p>
            
            <p>År 2010 tog vi nästa steg och köpte en ny bilhall på Industrigatan. Vi fick då möjligheten att sälja nya Saab, Opel och senare även Nissan genom samarbete med BIVA.</p>
            
            <div class="update-box">
              <h3>Flytt & Ny verksamhet (Jan 2022)</h3>
              <p>Vi har nu flyttat hem vår verksamhet några kilometer utanför Åtvidaberg. Vi har inga fasta öppettider utan vill att du ringer om du vill titta på någon bil, så kommer vi överens om en tid som passar dig.</p>
            </div>
          </div>
          
          <div class="contact-cta">
            <p>Varmt Välkommen!</p>
            <BaseButton variant="primary" href="tel:0703213388">Ring Peo: 070 - 321 33 88</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container feature-grid">
        <div class="feature-card">
          <div class="feature-icon">✓</div>
          <h3>Trygg Affär</h3>
          <p>Lång erfarenhet och personlig service garanterar att du blir nöjd.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✓</div>
          <h3>Noga Utvalda Bilar</h3>
          <p>Vi väljer ut våra bilar med omsorg för att hålla en hög kvalitet.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✓</div>
          <h3>Vi Köper Din Bil</h3>
          <p>Vill du sälja din nuvarande bil? Vi ger dig ett ärligt prisförslag.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  background-color: var(--color-accent);
  background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920');
  background-size: cover;
  background-position: center;
  color: var(--color-background-white);
  padding: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: var(--space-md);
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.35rem;
  margin-bottom: var(--space-lg);
  opacity: 0.9;
  max-width: 650px;
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
}

/* Latest Cars Section */
.latest-cars {
  background-color: var(--color-background-light);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-lg);
}

.section-title {
  font-size: 2.25rem;
  margin-bottom: var(--space-xs);
}

.section-subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

/* About Section */
.about-section {
  background-color: var(--color-background-white);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: flex-start;
}

.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.actual-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-experience-badge {
  position: absolute;
  bottom: 2rem;
  right: -1rem;
  background-color: var(--color-primary);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-md);
  transform: rotate(3deg);
}

.image-experience-badge .years {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.image-experience-badge .label {
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
}

.badge {
  display: inline-block;
  background-color: rgba(227, 30, 36, 0.1);
  color: var(--color-primary);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-sm);
}

.about-text p {
  margin-bottom: var(--space-md);
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

.update-box {
  background-color: var(--color-background-light);
  padding: var(--space-md);
  border-radius: 8px;
  margin: var(--space-lg) 0;
}

.update-box h3 {
  font-size: 1.2rem;
  margin-bottom: var(--space-xs);
  color: var(--color-primary);
}

.update-box p {
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-main);
}

.contact-cta {
  margin-top: var(--space-lg);
}

.contact-cta p {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: var(--space-sm);
}

/* Features Section */
.features {
  background-color: var(--color-accent);
  color: var(--color-background-white);
  padding: var(--space-xl) 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.feature-card {
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.feature-card h3 {
  margin-bottom: var(--space-xs);
  font-size: 1.4rem;
}

.feature-card p {
  opacity: 0.8;
  font-size: 1.05rem;
}

/* Mobile Responsiveness */
@media (max-width: 992px) {
  .hero-title { font-size: 3.5rem; }
  .car-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid { grid-template-columns: 1fr; gap: var(--space-lg); }
  .feature-grid { grid-template-columns: 1fr; }
  .image-experience-badge { right: 2rem; }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.8rem; }
  .hero-actions { flex-direction: column; }
  .car-grid { grid-template-columns: 1fr; }
  .section-header { flex-direction: column; align-items: flex-start; gap: var(--space-md); }
}
</style>