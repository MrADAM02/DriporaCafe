export const cafe = {
  name: { ar: "دريبورا كافيه", en: "DRIPORA CAFE" }, // TODO confirm the Arabic spelling with the client
  phone: "+966112226299", // café landline (from the Google listing)
  whatsapp: "966594041557", // wa.me format, no plus sign
  address: {
    ar: "حي المعذر، الرياض 12721", // TODO confirm the full Arabic address
    en: "8654 At Tuyur, Al Maather, Riyadh 12721",
  },
  geo: { lat: 24.6732845, lng: 46.6626701 },
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJ3epDZIYdLz4RtyMcaduiQyg",
  // Daily, closing after midnight. TODO confirm with client.
  hours: { open: "05:00", close: "03:00", timezone: "Asia/Riyadh" },
  socials: {
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    x: "https://x.com/",
  }, // TODO real handles; hide icons whose value is empty
  deliveryApps: [] as { name: string; url: string }[], // TODO e.g. HungerStation, Jahez
  // TODO(client): real photos. Paths under /public; while empty, the brand illustrations show instead.
  photos: { brewing: "/images/photos/v60-pour.webp" },
};

export type Localized = { ar: string; en: string };
