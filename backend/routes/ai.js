const express = require('express');
const router = express.Router();

// Mock AI responses for now - replace with actual AI integration later
const farmingResponses = {
  default: "I'm your AI farming assistant. I can help you with crop management, soil health, pest control, and more. What would you like to know?",
  soil: "For healthy soil, consider regular testing, proper pH levels (6.0-7.0 for most crops), and organic matter content. Rotate crops and use cover crops to maintain soil health.",
  pests: "Integrated Pest Management (IPM) is recommended. This includes monitoring, biological controls, and targeted pesticide use only when necessary.",
  crops: "Choose crops based on your climate, soil type, and market demand. Consider crop rotation to prevent soil depletion and pest buildup.",
  irrigation: "Efficient irrigation methods include drip irrigation and soaker hoses. Water early morning to reduce evaporation and prevent fungal diseases.",
  weather: "Monitor local weather forecasts and consider using weather stations. Protect crops from extreme conditions with appropriate covers or structures."
};

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();

    // Simple keyword matching for now
    let response = farmingResponses.default;
    if (lowerMessage.includes('soil')) {
      response = farmingResponses.soil;
    } else if (lowerMessage.includes('pest')) {
      response = farmingResponses.pests;
    } else if (lowerMessage.includes('crop')) {
      response = farmingResponses.crops;
    } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      response = farmingResponses.irrigation;
    } else if (lowerMessage.includes('weather')) {
      response = farmingResponses.weather;
    }

    res.json({ response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

module.exports = router; 