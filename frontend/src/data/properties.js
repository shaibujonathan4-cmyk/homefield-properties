// Temporary sample data. Once the backend is wired up, this will be
// replaced by fetch calls to /api/properties instead.

const properties = [
  {
    id: 'sc-001',
    category: 'Self Contained',
    categorySlug: 'self-contained',
    title: '2-Bedroom Self Contained, Ikeja',
    price: 850000,
    priceLabel: '/ yr',
    location: 'Ikeja, Lagos',
    specs: { rooms: 2, bathrooms: 1, size: '45 sqm', extras: 'Water & power included' },
    description:
      'A well-finished self contained unit close to the main road, with tiled floors, a fitted kitchenette, and 24-hour water supply. Ideal for a single tenant or small family.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=80',
    ],
  },
  {
    id: 'hm-001',
    category: 'Homes',
    categorySlug: 'homes',
    title: '4-Bedroom Detached Duplex, Lekki',
    price: 45000000,
    priceLabel: '',
    location: 'Lekki, Lagos',
    specs: { rooms: 4, bathrooms: 5, size: '320 sqm', extras: 'Fitted kitchen, BQ, gated estate' },
    description:
      'A spacious duplex in a serviced, gated estate with 24-hour security, ample parking, and a boys quarters. Move-in ready.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    ],
  },
  {
    id: 'sh-001',
    category: 'Shops',
    categorySlug: 'shops',
    title: 'Corner Shop, Computer Village',
    price: 3500000,
    priceLabel: '/ yr',
    location: 'Ikeja, Lagos',
    specs: { rooms: 1, bathrooms: 0, size: '18 sqm', extras: 'High foot traffic, roadside' },
    description:
      'A corner unit on a busy commercial street with steady foot traffic, suited to retail or a service business.',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
    ],
  },
  {
    id: 'ld-001',
    category: 'Lands',
    categorySlug: 'lands',
    title: 'Titled Plot, Ibeju-Lekki',
    price: 8000000,
    priceLabel: '',
    location: 'Ibeju-Lekki, Lagos',
    specs: { rooms: '-', bathrooms: '-', size: '648 sqm', extras: 'Registered survey & C of O' },
    description:
      'A titled, dry plot in a fast-developing area near the Lekki Free Trade Zone, suitable for residential or commercial development.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
    ],
  },
];

export default properties;

export function getPropertyById(id) {
  return properties.find((p) => p.id === id);
}

export function getPropertiesByCategory(slug) {
  return properties.filter((p) => p.categorySlug === slug);
}