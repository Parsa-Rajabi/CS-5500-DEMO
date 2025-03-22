// Helper function to convert tabular API response into array of objects
function convertToObjects(headers, rows) {
    return rows.map(row => {
        const obj = {};
        for (let i = 0; i < headers.length; i++) {
            obj[headers[i]] = row[i];
        }
        return obj;
    });
}

// Task 1: Unit test for formatEventSummary
// This test checks that the formatEventSummary function correctly transforms an array of event objects 
// by simplifying them to only include the city and event type. The input is a sample array of event objects, 
// and the expected output is an array of simplified objects.
function testFormatEventSummary_shouldReturnSimplifiedObjects() {
    console.log("Running: testFormatEventSummary_shouldReturnSimplifiedObjects"); // Debug: can be used for debugging

    const sample = [
        { city: "Richmond", event_type: "Fundraiser", date: "2024-03-01" },
        { city: "Victoria", event_type: "Screening", date: "2024-04-12" }
    ];

    const expected = [
        { city: "Richmond", type: "Fundraiser" },
        { city: "Victoria", type: "Screening" }
    ];

    const actual = formatEventSummary(sample);

    console.assert(
        JSON.stringify(actual) === JSON.stringify(expected),
        "❌ formatEventSummary failed"
    );

    console.log("✅ testFormatEventSummary_shouldReturnSimplifiedObjects passed"); // Debug: can be used for debugging
}

// Task 3: Integration test for fetchDonors with limit
// This test verifies that the fetchDonors function respects the limit parameter when fetching donor data.
// The rawResult variable holds the response from the fetchDonors call, which includes headers and data.
// The test checks that the data structure is valid and that the number of donor objects returned matches the limit.
async function testFetchDonors_shouldRespectLimit() {
    console.log("Running: testFetchDonors_shouldRespectLimit");

    const rawResult = await fetchDonors(3); // Fetching donors with a limit of 3
    // console.log("Donors result:", rawResult); // Debug: can be used for debugging

    if (!rawResult || !rawResult.headers || !rawResult.data) {
        console.error("❌ fetchDonors returned an unexpected structure");
        return;
    }

    const headers = rawResult.headers; // Extracting headers from the raw result
    const rows = rawResult.data; // Extracting data rows from the raw result

    // Transforming the raw table data into an array of donor objects using helper function
    const donors = convertToObjects(headers, rows); // Using helper function to transform data

    // Validating that the donors array is correctly formed
    const isValid = Array.isArray(donors) &&
                    donors.length === 3 && // Checking that the length matches the limit
                    donors.every(donor => typeof donor.first_name === "string" && typeof donor.city === "string"); // Ensuring each donor has valid properties

    console.assert(
        isValid,
        "❌ fetchDonors did not return valid donor objects with correct length"
    );

    console.log("✅ testFetchDonors_shouldRespectLimit passed");
}

// Simplified negative test: fetchDonors with invalid limit
// This test checks how fetchDonors handles invalid limit inputs.
// Each case in invalidLimits is tested to ensure the function returns a structure, 
// regardless of whether the limit is valid or not.
async function testFetchDonors_withInvalidLimit_shouldDefaultOrReturnError() {
    console.log("Running: testFetchDonors_withInvalidLimit_shouldDefaultOrReturnError");

    const invalidLimits = [0, -1, "three", null, undefined];

    for (const limit of invalidLimits) {
        const result = await fetchDonors(limit); // Testing fetchDonors with various invalid limits
        // console.log(`Result for limit=${limit}:`, result); // Debug: can be used for debugging

        const isValid = result && result.headers && result.data; // Validating the structure of the response

        console.assert(
            isValid,
            `❌ fetchDonors did not return expected raw structure for limit=${limit}`
        );
    }

    console.log("✅ testFetchDonors_withInvalidLimit_shouldDefaultOrReturnError passed");
}

// Task 4: Integration test for fetchCities
// This test checks that fetchCities returns a list of city names as strings.
async function testFetchCities_shouldReturnCityList() {
    console.log("Running: testFetchCities_shouldReturnCityList");

    const result = await fetchCities();
    // console.log("Cities result:", result); // Debug: can be used for debugging

    if (!result || !result.headers || !result.data) {
        console.error("❌ fetchCities returned an unexpected structure");
        return;
    }

    const cityObjects = convertToObjects(result.headers, result.data);
    const cities = cityObjects.map(obj => obj.city);

    const isValid = Array.isArray(cities) &&
                    cities.length > 0 &&
                    cities.every(city => typeof city === "string");

    console.assert(
        isValid,
        "❌ fetchCities did not return an array of strings"
    );

    console.log("✅ testFetchCities_shouldReturnCityList passed");
}

// Task 5: Negative test for empty input in fetchCancerEvents
// This test checks that the fetchCancerEvents function properly handles an empty input array, 
// verifying that it throws an error as expected when no cities are provided.
async function testFetchCancerEvents_withEmptyInput_shouldThrowError() {
    console.log("Running: testFetchCancerEvents_withEmptyInput_shouldThrowError");

    try {
        await fetchCancerEvents([]); // Attempting to fetch events with an empty input
        console.error("❌ fetchCancerEvents did not throw error for empty input");
    } catch (err) {
        console.log("✅ testFetchCancerEvents_withEmptyInput_shouldThrowError passed");
    }
}

// Test raw fetch to donors endpoint for diagnostics
// This test checks the connectivity to the donors API endpoint and logs the output of the response. 
// It is useful for diagnosing issues with the API.
async function testRawFetchDonorsEndpoint() {
    console.log("Running: testRawFetchDonorsEndpoint");

    try {
        const response = await fetch("https://bc-cancer-faux.onrender.com/donors?format=json&limit=3");
        const data = await response.json();
        // console.log("✅ Raw donors endpoint returned:", data); // Debug: can be used for debugging
    } catch (error) {
        console.error("❌ Raw fetch failed:", error);
    }
}

// Run all tests
testFormatEventSummary_shouldReturnSimplifiedObjects();
testFetchDonors_shouldRespectLimit();
testFetchDonors_withInvalidLimit_shouldDefaultOrReturnError();
testFetchCities_shouldReturnCityList();
testFetchCancerEvents_withEmptyInput_shouldThrowError();
testRawFetchDonorsEndpoint();

// Instructions for In-Class Activity
/**
 * 
 * Task 1: Write a unit test for the formatEventSummary function with different sample data.
 * 
 * Expected:
 * Sample input: [{ city: "Kelowna", event_type: "Awareness Walk", date: "2024-05-01" }]
 * Expected output: [{ city: "Kelowna", type: "Awareness Walk" }]
 * 
 * Task 2: Write an integration test for the fetchDonors function using a different limit (e.g., 2).
 * 
 * Expected:
 * The function should return exactly 2 donor objects with valid first_name and city.
 * 
 * Task 3: Write an integration test for fetchCities to verify it contains a known city.
 * 
 * Expected:
 * Result should include "Vancouver" or another known city from the API.
 * 
 * Task 4: Write a negative test for fetchDonors using a very high limit (e.g., 1000).
 * 
 * Expected:
 * The API should not fail or hang; test should confirm structure is valid and contains ≤ 1000 entries.
 */

// Task 1: Unit Test for formatEventSummary
function testFormatEventSummary_withKelownaEvent() {
    console.log("Running: testFormatEventSummary_withKelownaEvent");

    const input = [{ city: "Kelowna", event_type: "Awareness Walk", date: "2024-05-01" }];
    const expected = [{ city: "Kelowna", type: "Awareness Walk" }];

    const actual = formatEventSummary(input);

    console.assert(
        JSON.stringify(actual) === JSON.stringify(expected),
        "❌ testFormatEventSummary_withKelownaEvent failed"
    );

    console.log("✅ testFormatEventSummary_withKelownaEvent passed");
}

// Task 2: Integration Test for fetchDonors with limit = 2
async function testFetchDonors_shouldReturnTwo() {
    console.log("Running: testFetchDonors_shouldReturnTwo");

    const rawResult = await fetchDonors(2);

    if (!rawResult || !rawResult.headers || !rawResult.data) {
        console.error("❌ fetchDonors returned an unexpected structure");
        return;
    }

    const donors = convertToObjects(rawResult.headers, rawResult.data);

    const isValid = Array.isArray(donors) &&
                    donors.length === 2 &&
                    donors.every(d => d.first_name && d.city);

    console.assert(
        isValid,
        "❌ testFetchDonors_shouldReturnTwo failed"
    );

    console.log("✅ testFetchDonors_shouldReturnTwo passed");
}

// Task 3: Integration Test for fetchCities containing 'Vancouver'
async function testFetchCities_shouldContainVancouver() {
    console.log("Running: testFetchCities_shouldContainVancouver");

    const result = await fetchCities();

    if (!result || !result.headers || !result.data) {
        console.error("❌ fetchCities returned an unexpected structure");
        return;
    }

    const cities = convertToObjects(result.headers, result.data).map(obj => obj.city);

    console.assert(
        cities.includes("Vancouver"),
        "❌ testFetchCities_shouldContainVancouver failed"
    );

    console.log("✅ testFetchCities_shouldContainVancouver passed");
}

// Task 4: Negative Test for fetchDonors with large limit
async function testFetchDonors_withHighLimit_shouldNotFail() {
    console.log("Running: testFetchDonors_withHighLimit_shouldNotFail");

    const rawResult = await fetchDonors(1000);

    const isValid = rawResult && rawResult.headers && rawResult.data && rawResult.data.length <= 1000;

    console.assert(
        isValid,
        "❌ testFetchDonors_withHighLimit_shouldNotFail failed"
    );

    console.log("✅ testFetchDonors_withHighLimit_shouldNotFail passed");
}

testFormatEventSummary_withKelownaEvent();
testFetchDonors_shouldReturnTwo();
testFetchCities_shouldContainVancouver();
testFetchDonors_withHighLimit_shouldNotFail();