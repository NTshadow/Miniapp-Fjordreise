"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import type { Route } from "../api/routes/route";    
import { formatDuration } from "../utils/formatDuration";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("no-NO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Summary() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    const date = searchParams.get("date");

    if (!data ) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <p className="text-lg font-medium">Ingen reise valgt</p>
                    <button 
                        onClick={() => router.push("/")}
                        className="mt-4 text-blue-500 text-sm underline"
                    >
                        Tilbake til søk
                    </button>
                </div>
            </main>
        );
    }


    let route: Route;
    try {
        route = JSON.parse(data as string);
    } catch (error) {
        console.error("Failed to parse route data:", error);
        return null;
    }

    const [bookingRef] = useState(() => `FJ-${route.id}-${Date.now().toString().slice(-4)}`);

    return (
        <main className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-100 px-4 py-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-2xl text-red-700 tracking-tight ">Fjordreise</h1>
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
                <div className="text-center py-4">
                    <h2 className="text-2xl font-bold text-gray-900">Din reise:</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Bestillingsreferanse:{" "}
                        <span className="font-mono font-semibold text-gray-600">{bookingRef}</span>
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="bg-[#D96666] px-6 py-4">
                        <p className="text-black text-xs font-semibold uppercase tracking-wide">Din reise</p>
                        <p className="text-white text-xl font-bold mt-1">
                            {route.from} → {route.to}
                        </p>
                        {date && (
                            <p className="text-black text-sm mt-0.5 capitalize">
                                {formatDate(date as string)}
                            </p>
                        )}
                    </div>

                    <div className="px-6 py-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Avgang</p>
                                <p className="text-3xl font-bold text-gray-900">{route.departure}</p>
                                <p className="text-sm text-gray-500">{route.from}</p>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-xs text-gray-400">{formatDuration(route.durationMinutes)}</p>
                                <div className="flex items-center gap-1">
                                    <div className="w-12 h-px bg-gray-200" />
                                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                                    <div className="w-12 h-px bg-gray-200" />
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Ankomst</p>
                                <p className="text-3xl font-bold text-gray-900">{route.arrival}</p>
                                <p className="text-sm text-gray-500">{route.to}</p>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="grid grid-cols-2 gap-40 text-sm">
                            <div>
                                <p className="text-gray-400 text-xs">Operatør</p>
                                <p className="font-medium text-gray-700">{route.operator}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">Varighet</p>
                                <p className="font-medium text-gray-700">{formatDuration(route.durationMinutes)}</p>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-700">Totalpris</p>
                            <p className="text-3xl font-bold text-[#B93B27]">{route.priceNOK} kr</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => router.push("/")}
                    className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-medium py-3 rounded-xl text-sm transition-colors"
                >
                    ← Søk etter ny reise
                </button>
            </div>
        </main>
    );
}
