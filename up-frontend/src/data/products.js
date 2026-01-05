export const PRODUCTS = [
  // ===== CAPS =====
  {
    id: "cap-white-cloud",
    slug: "white-cloud-cap",
    name: "White Cloud Cap",
    price: 39,
    category: "caps",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=White+Cloud+Cap"],
    description: "Casquette blanche premium. Inspirée des nuages.",
  },
  {
    id: "cap-storm-grey",
    slug: "storm-grey-cap",
    name: "Storm Grey Cap",
    price: 39,
    category: "caps",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Storm+Grey+Cap"],
    description: "Casquette grise. Style orage.",
  },
  {
    id: "cap-sky-blue",
    slug: "sky-blue-cap",
    name: "Sky Blue Cap",
    price: 42,
    category: "caps",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Sky+Blue+Cap"],
    description: "Bleu ciel doux.",
  },
  {
    id: "cap-fog-white",
    slug: "fog-white-cap",
    name: "Fog White Cap",
    price: 41,
    category: "caps",
    inStock: false,
    images: ["https://via.placeholder.com/900x650?text=Fog+White+Cap"],
    description: "Blanc brume.",
  },
  {
    id: "cap-night-cloud",
    slug: "night-cloud-cap",
    name: "Night Cloud Cap",
    price: 45,
    category: "caps",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Night+Cloud+Cap"],
    description: "Noir profond inspiré du ciel nocturne.",
  },
  {
    id: "cap-silver-lining",
    slug: "silver-lining-cap",
    name: "Silver Lining Cap",
    price: 44,
    category: "caps",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Silver+Lining+Cap"],
    description: "Gris clair métallique.",
  },

  // ===== VÊTEMENTS =====
  {
    id: "hoodie-cloud",
    slug: "cloud-hoodie",
    name: "Cloud Hoodie",
    price: 79,
    category: "vetements",
    inStock: false,
    images: ["https://via.placeholder.com/900x650?text=Cloud+Hoodie"],
    description: "Hoodie nuage. Coupe confortable.",
  },
  {
    id: "hoodie-sky",
    slug: "sky-hoodie",
    name: "Sky Hoodie",
    price: 82,
    category: "vetements",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Sky+Hoodie"],
    description: "Hoodie bleu ciel.",
  },
  {
    id: "tee-cloud-basic",
    slug: "cloud-basic-tee",
    name: "Cloud Basic Tee",
    price: 29,
    category: "vetements",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Cloud+Basic+Tee"],
    description: "T-shirt minimal blanc.",
  },
  {
    id: "tee-storm-dark",
    slug: "storm-dark-tee",
    name: "Storm Dark Tee",
    price: 32,
    category: "vetements",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Storm+Dark+Tee"],
    description: "T-shirt sombre inspiré de l’orage.",
  },
  {
    id: "crewneck-fog",
    slug: "fog-crewneck",
    name: "Fog Crewneck",
    price: 69,
    category: "vetements",
    inStock: false,
    images: ["https://via.placeholder.com/900x650?text=Fog+Crewneck"],
    description: "Crewneck gris brume.",
  },
  {
    id: "jacket-cloudshell",
    slug: "cloudshell-jacket",
    name: "Cloudshell Jacket",
    price: 119,
    category: "vetements",
    inStock: true,
    images: ["https://via.placeholder.com/900x650?text=Cloudshell+Jacket"],
    description: "Veste légère inspirée du ciel.",
  },
];

// ===== HELPERS =====
export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter((p) => p.category === category);
}
