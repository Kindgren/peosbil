<template>
  <footer id="kontakt" class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="/peosbil-logo.png" alt="PeosBil Logo" class="footer-logo" />
        <p class="brand-desc">
          Trygga bilaffärer sedan 1996. Vi hjälper dig att hitta rätt bil för dina behov.
        </p>
      </div>

      <div class="footer-contact">
        <h3>Kontakt</h3>
        <ul class="contact-list">
          <li>
            <span class="label">Telefon:</span>
            <a href="tel:0703213388">070 - 321 33 88</a>
          </li>
          <li>
            <span class="label">E-post:</span>
            <a href="mailto:peo.peosbil@outlook.com">peo.peosbil@outlook.com</a>
          </li>
          <li>
            <span class="label">Adress:</span>
            <span>Åtvidaberg (ca 3 mil från Linköping)</span>
          </li>
        </ul>
      </div>

      <div class="footer-hours">
        <h3>Öppettider</h3>
        <p>Vi har inga fasta öppettider. Ring oss för att boka en visning!</p>
        <div class="call-action">
          <a href="tel:0703213388" class="phone-number">070-321 33 88</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container bottom-inner">
        <p>&copy; {{ new Date().getFullYear() }} Peos Bil. Alla rättigheter reserverade.</p>
        <p>Design & Utveckling</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  background-color: var(--color-accent);
  color: var(--color-background-white);
  padding: var(--space-xl) 0 0 0;
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: var(--space-lg);
  padding-bottom: var(--space-xl);
}

.footer-logo {
  height: 40px;
  width: auto;
  margin-bottom: var(--space-md);
  filter: brightness(0) invert(1);
}

.brand-desc {
  opacity: 0.7;
  font-size: 0.95rem;
  max-width: 250px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: var(--space-md);
  color: var(--color-background-white);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-list li {
  margin-bottom: var(--space-sm);
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  opacity: 0.5;
  font-weight: 700;
}

.contact-list a {
  font-size: 1.1rem;
  font-weight: 500;
}

.footer-hours p {
  opacity: 0.7;
  margin-bottom: var(--space-md);
}

.phone-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
}

.footer-bottom {
  background-color: rgba(0,0,0,0.2);
  padding: var(--space-md) 0;
  font-size: 0.85rem;
  opacity: 0.6;
}

.bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl) var(--space-lg);
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-logo {
    margin: 0 auto var(--space-md) auto;
  }
  
  .footer-brand, .brand-desc {
    margin-left: auto;
    margin-right: auto;
  }
  
  .bottom-inner {
    flex-direction: column;
    gap: var(--space-xs);
  }
}
</style>