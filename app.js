const API_URL = "http://localhost:2413";

// Load internships (companies in your backend)
async function loadInternships() {
  try {
    const res = await fetch(`${API_URL}/companies`);
    const companies = await res.json();

    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";

    companies.forEach(c => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${c.name}</h3>
        <p><strong>Domain:</strong> ${c.domain}</p>
        <p><strong>Location:</strong> ${c.location}</p>
        <p><strong>Skills Required:</strong> ${c.skills}</p>
      `;
      cardsContainer.appendChild(card);
    });

    document.getElementById("total-count").textContent = companies.length;
  } catch (err) {
    console.error("Error fetching companies:", err);
  }
}

// Handle search
document.getElementById("search-btn").addEventListener("click", async () => {
  const searchText = document.getElementById("search-input").value.toLowerCase();
  const domainFilter = document.getElementById("domain-filter").value;

  const res = await fetch(`${API_URL}/companies`);
  const companies = await res.json();

  const filtered = companies.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchText) ||
      c.skills.toLowerCase().includes(searchText) ||
      c.location.toLowerCase().includes(searchText);

    const matchesDomain = domainFilter === "" || c.domain === domainFilter;

    return matchesSearch && matchesDomain;
  });

  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${c.name}</h3>
      <p><strong>Domain:</strong> ${c.domain}</p>
      <p><strong>Location:</strong> ${c.location}</p>
      <p><strong>Skills Required:</strong> ${c.skills}</p>
    `;
    cardsContainer.appendChild(card);
  });

  document.getElementById("total-count").textContent = filtered.length;
});

// Load data on page load
window.onload = loadInternships;
