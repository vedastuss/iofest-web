import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const Budget = () => {
  const [data, setData] = useState(moneyData);

  const [sortKey, setSortKey] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all ");
  const [search, setSearch] = useState("");

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const toggleStatus = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "bayar" ? "belum dibayar" : "bayar",
            }
          : item
      )
    );
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    if (filterStatus !== "all") {
      result = result.filter((item) => item.status === filterStatus);
    }

    if (search) {
      result = result.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, sortKey, sortAsc, filterStatus, search]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-2">
            <button onClick={() => setFilterStatus("all")} className="px-3 py-1 bg-gray-200 rounded">
              All
            </button>
            <button onClick={() => setFilterStatus("bayar")} className="px-3 py-1 bg-green-200 rounded">
              Bayar
            </button>
            <button onClick={() => setFilterStatus("belum dibayar")} className="px-3 py-1 bg-red-200 rounded">
              Belum
            </button>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search nama..."
              className="border px-3 py-1 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              + New Entry
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead className="[&>tr>th]:text-center bg-gray-200">
            <tr>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("id")}>ID</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("petugas")}>Petugas</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("nama")}>Nama</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("bagian")}>Bagian</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("total")}>Total</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("kembalian")}>Kembalian</th>
              <th className="p-2 cursor-pointer" onClick={() => handleSort("status")}>Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t text-center">
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.petugas}</td>
                <td className="p-2">{item.nama}</td>

                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      item.bagian === "internal"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                  >
                    {item.bagian}
                  </span>
                </td>

                <td className="p-2 font-semibold text-green-600">
                  Rp {item.total.toLocaleString()}
                </td>

                <td className="p-2 font-semibold text-red-600">
                  Rp {item.kembalian.toLocaleString()}
                </td>

                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      item.status === "bayar"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-2">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No data found
          </div>
        )}
      </div>
    </div>
  );

};

export default Budget;
