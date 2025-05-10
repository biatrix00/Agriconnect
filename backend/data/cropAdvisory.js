const cropAdvisory = {
  summer: {
    rice: {
      tips: [
        "Ensure proper water management during summer months",
        "Apply nitrogen fertilizers in split doses",
        "Monitor for pest infestations regularly"
      ],
      bestPractices: "Maintain water level at 5-7cm during vegetative phase"
    },
    cotton: {
      tips: [
        "Irrigate every 7-10 days during flowering",
        "Apply recommended pesticides for bollworm control",
        "Monitor soil moisture regularly"
      ],
      bestPractices: "Use drip irrigation for better water efficiency"
    }
  },
  winter: {
    wheat: {
      tips: [
        "Sow at recommended time for your region",
        "Apply first irrigation at crown root initiation",
        "Monitor for yellow rust"
      ],
      bestPractices: "Use certified seeds for better yield"
    },
    mustard: {
      tips: [
        "Ensure proper seed bed preparation",
        "Apply recommended dose of fertilizers",
        "Control weeds in early stages"
      ],
      bestPractices: "Maintain proper plant spacing"
    }
  },
  monsoon: {
    maize: {
      tips: [
        "Ensure proper drainage",
        "Apply balanced fertilizers",
        "Monitor for stem borer"
      ],
      bestPractices: "Use high-yielding hybrid varieties"
    },
    soybean: {
      tips: [
        "Sow at onset of monsoon",
        "Apply rhizobium culture",
        "Control weeds effectively"
      ],
      bestPractices: "Use proper seed treatment"
    }
  }
};

module.exports = cropAdvisory; 