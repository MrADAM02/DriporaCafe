<!-- The café at night: lit window, striped awning, crescent overhead -->
<template>
  <svg viewBox="0 0 400 300" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <!-- sky -->
    <path d="M318 40a26 26 0 1 0 23 38 21 21 0 1 1-23-38Z" fill="var(--foam)" />
    <g fill="var(--stone-soft)">
      <circle cx="60" cy="44" r="2" />
      <circle cx="120" cy="24" r="1.5" />
      <circle cx="210" cy="36" r="2" />
      <circle cx="268" cy="70" r="1.5" />
      <circle cx="40" cy="96" r="1.5" />
    </g>
    <!-- building -->
    <rect x="64" y="96" width="272" height="170" fill="var(--roast)" />
    <!-- sign -->
    <rect x="132" y="108" width="136" height="26" rx="3" fill="var(--night)" />
    <text x="200" y="127" text-anchor="middle" fill="var(--foam)" font-family="Alexandria, sans-serif" font-size="15" letter-spacing="5">DRIPORA</text>
    <!-- awning -->
    <path d="M72 144h256l-12 28H84Z" fill="var(--foam)" />
    <g fill="var(--pistachio)">
      <path d="M104 144h32l-3 28h-32Z" />
      <path d="M168 144h32v28h-32Z" />
      <path d="M232 144h32l3 28h-32Z" />
      <path d="M296 144h32l-10 28h-25Z" />
    </g>
    <!-- glowing window -->
    <rect x="88" y="184" width="150" height="70" rx="2" fill="#E9C27A" />
    <rect x="88" y="184" width="150" height="70" rx="2" stroke="var(--night)" stroke-width="4" />
    <path d="M163 184v70" stroke="var(--night)" stroke-width="3" />
    <!-- counter silhouettes: a cup and the dripper -->
    <g fill="var(--roast)" opacity="0.75">
      <path d="M106 240h26v-10q0-8-8-8h-10q-8 0-8 8Z" />
      <path d="M180 226h28l-8 14h-12Z" />
      <rect x="88" y="240" width="150" height="14" />
    </g>
    <!-- door -->
    <rect x="256" y="184" width="56" height="82" rx="2" fill="var(--night)" />
    <rect x="266" y="194" width="36" height="34" rx="2" fill="#E9C27A" opacity="0.8" />
    <circle cx="300" cy="234" r="2.5" fill="var(--foam)" />
    <!-- light spill and street -->
    <path d="M88 266l-30 24h210l-30-24Z" fill="#E9C27A" opacity="0.18" />
    <path d="M20 266h360" stroke="var(--stone-soft)" stroke-width="2" />
  </svg>
</template>
