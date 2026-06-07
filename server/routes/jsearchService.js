async function searchJobs(userPreferences) {
    const apiKey = process.env.JSEARCH_API_KEY;
    const baseUrl = process.env.JSEARCH_BASE_URL;

    if (!apiKey) {
        throw new Error("Missing JSEARCH_API_KEY in .env file.");
    }

    if (!baseUrl) {
        throw new Error("Missing JSEARCH_BASE_URL in .env file.");
    }

    const params = buildJSearchParams(userPreferences);

    const response = await fetch(`${baseUrl}?${params.toString()}`, {
        method: "GET",
        headers: {
            "x-api-key": apiKey,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("JSearch API error:", data);

        throw new Error(data?.message || "JSearch API request failed.");
    }

    return {
        jSearchParams: Object.fromEntries(params.entries()),
        data,
    };
}