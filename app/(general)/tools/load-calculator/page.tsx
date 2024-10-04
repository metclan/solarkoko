import BudgetEstimator from "./load-calculator";
export const metadata = {
  "title": "Solar Load Sizing Calculator | SolarKoko",
  "description": "Use our Solar Load Sizing Calculator to estimate your daily energy consumption. Add appliances, specify their wattage and usage hours, and calculate total energy in kWh. Generate quotes, share your estimate, or print for easy reference.",
  "keywords": "solar load calculator, solar energy estimate, daily energy consumption, solar power planning, energy consumption calculator, solar load sizing, solar quote generator",
  "author": "SolarKoko",
  "robots": "index, follow",
  "og": {
    "title": "Solar Load Sizing Calculator | SolarKoko",
    "description": "Estimate your daily energy consumption for solar power planning. Add appliances, calculate total energy usage in kWh, and generate quotes.",
    "type": "website",
    "url": "https://www.solarkoko.com/solar-load-sizing-calculator",
    "image": "https://www.solarkoko.com/images/solar-load-calculator-thumbnail.jpg"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Solar Load Sizing Calculator | SolarKoko",
    "description": "Easily estimate your daily energy usage for solar power. Calculate total energy in kWh and generate quotes.",
    "image": "https://www.solarkoko.com/images/solar-load-calculator-thumbnail.jpg"
  }
}

export default function LoadCalculator () {
  return <BudgetEstimator />
}