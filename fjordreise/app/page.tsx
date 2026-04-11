"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "./api/routes/route";
import SearchForm from "./components/searchForms";
import Results from "./components/results"; 


export default function Home() {    
    const router = useRouter();
    const [routes, setRoutes] = useState<Route[]>([]);
    const [selected, setSelected] = useState<Route | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);    
    const [searched, setSearched] = useState(false);
    const [date, setDate] = useState<string>("");

    const handleSearch = async (from: string, to: string, date: string) => {
        setDate(date);
        setLoading(true);
        setError(null);
        setSelected(null);
        setSearched(false);


        try {
            const params = new URLSearchParams({ from, to, date });
            const res = await fetch(
                `/api/routes?${params}`
            );

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to fetch routes");
            }
            const data: Route[] = await res.json();
            setRoutes(data);
            setSearched(true);
        } catch (error) {
            setError("Failed to fetch routes");
        } finally {
            setLoading(false);
        }
    };

    const handleCountinue = () => {
        if (!selected) return;
        const params = new URLSearchParams({ id: selected.id, data: JSON.stringify(selected), date: date });
        router.push(`/summary?${params}`);
    };

    return (
        <main className="min-h-screen ">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl pt-5 text-[#B91C1C] tracking-tight ">Fjordreise</h1>
                </div>
            

            <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
                <SearchForm onSearch={handleSearch} loading={loading}/>

                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                <Results
                    routes={routes}
                    selectedId={selected?.id || null}
                    onSelectRoute={setSelected}
                    searched={searched}
                    searchDate={date}
                />

                {selected && (
                    <div className="bottom-4">
                        <button
                            onClick={handleCountinue}
                            className="w-full bg-[#B93B27] hover:bg-[#D96666] text-white font-semibold py-3.5 rounded-xl shadow-lg transition-colors text-sm"     
                        >
                            Gå videre
                        </button>

                    </div> 
                )}
            </div>
        </main>
    );
}
