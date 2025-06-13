



import React from "react";

async function getData() {
  const res = await fetch("http://localhost:5000/clients");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Welcome to AdGency!</h1>
      <p className="mt-2 text-lg">We create impactful ad campaigns.</p>

      <h2 className="text-2xl font-bold mt-6">Client Data</h2>
      <ul className="mt-2">
        {data.map((client) => (
          <li key={client.id} className="p-2 border-b">{client.name}</li>
        ))}
      </ul>
    </div>
  );
}