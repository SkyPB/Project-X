const client_id = "6MIYegybYmDeAKOmBKNkweFzIc0rBZmt";
const client_secret = "akRilOiFNk5qALz4";
const travelFacts = [
  "France is the most visited country in the world.",
  "Japan has a train that's never late.",
  "There's a town in Norway where the sun doesn’t rise for months!",
  "Banff, Canada has a hotel with its own natural hot spring.",
  "New Zealand has more sheep than people!",
];

// Random travel fact
document.getElementById("fun-fact").textContent =
  travelFacts[Math.floor(Math.random() * travelFacts.length)];

// Access Token
async function getToken() {
  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    }
  );
  const data = await response.json();
  return data.access_token;
}

// Get tours and activities based on user pnput
async function getTours() {
  const locationInput = document.getElementById("locationInput").value.trim();
  if (!locationInput) {
    alert("Please enter a city!");
    return;
  }

  try {
    const token = await getToken();

    // 1. Search for city or airport related to the city
    const geoResponse = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${locationInput}&subType=CITY,AIRPORT`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const geoData = await geoResponse.json();

    if (!geoData.data || geoData.data.length === 0) {
      alert("City not found. Please try another location.");
      return;
    }

    // 2. Find the first result that is a CITY first (prefer it)
    let cityResult = geoData.data.find((item) => item.subType === "CITY");
    if (!cityResult) {
      // If no direct city found, fallback to first available
      cityResult = geoData.data[0];
    }

    const iataCode = cityResult.iataCode;

    // 3. Fetch activities using the IATA code
    const activityResponse = await fetch(
      `https://test.api.amadeus.com/v1/shopping/activities?locationCode=${iataCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const activityData = await activityResponse.json();

    displayTours(activityData.data);
  } catch (error) {
    console.error("Error fetching tours:", error);
    alert("Something went wrong. Please try again later.");
  }
}

// Display activities
function displayTours(activities) {
  const container = document.getElementById("recommendations");
  container.innerHTML = "";

  if (!activities || activities.length === 0) {
    container.innerHTML = "<p>No tours found for this location.</p>";
    return;
  }

  activities.forEach((activity) => {
    const card = document.createElement("div");
    card.className = "destination-card fade-in";
    card.innerHTML = `
      <h3>${activity.name}</h3>
      <p>${activity.shortDescription || "No description available."}</p>
      <a href="${activity.bookingLink}" target="_blank">Book Now</a>
    `;
    container.appendChild(card);
  });
}

// Connect search form to getTours function
document.getElementById("tourForm").addEventListener("submit", function (e) {
  e.preventDefault();
  getTours();
});
