import type { Route } from "../api/route";
import RouteCards from "./routeCards";

type ResultsProps = {
  routes: Route[];
  selectedId: string | null;
  onSelectRoute: (route: Route) => void;
  searched: boolean;
};

export default function Results({ routes, selectedId, onSelectRoute, searched }: ResultsProps ) {
    if (!searched) return null;

    if (routes.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-3">⚓︎</div>
                <p className="font-medium text-gray-500">ingen avganger funnet</p>
                <p className="text-sm mt-1">prøv en annen dato eller rute</p>
            </div>
        );
    }

    return ( 
        <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-500"> 
                {routes.length} avganger funnet
            </p>
            {routes.map((route) => (
                <RouteCards 
                key={route.id} 
                route={route} 
                selected={selectedId == route.id} 
                onSelect={onSelectRoute} 
                />
            ))}
        </div>
    );
}