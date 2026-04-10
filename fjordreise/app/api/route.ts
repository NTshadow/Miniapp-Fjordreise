import type { NextApiRequest, NextApiResponse } from "next";
import routesData from "../../data/routes.json";

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

type ErrorResponse = {
    message: string;
};

function getSchedule(dateString: string): "weekday" | "weekend" { 
    const day = new Date(dateString).getDay();
    return (day === 0 || day === 6) ? "weekend" : "weekday";
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Route[] | ErrorResponse>
) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    const {from, to, date } = req.query;

    if(!from || !to || !date) {
        res.status(400).json({ message: "Missing required query parameters: from, to, date is required" });
        return;
    }

    const fromString = (from as string).toLowerCase().trim();
    const toString = (to as string).toLowerCase().trim();
    const schedule = getSchedule(date as string);

    const results = (routesData as Route[]).filter(
        (route) => 
            route.from.toLowerCase() === fromString &&
            route.to.toLowerCase() === toString &&
            route.schedule.includes(schedule)
    );

    results.sort((a, b) => a.departure.localeCompare(b.departure));

    res.status(200).json(results);
}