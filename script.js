const preferences = {};
const travelFacts = [
  "France is the most visited country in the world.",
  "Japan has a train that's never late.",
  "There's a town in Norway where the sun doesn’t rise for months!",
  "Banff, Canada has a hotel with its own natural hot spring.",
  "New Zealand has more sheep than people!",
];

// Random fun fact
document.getElementById("fun-fact").textContent =
  travelFacts[Math.floor(Math.random() * travelFacts.length)];

document.getElementById("submitQuiz").addEventListener("click", () => {
  console.log("User preferences:", preferences);

  // Dummy data
  const recommendationsDiv = document.getElementById("recommendations");
  recommendationsDiv.innerHTML = `
        <div class="destination-card fade-in">
          <h3>Santorini, Greece</h3>
          <p>Perfect for a warm, beach getaway on a medium budget.</p>
        </div>
        <div class="destination-card fade-in">
          <h3>Kyoto, Japan</h3>
          <p>Charming city full of culture, great for nature lovers too.</p>
        </div>
        <div class="destination-card fade-in">
          <h3>Reykjavík, Iceland</h3>
          <p>Ideal for cold adventures and stunning natural beauty.</p>
        </div>
      `;
});
