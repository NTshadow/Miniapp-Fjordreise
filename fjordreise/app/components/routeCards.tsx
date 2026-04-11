import type { Route } from "../api/routes/route";
import { formatDuration, getArrivalDate } from "../utils/formatDuration";

type RouteCardsProps = {
  route: Route;
  selected: boolean;
  onSelect: (route: Route) => void;
  searchDate: string;
};  

export default function RouteCards({ route, selected, onSelect, searchDate }: RouteCardsProps) {   

    const arrivalDate = getArrivalDate(searchDate, route.departure, route.arrival);

    return (
        <div
        onClick={() => onSelect(route)}
        className={`
            rounded-xl border p-4 transition-all cursor-pointer bg-white hover:shadow-md
            ${selected ? "border-blue-500 ring-2 ring-blue-200 shadow-md" : "border-gray-200"}<
        `}
        >
        <div className="flex items-center justify-between gap-4"> 
            <div className="flex items-center gap-3 min-w-0">
                <div className="text-center">
                    <div className="text-xs text-gray-400">{route.from} {"-"} {route.to}</div>
                        <div className="text-xl font-bold text-gray-900">
                            {route.departure} {"-"} {route.arrival}
                            {arrivalDate && (
                                <span className="text-xs text-gray-400 font-normal ml-1">
                                    +1 ({arrivalDate})
                                </span>
                            )}
                        </div>
                </div>
                
                <div className="flex flex-col items-center gap-0.5 px-2">
                    <div className="text-xs text-gray-400">{formatDuration(route.durationMinutes)}</div>
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-px bg-gray-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <div className="w-8 h-px bg-gray-300" />
                    </div>
                    <div className="text-xs text-gray-400">{route.operator}</div>
                </div>
                
            </div>
            
            <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="text-2xl font-bold text-blue-600">{route.priceNOK} kr</div>
                </div>
            </div>
            
            {selected && (
                <div className="mt-3 pt-3 border-t border-blue-100 text-xs font-semibold text-blue-600 text-center"> trykk «Gå videre» for å bekrefte </div>
            )}
        </div>
    );
}
