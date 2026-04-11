export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}t ${m}min` : `${h}t`;
}

export function getArrivalDate(searchDate: string, departure: string, arrival: string): string | null {
    if (arrival < departure) {
        const date = new Date(searchDate);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString("no-NO", {
            month: "long",
            day: "numeric",
        });
    }
    return null;
}