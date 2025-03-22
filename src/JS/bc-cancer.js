/**
 * Fetches cancer event data for the specified cities.
 * Example: fetchCancerEvents(["Vancouver", "Victoria"])
 */
async function fetchCancerEvents(cities) {
    if (!Array.isArray(cities) || cities.length === 0) {
        throw new Error("Please provide at least one city.");
    }

    // Construct query string using cities
    const query = cities.map(city => `cities=${encodeURIComponent(city)}`).join("&");

    // format=json
    const url = `https://bc-cancer-faux.onrender.com/event?${query}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch events.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Fetches a fixed number of donors from the API (5 by default).
 */
async function fetchDonors(limit) {
    // Default to 5 if limit is not provided or invalid
    const actualLimit = (typeof limit === "number" && limit > 0) ? limit : 5;
    const url = `https://bc-cancer-faux.onrender.com/donors?format=json&limit=${actualLimit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch donors.");
        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Fetches a list of available cities from the API.
 */
async function fetchCities() {
    const url = "https://bc-cancer-faux.onrender.com/cities?format=json";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch cities.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Simplifies the event data to just city and event_type.
 */
function formatEventSummary(events) {
    return events.map(event => ({
        city: event.city,
        type: event.event_type
    }));
}