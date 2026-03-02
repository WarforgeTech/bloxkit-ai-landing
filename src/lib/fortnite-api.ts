// fortnite-api.ts
// ----------------
// A production-ready TypeScript module for retrieving Fortnite island metadata, metrics, and thumbnails.
//
// Features:
// - Retrieve top Fortnite islands and their metadata
// - Fetch historical and interval-based metrics (CCU, minutes played, etc.)
// - Estimate earnings based on CCU
// - Get thumbnails via Google Custom Search
// - Designed for integration into web apps, dashboards, and data pipelines

// =========================
// Types
// =========================
export interface ProcessedIsland {
    island_id: string;
    name: string;
    thumbnail_url: string | null;
    creator_name: string;
    description: string;
    current_ccu: number;
    metrics: any;
}

export interface HistoricalDataPoint {
    date: string;
    ccu: number;
    [key: string]: any;
}

export interface HistoricalSummary {
    total_ccu_7days: number;
    daily_breakdown: HistoricalDataPoint[];
    days_with_data: number;
    average_daily_ccu: number;
}

export interface RandomIslandResult {
    island: ProcessedIsland;
    historical_summary: HistoricalSummary;
    timestamp: string;
}

// =========================
// Hardcoded Island Codes
// =========================
const HARDCODED_ISLAND_CODES = [
    "8068-9359-0183",
    "8064-7152-2934",
    "6562-8953-6567",
    "8298-6891-9930",
    "6570-5231-1418",
    "2786-2114-8349",
    "4540-2792-0054",
    "4032-4883-0195",
    "8532-9413-6963",
    "7835-3901-1999",
    "3537-4087-0888",
    "8402-3642-6726",
    "6940-8669-1904",
    "4660-4454-3176",
    "5728-0376-9174",
    "6366-6217-9042",
    "3256-2350-0756",
    "1744-5438-2747",
    "4366-9611-6988",
    "3157-3993-6925",
    "5508-4694-8114",
    "8398-4381-0561",
    "7159-6279-1617",
    "7300-0705-2924",
    "4062-1024-9914",
    "2424-4344-7824",
    "3533-5211-7130",
    "4936-3265-0527",
    "6124-5897-5181",
    "2724-4064-5480",
    "7950-6306-4857",
    "9919-3137-0527",
    "7011-3815-1384",
    "8234-1352-6956",
    "0243-3963-9174",
    "1760-0152-1306",
    "8685-1467-7801",
    "8352-7392-6528",
    "5142-0962-3490",
    "0992-9699-5281",
    "7850-2672-8917",
    "1146-7216-6816",
    "7441-9489-4182",
    "6586-8735-3733",
    "4059-2791-0712",
    "7686-1102-4551",
    "1303-1773-0955",
    "8699-5246-6810",
    "6838-1201-8244"
];

// =========================
// Google Custom Search API
// =========================
const GOOGLE_API_KEY = "AIzaSyBLSDsAYoOwggUeEqPYMZswJ9Y9eg69iSQ";
const GOOGLE_CSE_ID = "3294035ce4f2847c5";

// Simple rate limiting for Google API calls
let lastGoogleCallTime = 0;

/**
* Return the first image result URL from Google Custom Search.
* @param query Search term, e.g. "<Island Name> <Island Code>"
* @returns Direct image URL or null if no result/error.
*/
export async function googleFirstImage(query: string, attempt: number = 1): Promise<string | null> {
    const MAX_ATTEMPTS = 1; // Only one attempt per query in this function

    if (attempt > MAX_ATTEMPTS) {
        console.error(`Google image search failed for '${query}' after ${MAX_ATTEMPTS} attempts.`);
        throw new Error(`Google image search failed after ${MAX_ATTEMPTS} attempts`);
    }

    try {
        const now = Date.now();
        const timeSinceLastCall = now - lastGoogleCallTime;
        const minDelay = 100; // Minimum delay between Google calls in ms
        if (timeSinceLastCall < minDelay) {
            await new Promise(resolve => setTimeout(resolve, minDelay - timeSinceLastCall));
        }
        lastGoogleCallTime = Date.now(); // Update last call time

        const params = new URLSearchParams({
            key: GOOGLE_API_KEY,
            cx: GOOGLE_CSE_ID,
            q: query,
            searchType: "image",
            num: "1",
            safe: "medium"
        });
        const requestUrl = `https://customsearch.googleapis.com/customsearch/v1?${params}`;
        const response = await fetch(requestUrl);

        if (!response.ok) {
            console.warn(`Google image search failed for '${query}' (Status: ${response.status}).`);
            return null; // Do not retry in this function
        }

        const data = await response.json();
        const items = Array.isArray(data.items) ? data.items : [];
        return items[0]?.link || items[0]?.image?.thumbnailLink || null;
    } catch (error) {
        console.warn(`Google image search failed for '${query}':`, error);
        return null;
    }
}

/**
* Return a thumbnail image URL for a Fortnite island using Google Custom Search.
* @param islandName The island's name
* @param islandCode The island's code
* @returns Direct image URL or null if not found
*/
export async function getThumbnailForIsland(islandName: string, islandCode: string): Promise<string | null> {
    const searchQuery = `${islandName} ${islandCode}`;
    return await googleFirstImage(searchQuery);
}

// =========================
// Fortnite API Client
// =========================
class FortniteApiInternal {
    private baseUrl = "https://api.fortnite.com/ecosystem/v1";
    private retryAttempts = 10;
    private retryDelay = 2000; // 2 seconds

    /**
     * Make a request to the Fortnite API with error handling and retry logic.
     * @param endpoint API endpoint (e.g. '/islands')
     * @param params Query parameters
     * @returns Parsed JSON response
     */
    async makeRequest<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const queryString = params ? new URLSearchParams(params).toString() : '';
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const response = await fetch(fullUrl, {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'FortniteAPI-Client/1.0'
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();

                    // Check if the response has meaningful data
                    if (this.hasValidData(data, endpoint)) {
                        return data;
                    } else {
                        console.warn(`Attempt ${attempt}: Response has no valid data for ${endpoint}`);
                        if (attempt < this.retryAttempts) {
                            await this.delay(this.retryDelay);
                            continue;
                        } else {
                            throw new Error(`No valid data received after ${attempt} attempts`);
                        }
                    }
                } else if (response.status === 429) {
                    const waitTime = this.retryDelay * Math.pow(2, attempt - 1);
                    await this.delay(waitTime);
                    continue;
                } else if (response.status === 400) {
                    const errorText = await response.text();
                    throw new Error(`Invalid parameters: ${errorText}`);
                } else if (response.status === 500) {
                    if (attempt < this.retryAttempts) {
                        await this.delay(this.retryDelay);
                        continue;
                    } else {
                        throw new Error(`Server error after ${attempt} attempts`);
                    }
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                if (attempt < this.retryAttempts) {
                    await this.delay(this.retryDelay);
                    continue;
                } else {
                    throw error;
                }
            }
        }
        throw new Error(`Failed to make request after ${this.retryAttempts} attempts`);
    }

    /**
     * Utility: Delay for a given number of ms
     */
    public delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Check if the API response contains valid data
     * @param data The response data to validate
     * @param endpoint The API endpoint being called
     * @returns True if the data is valid, false otherwise
     */
    private hasValidData(data: any, endpoint: string): boolean {
        // For islands endpoint, check if we have an array of islands
        if (endpoint === '/islands') {
            return Array.isArray(data.data) && data.data.length > 0;
        }

        // For individual island endpoint, check if we have basic island info
        if (endpoint.includes('/islands/') && !endpoint.includes('/metrics')) {
            return data && (data.code || data.title || data.creatorName);
        }

        // For metrics endpoint, check if we have metrics data
        if (endpoint.includes('/metrics')) {
            return data && (data.peakCCU || data.data || Object.keys(data).length > 0);
        }

        // Default: consider any non-null data as valid
        return data !== null && data !== undefined;
    }

    /**
     * Get top island codes based on current concurrent users (filters out Epic/Epic Games islands)
     * @param limit Number of islands to retrieve
     * @returns List of island codes
     */
    async get_top_island_codes(limit: number = 100): Promise<string[]> {
        const params = {
            sort_by: 'current_ccu',
            sort_order: 'desc',
            limit: limit.toString(),
            offset: '0'
        };
        const response = await this.makeRequest<any>('/islands', params);
        const islands = Array.isArray(response.data) ? response.data : [];
        const filtered = islands.filter((island: any) => {
            const creator = (island.creatorCode || island.creatorName || '').trim().toLowerCase();
            return !['epic', 'epicgames', 'epic games'].includes(creator);
        });
        return filtered.map((island: any) => island.code).filter(Boolean);
    }

    /**
     * Get detailed information for a specific island by code
     * @param islandCode The island code
     * @returns ProcessedIsland or null on error
     */
    async get_island_details(islandCode: string): Promise<ProcessedIsland | null> {
        try {
            const response = await this.makeRequest<any>(`/islands/${islandCode}`);
            const island = response;
            const creator = (island.creatorName || island.creatorCode || '').trim().toLowerCase();
            if (["epic", "epicgames", "epic games"].includes(creator)) {
                return null;
            }
            let thumbnailUrl = null;
            // Only attempt to get thumbnail if one hasn't been found yet
            if (!island.thumbnail_url) {
                thumbnailUrl = await getThumbnailForIsland(island.title || island.code, islandCode);
            }
            return {
                island_id: island.code,
                name: island.title || 'Unknown Island',
                thumbnail_url: thumbnailUrl,
                creator_name: island.creatorName || island.creatorCode || 'Unknown Creator',
                description: island.description || 'No description available',
                current_ccu: island.metrics?.current_ccu || 0,
                metrics: island.metrics || {}
            };
        } catch (error) {
            return null;
        }
    }

    /**
     * Get top islands with all required details, filtered to exclude Epic/Epic Games islands
     * @param limit Number of islands to retrieve
     * @returns List of ProcessedIsland
     */
    async get_top_islands(limit: number = 100): Promise<ProcessedIsland[]> {
        const codes = await this.get_top_island_codes(limit);
        const islands: ProcessedIsland[] = [];
        for (let i = 0; i < codes.length; i++) {
            const code = codes[i];
            const details = await this.get_island_details(code); // get_island_details now handles thumbnail
            if (details) {
                const creator = details.creator_name.trim().toLowerCase();
                if (["epic", "epicgames", "epic games"].includes(creator)) continue;
                islands.push(details);
            }
            await this.delay(200);
        }
        return islands;
    }

    /**
     * Get historical data for an island (up to 7 days back)
     * @param islandCode The island code
     * @param daysBack Number of days to look back
     * @returns List of daily metrics
     */
    async get_historical_data(islandCode: string, daysBack: number = 7): Promise<HistoricalDataPoint[]> {
        // Calculate exact date range (7 days ago to now) - matching Python implementation
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - Math.min(daysBack, 7));

        const params = {
            from: startDate.toISOString(), // Use ISO timestamp like Python
            to: endDate.toISOString()      // Use ISO timestamp like Python
        };

        try {
            const response = await this.makeRequest<any>(`/islands/${islandCode}/metrics`, params);
            // console.log(`CCU response structure for ${islandCode}:`, JSON.stringify(response, null, 2)); // REMOVED FOR PRODUCTION

            // Extract CCU data from response - look for peakCCU specifically (matching Python logic)
            const peakCcuData = response.peakCCU || [];
            if (Array.isArray(peakCcuData) && peakCcuData.length > 0) {
                return peakCcuData.map((item: any) => ({
                    date: item.timestamp ? item.timestamp.split('T')[0] : 'Unknown', // Extract just the date part
                    ccu: item.value || 0,
                    ...item // Include other properties
                }));
            }

            // Fallback to old format if peakCCU not found
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error(`Error getting historical data for ${islandCode}:`, error);
            return [];
        }
    }
}

// =========================
// Public API Class
// =========================
export class FortniteAPI {
    private internal: FortniteApiInternal;
    constructor() {
        this.internal = new FortniteApiInternal();
    }

    /**
     * Get top island codes based on current concurrent users (filters out Epic/Epic Games islands)
     * @param limit Number of islands to retrieve
     * @returns List of island codes
     */
    async get_top_island_codes(limit: number = 100): Promise<string[]> {
        return await this.internal.get_top_island_codes(limit);
    }

    /**
     * Get detailed information for a specific island by code
     * @param islandCode The island code
     * @returns ProcessedIsland or null on error
     */
    async get_island_details(islandCode: string): Promise<ProcessedIsland | null> {
        return await this.internal.get_island_details(islandCode);
    }

    /**
     * Get top islands with all required details, filtered to exclude Epic/Epic Games islands
     * @param limit Number of islands to retrieve
     * @returns List of ProcessedIsland
     */
    async get_top_islands(limit: number = 100): Promise<ProcessedIsland[]> {
        return await this.internal.get_top_islands(limit);
    }

    /**
     * Get historical data for an island (up to 7 days back)
     * @param islandCode The island code
     * @param daysBack Number of days to look back
     * @returns List of daily metrics
     */
    async get_historical_data(islandCode: string, daysBack: number = 7): Promise<HistoricalDataPoint[]> {
        return await this.internal.get_historical_data(islandCode, daysBack);
    }

    /**
     * Get a random island code from the hardcoded list
     * @returns A random island code string
     */
    getRandomIslandCode(): string {
        const randomIndex = Math.floor(Math.random() * HARDCODED_ISLAND_CODES.length);
        return HARDCODED_ISLAND_CODES[randomIndex];
    }

    /**
     * Get complete analysis for a random island
     * This function performs all necessary API calls in the correct order:
     * 1. Gets a random island code
     * 2. Gets island details and metadata
     * 3. Gets historical CCU data for the last 7 days
     * 4. Returns complete analysis package
     * @returns Complete island analysis with all data
     */
    async getRandomIslandAnalysis(): Promise<RandomIslandResult | null> {
        const MAX_IMAGE_SEARCH_RETRIES = 3;
        const DELAY_MS = 300;
        const attemptedIslandCodes: Set<string> = new Set();
        for (let attempt = 0; attempt < MAX_IMAGE_SEARCH_RETRIES; attempt++) {
            try {
                // Step 1: Get random island code
                const islandCode = this.getRandomIslandCode();

                // Step 2: Get island details
                const islandDetails = await this.get_island_details(islandCode);
                if (!islandDetails) {
                    continue; // Try a different island if details fetch fails
                } else {
                    // Add successfully fetched island code to attempted set
                    attemptedIslandCodes.add(islandCode);
                }



                // If no thumbnail was found, this island is not suitable, try another island
                if (!islandDetails.thumbnail_url) {
                    console.warn(`No thumbnail found for island ${islandCode}. Retrying with a different island.`);
                    await this.internal.delay(DELAY_MS);
                    continue;
                }

                // Step 3: Get historical data (7 days)
                const historicalData = await this.get_historical_data(islandCode, 7);

                // Step 4: Process historical data into summary
                const totalCcu7Days = historicalData.reduce((sum, day) => sum + day.ccu, 0);
                const daysWithData = historicalData.length;
                const averageDailyCcu = daysWithData > 0 ? totalCcu7Days / daysWithData : 0;

                const historicalSummary: HistoricalSummary = {
                    total_ccu_7days: totalCcu7Days,
                    daily_breakdown: historicalData,
                    days_with_data: daysWithData,
                    average_daily_ccu: averageDailyCcu
                };

                // Step 5: Return complete analysis
                return {
                    island: islandDetails,
                    historical_summary: historicalSummary,
                    timestamp: new Date().toISOString()
                };

            } catch (error) {
                console.error(`Attempt ${attempt + 1} failed in getRandomIslandAnalysis:`, error);
                if (attempt < MAX_IMAGE_SEARCH_RETRIES - 1) {
                    await this.internal.delay(DELAY_MS);
                } else {
                    console.error(`Failed to get island analysis after ${MAX_IMAGE_SEARCH_RETRIES} attempts.`);
                }
                // Continue loop to try another random island code
            }
        }

        // If all attempts fail
        return null;
    }
}

// =========================
// Earnings Estimation
// =========================
/**
 * Estimate earnings based on total CCU over a period using calibrated monetization rates.
 * @param totalCcu Total concurrent users over the period
 * @param days Number of days in the period (default: 7)
 * @returns Formatted string like "$1,200" or "$56,234"
 */
export function estimate_earnings(totalCcu: number, days: number = 7): string {
    const LOW_PER_AVGCCU_MONTH = 12.0;
    const HIGH_PER_AVGCCU_MONTH = 44.0;
    const LOW_PER_AVGCCU_DAY = LOW_PER_AVGCCU_MONTH / 30.0;
    const HIGH_PER_AVGCCU_DAY = HIGH_PER_AVGCCU_MONTH / 30.0;
    const avgCcuPerDay = days > 0 ? totalCcu / days : 0;
    const revLow = avgCcuPerDay * LOW_PER_AVGCCU_DAY * days;
    const revHigh = avgCcuPerDay * HIGH_PER_AVGCCU_DAY * days;
    const estimatedRevenue = (revLow + revHigh) / 2;
    if (estimatedRevenue >= 1000) {
        return `$${estimatedRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    } else {
        return `$${Math.round(estimatedRevenue)}`;
    }
}

// =========================
// (Other helpers and batch/report/test code omitted for production)
// =========================
