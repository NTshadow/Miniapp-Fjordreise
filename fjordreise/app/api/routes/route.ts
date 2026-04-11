import { NextRequest, NextResponse } from "next/server";
import routesData from "../../../data/routes.json";

export type Route = {
    id: string;
    from: string;
    to: string;
    schedule: ("weekday" | "weekend")[];
    departure: string;
    arrival: string;
    durationMinutes: number;
    priceNOK: number;
    operator: string;
};

function getSchedule(dateString: string): "weekday" | "weekend" { 
    const day = new Date(dateString).getDay();
    return (day === 0 || day === 6) ? "weekend" : "weekday";
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    if (!from || !to || !date) {
        return NextResponse.json(
            { message: "Missing required query parameters: from, to, date is required" },
            { status: 400 }
        );
    }

    const fromString = from.toLowerCase().trim();
    const toString = to.toLowerCase().trim();
    const schedule = getSchedule(date);

    const results = (routesData as Route[]).filter(
        (route) => 
            route.from.toLowerCase() === fromString &&
            route.to.toLowerCase() === toString &&
            route.schedule.includes(schedule)
    );

    results.sort((a, b) => a.departure.localeCompare(b.departure));

    return NextResponse.json(results);
}