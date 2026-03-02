"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
    FortniteAPI,
    RandomIslandResult,
    estimate_earnings,
} from "@/lib/fortnite-api";

export default function EarningsEstimator() {
    const [islandData, setIslandData] = useState<RandomIslandResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const api = new FortniteAPI();

    const handleFindAnother = async () => {
        setIsLoading(true);
        setError(null);
        setIslandData(null);

        try {
            // Single API call that handles everything
            const analysis = await api.getRandomIslandAnalysis();

            if (!analysis) {
                console.error('Failed to get island analysis: Analysis object is null or undefined.');
                setError('Failed to fetch island data. Please try again.');
            }

            setIslandData(analysis);
            // console.log("Fetched island data:", analysis); // REMOVED FOR PRODUCTION

        } catch (error) {
            console.error("Error fetching island data:", error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            setIslandData(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Check if page is fully loaded
    useEffect(() => {
        const checkPageLoaded = () => {
            if (document.readyState === 'complete') {
                setIsPageLoaded(true);
            } else {
                window.addEventListener('load', () => setIsPageLoaded(true));
            }
        };

        checkPageLoaded();

        return () => {
            window.removeEventListener('load', () => setIsPageLoaded(true));
        };
    }, []);

    // Call handleFindAnother when the page is fully loaded
    useEffect(() => {
        if (isPageLoaded) {
            handleFindAnother();
        }
    }, [isPageLoaded]);

    return (
        <section className="py-12 md:py-24 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-6">
                    See What Other Creators Are Earning
                </h3>

                {!isPageLoaded && (
                    <div className="text-center text-lg">Page loading...</div>
                )}

                {isPageLoaded && isLoading && (
                    <div className="text-center text-lg">Loading island data...</div>
                )}

                {error && (
                    <div className="text-center text-lg text-red-500">Error: {error}</div>
                )}

                {isPageLoaded && !islandData && !isLoading && !error && (
                    <div className="text-center text-lg">
                        Click the button to fetch earnings estimates for a random top island.
                    </div>
                )}

                {islandData && (
                    <div className="relative border-2 border-yellow-500 rounded-lg p-6 grid md:grid-cols-2 gap-6 bg-white/10 backdrop-blur-sm overflow-hidden shadow-lg shadow-yellow-500/50">
                        <div className="aspect-video rounded-md overflow-hidden">
                            {islandData.island.thumbnail_url ? (
                                <img
                                    src={islandData.island.thumbnail_url}
                                    alt={`${islandData.island.name} Thumbnail`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                    <span className="text-gray-400">No thumbnail available</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">{islandData.island.name}</h4>
                            <p className="text-sm text-muted-foreground mb-4">By {islandData.island.creator_name}</p>
                            {/* Display historical data if available */}
                            {islandData.historical_summary && islandData.historical_summary.days_with_data > 0 ? (
                                <>
                                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs inline-block mb-2">The Last 7 Days</span>

                                    <div className="text-lg font-semibold text-white/80 mb-2">
                                        Average Players: {islandData.historical_summary.average_daily_ccu.toLocaleString(undefined, { maximumFractionDigits: 0 })} {/* Keep the same data */}
                                    </div>
                                    {/* Apply gold text color and potentially a text shadow */}
                                    <div className="text-lg font-bold text-[#FFD447] drop-shadow-[0_0_5px_rgba(255,212,71,0.5)]">
                                        Estimated Revenue: {estimate_earnings(islandData.historical_summary.total_ccu_7days)}
                                    </div>
                                    {/* Add "Realtime Fortnite statistics" label */}
                                    {/* Style with muted text color and a smaller font size */}
                                    <div className="text-sm text-gray-400 mt-2 italic">Realtime Fortnite statistics</div>


                                </>
                            ) : (
                                <p className="text-sm text-gray-500 mt-4">Historical data not available for this island.</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <Button
                        size="lg"
                        className="font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleFindAnother}
                        disabled={isLoading || !isPageLoaded}
                    >
                        {!isPageLoaded ? "Page Loading..." : (isLoading ? "Loading..." : (islandData ? "Find another island" : "How Much Can I Earn?"))}
                    </Button>
                </div>
            </div>
        </section>
    );
}
