const marketPrices = {
  rice: {
    basmati: {
      minPrice: 2500,
      maxPrice: 3000,
      unit: "quintal",
      trend: "stable"
    },
    nonBasmati: {
      minPrice: 1800,
      maxPrice: 2200,
      unit: "quintal",
      trend: "rising"
    }
  },
  wheat: {
    minPrice: 2000,
    maxPrice: 2400,
    unit: "quintal",
    trend: "stable"
  },
  cotton: {
    minPrice: 6000,
    maxPrice: 7000,
    unit: "quintal",
    trend: "falling"
  },
  sugarcane: {
    minPrice: 300,
    maxPrice: 350,
    unit: "quintal",
    trend: "stable"
  },
  pulses: {
    chickpea: {
      minPrice: 4500,
      maxPrice: 5000,
      unit: "quintal",
      trend: "rising"
    },
    pigeonPea: {
      minPrice: 5000,
      maxPrice: 5500,
      unit: "quintal",
      trend: "stable"
    }
  }
};

module.exports = marketPrices; 