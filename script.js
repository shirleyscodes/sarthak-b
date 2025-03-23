const images = Array.from({ length: 50 }, (_, i) => `Images/pic${i + 1}.jpg`);

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const quotes = await response.json();
        if (!Array.isArray(quotes) || quotes.length === 0) {
            throw new Error("Quotes JSON is empty or not an array.");
        }
        return quotes;
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return []; // Return an empty array to prevent crashes
    }
}

async function updateContent() {
    console.log("Updating content...");
    
    const quotes = await fetchQuotes();
    if (quotes.length === 0) {
        document.getElementById("quote").innerText = "Failed to load quotes.";
        return;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    document.getElementById("randomImage").src = randomImage;
    document.getElementById("quote").innerText = randomQuote;
}

// Ensure the button exists before adding an event listener
document.addEventListener("DOMContentLoaded", () => {
    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", updateContent);
    }
    updateContent(); // Run once on page load
});

