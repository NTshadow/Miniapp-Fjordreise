type SearchFormProps = {
    onSearch: (from: string, to: string, date: string) => void;
    loading: boolean;
};

const PORTS = ["Bergen", "Stavanger", "Hirtshals"];

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const from = formData.get("from") as string;
        const to = formData.get("to") as string;
        const date = formData.get("date") as string;

        if (from === to) {
            alert("Avreise- og destinasjonssted kan ikke være det samme.");
            return;
        }

        onSearch(from, to, date);
    };

    const today = new Date().toISOString().split("T")[0];  

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"> 

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <label  className="text-sm font-medium text-gray-700">Fra</label>
                    <select 
                        name="from"
                        required
                        defaultValue="Bergen"
                         className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"   
                    >
                        {PORTS.map((port) => (      
                            <option key={port} value={port}>
                                {port}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-700">Til</label>
                    <select
                        name="to"
                        required
                        defaultValue="Stavanger"
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {PORTS.map((port) => (
                            <option key={port} value={port}>
                                {port}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-700">Dato</label>
                    <input
                        type="date"
                        name="date"
                        required
                        min={today}
                        //defaultValue={today} vet ikke om jeg trenger den
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>  

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {loading ? "Laster..." : "Søk"}
            </button>

        </form>
    )
}