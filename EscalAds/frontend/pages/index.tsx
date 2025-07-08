import { useState, useEffect } from "react";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/campaigns")
      .then(res => res.json())
      .then(data => setCampaigns(data));
  }, []);

  const handleGenerateCopy = async () => {
    const res = await fetch("http://localhost:3001/api/generate-copy", { method: "POST" });
    const data = await res.json();
    setNotification(data.copy);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">📈 EscalAds - Panel de Campañas Automatizadas</h1>

      <button onClick={handleGenerateCopy} className="bg-pink-600 px-4 py-2 rounded">
        ✨ Generar Copy con IA
      </button>

      {notification && <p className="mt-4 text-green-400">{notification}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {campaigns.map(c => (
          <div key={c.id} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p>ROAS: {c.roas} | CPM: ${c.cpm}</p>
            <button className="mt-2 text-sm underline text-red-400">⏸ Pausar</button>
          </div>
        ))}
      </div>
    </main>
  );
}
