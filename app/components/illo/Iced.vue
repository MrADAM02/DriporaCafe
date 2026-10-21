<!-- Iced pistachio latte: pistachio, milk and an espresso float in a tall glass -->
<template>
  <svg viewBox="0 0 400 400" fill="none" stroke="var(--roast)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="iced-glass">
        <path d="M140 104h120l-15 206q-1 12-13 12h-64q-12 0-13-12Z" />
      </clipPath>
    </defs>
    <!-- straw -->
    <path d="M232 46l-26 236" stroke="var(--cherry)" stroke-width="10" />
    <path d="M232 46l-6 0" stroke="var(--cherry)" stroke-width="10" />
    <!-- liquid layers -->
    <g clip-path="url(#iced-glass)" stroke="none">
      <rect x="120" y="120" width="160" height="210" fill="var(--crema)" />
      <rect x="120" y="248" width="160" height="80" fill="var(--pistachio)" />
      <path d="M120 140q40 14 80 0t80 0v18q-40 14-80 0t-80 0Z" fill="var(--roast)" opacity="0.85" />
      <path d="M120 238q40 16 80 4t80 6v12H120Z" fill="var(--pistachio)" opacity="0.6" />
    </g>
    <!-- ice -->
    <g stroke-width="3" fill="var(--foam)" fill-opacity="0.55">
      <rect x="158" y="114" width="40" height="38" rx="7" transform="rotate(-12 178 133)" />
      <rect x="204" y="124" width="38" height="36" rx="7" transform="rotate(10 223 142)" />
      <rect x="176" y="160" width="36" height="34" rx="7" transform="rotate(6 194 177)" />
    </g>
    <!-- glass -->
    <path d="M140 104h120l-15 206q-1 12-13 12h-64q-12 0-13-12Z" />
    <ellipse cx="200" cy="104" rx="60" ry="8" />
    <!-- condensation -->
    <g fill="var(--foam)" stroke="none" opacity="0.9">
      <circle cx="160" cy="214" r="3" />
      <circle cx="168" cy="268" r="2.5" />
      <circle cx="238" cy="230" r="3" />
      <circle cx="232" cy="290" r="2" />
    </g>
    <!-- coaster shadow -->
    <ellipse cx="200" cy="334" rx="84" ry="10" opacity="0.25" />
  </svg>
</template>
