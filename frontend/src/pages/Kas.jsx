import React, { useState, useMemo } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { moneyData } from "../constants/index";

const Kas = () => {
  const [data, setData] = useState(moneyData);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [filterAktivitas, setFilterAktivitas] = useState("All");

  // ✅ NEW: selection state
  const [selectedIds, setSelectedIds] = useState([]);

  // sorting
  const handleSort = (key) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // toggle aktivitas
  const toggleAktivitas = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              aktivitas:
                item.aktivitas === "Pemasukan"
                  ? "Penarikan"
                  : "Pemasukan",
            }
          : item
      )
    );
  };

  // filter + search + sort
  const filteredData = useMemo(() => {
    let result = [...data];

    if (filterAktivitas !== "All") {
      result = result.filter(
        (item) => item.aktivitas === filterAktivitas
      );
    }

    if (search) {
      result = result.filter((item) =>
        item.penanggungJawab
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, search, sortKey, sortAsc, filterAktivitas]);

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-6 mt-2">
        <div>
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Money Tracking
          </h1>
          <p className="text-[#777777] text-sm">
            Showing: {filterAktivitas}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-10 py-4 overflow-y-auto h-[calc(100vh-15rem)]">
        <div className="bg-[#262626] rounded-xl p-6 shadow">

          {/* Tabs */}
          <div className="border-b border-[#2a2a2a] mb-4">
            <div className="flex gap-6">
              {["All", "Pemasukan", "Penarikan"].map((label) => (
                <button
                  key={label}
                  onClick={() => setFilterAktivitas(label)}
                  className={`relative pb-2 text-sm font-semibold ${
                    filterAktivitas === label
                      ? "text-[#025cca]"
                      : "text-[#ababab] hover:text-[#f5f5f5]"
                  }`}
                >
                  {label}
                  {filterAktivitas === label && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#025cca]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-[#2a2a2a] text-[#f5f5f5] px-3 py-1.5 rounded-3xl text-sm hover:bg-[#333] transition">
                <img className="w-4 h-4 object-contain" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACiUlEQVRYR+2YTWjTYBjH8y6lLWW6zIFMNz148bCLUPw4Sdo3bPQi8yp6EUEErwNPfuBB2c2LF9lpB08edthhMx9lnSCCIngUL+pQUJucxlJKHv8Jaclm0iXIW8Mw0KZv3uR9fvk//+dpWiblbGM545HyDWRrGv0LxcZ1vS/MLoX+A4XpSFQomq6oWtEL/ialadZMNHWai7PCpVnz4AHhru9DqXuhWg+QXn8cuwlXiBqNkt3pPGGM3fQJGNHTMcO4Ddlj24cwIKpWK7aiLAHkMjhKUTmIaAtA18YNw9orkxAgmpkpOpOTmxJjZxNNTdRlnndBsay3WSs3s6nbmvYIF90JAkEOvL/H2xscK2A/B9WmwzkTKnHxQJx/RdCpwDOeN6eY5novKKnqqFMo/MK4iJer6HoFoF5vXkjKsOhOzzcF1z16qNX6kbYfCQFCyl7jrs8HGZOkz9htYvwxTJMne55x2LJexUEKAbJrtUuSLK8MUgWgH2RJWhjT9TXhHvID2JzPI+hjeOn0PumqoVE2hXqob2B42uFcRflf9P0dOX4dgxNhCl+i0maHApSkjKNpp6Dep3C+DYUmhAIhXTZUUcIg8wi4y09OvT5LIyOBdwD27YiuHxcNtAygq32FiFr4/A7By/BUFc2yivkghTj2HEBXhAKh7E8igF/6xwYamuhniehMxTS3hAL5i2+r6rQryy+gxLk4KCizWux2b4w2m9+HUva9INv1+tQOY8+QoUaYotVyp3OrsrHxJQ5USGPcGyhXD2j7NMU/poeiUBaogwuURYW05yb91hv0xOhicf9BS8TmAqgct3AiUJvzRZTzgggadPOH+NK9mwlICEiKRfP9/1CKGxB+ym829oo0P9rC1AAAAABJRU5ErkJggg=="/>
                <span>Tandai sebagai Penarikan</span>
              </button>

              <button className="flex items-center gap-2 bg-[#2a2a2a] text-[#f5f5f5] px-3 py-1.5 rounded-3xl text-sm hover:bg-[#333] transition">
                <img className="w-4 h-4 object-contain" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABv0lEQVRYR+2YwU7CQBCGZxejJl69EE2EvoAXE0PLQXkD48mI9cxT+BAevSBoPGh4CQoSY7yqF8CEEA7KwZBoUDoOAqaFlm1DlRq6x+3Mzrf/7kxmy8Bng/mMBwIg0YlYKrRS2l+d74S2ADDCgM2JFnH6XUdstBc/r+obF892PiNAkeLhHtP1E8bYktNAbuwQoYGcb1fl9IOVnwkomk+uA+d3NMndBHFriwDXFSUjC4EkTc3RNd/pGpJTExmecmSvbgOOsT/qfcN2WckuCIGi2kGdjir87cJgsyJnbjyEAamg0j57o6xkLO+vadLooGMnVo2fl3wDRFt5IZ3SlGUtD6H6RwZAGZeyyjhbhTyEsF2qm3F6CBNPsez9wGiqQP3kMWXc1IGGM84HQOaMC4CsbrixJs2eQsbdGwuvUak/VSgAElX0QKF/p5AIeLg3mr06NJFC1MK2fuu1MQ7MvjBqqkZNvuJkV97ZmBt+8x3S1DgB5b0L5mQlLNIL5EeEkc5fKiRTiOyYji7kZLlJbKiFrVN3najEzx4tW9jB5NptMszf+S5jsDxJwHG+BFP74G+5mnzZNNoFfz9EigcKiRT6AoXf2SXpME1SAAAAAElFTkSuQmCC"/>
                <span>Tandai sebagai Pemasukan</span>
              </button>

              <button className="flex items-center gap-2 bg-[#2a2a2a] text-[#f5f5f5] px-3 py-1.5 rounded-3xl text-sm hover:bg-[#333] transition">
                <img className="w-4 h-4 object-contain" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABXklEQVRYR2NkGGSAcZC5h2FoOug/EFAjJBmBgJA5BBWADBh1EKFgRA4hYoId2TxS9ZIcZaMOwhZ9pAY71aMM6ABZoKH2QKwAxCxAXI9kSSOhNIcmj673D1D+ARAfAEb/E3SzMNIQ0DHRQEUzgJiHRItJVf4ZqCEZ6KjVyBpRHAR0jAFQ8gwQM5NqOpnqQaGlA3TUTZh+dAdtBkr4kGk4udpWAh0UgctBz4ESEuSaTKa+J0AHgdIsGKCHEFXqLKjZjUCLGtAdCUwWIDHkhM6AXLaNOmggQ4joJEWvKBt1ENEhQEjhaJTRNIQoaaDhchi+KPsJ1MSGz0c0cNAvoJnsuKqOU0AJUzo76BjQQda4HKQDlNiNr4Klcgg9A9rlhLP5AXIlsGgXBVKhQCyGFFLwypBCByG3NkGtxXVA894hx8jQ73UQysKUpj+SQ2jUQZSEADX0EhVl1LCIWDMGnYMA9prBJX6gypUAAAAASUVORK5CYII="/>
                <span>Print</span>
              </button>

              <button className="flex items-center gap-2 bg-[#2a2a2a] text-[#f5f5f5] px-3 py-1.5 rounded-3xl text-sm hover:bg-[#333] transition">
                <img className="w-4 h-4 object-contain" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABOElEQVRYR2NkGGSAcZC5h2HoO+j////8wFA9CcTqBEL3JlDehJGR8QspsUBSCAEdwwQ0fAsQexJpyXagOm+go/4TqZ60KAM6qANocDmxhkPVtQIdVEOsHowQAlraANRcT6wBFKprBDoWZB8cjDoILUQJhxCFUUCxdry5DJieHIA2gDA1wQFgujmAy0BCDqJFAseIJryJGlmSRjlu1EGE0ht1QwiYIOHpDhilWKsEAmpGHcQwGkKwVDuahrAVjKO5jFDVMRpCoyGEVvOR3B4adGkI6KFGJE/h6p3gU0PdypVQ24IIeYoclAG0YDoRlpCiJB0Y7bPIbVPLADVeBmIBUmzEo/YVUM4Q6KBnZDkIpAlYfagAqblAbAXELGQ67BdQ3xEgTgE65j4+M0gabCDTMSRpG3UQoeACAOz4ADRv5KskAAAAAElFTkSuQmCC"/>
                <span>Delete</span>
              </button>
            </div>

            <input
              type="text"
              placeholder="Search penanggung jawab..."
              className="bg-[#2a2a2a] text-[#f5f5f5] placeholder-[#777777] px-3 py-1.5 rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-fixed w-full min-w-[1100px] text-sm">
              
              <thead className="text-[#ababab] border-b border-[#2a2a2a]">
                <tr>
                  <th className="w-[40px] p-3">
                    <input
                      type="checkbox"
                      className="accent-[#025cca]"
                      checked={
                        selectedIds.length === filteredData.length &&
                        filteredData.length > 0
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(filteredData.map((i) => i.id));
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </th>

                  <th className="w-[60px] p-3 cursor-pointer" onClick={() => handleSort("id")}>ID</th>
                  <th className="w-[180px] p-3 cursor-pointer" onClick={() => handleSort("penanggungJawab")}>Penanggung Jawab</th>
                  <th className="w-[160px] p-3 cursor-pointer" onClick={() => handleSort("aktivitas")}>Aktivitas</th>
                  <th className="w-[140px] p-3 cursor-pointer" onClick={() => handleSort("total")}>Total</th>
                  <th className="w-[140px] p-3 cursor-pointer" onClick={() => handleSort("tanggal")}>Tanggal</th>
                  <th className="w-[220px] p-3 cursor-pointer" onClick={() => handleSort("keterangan")}>Keterangan</th>
                  <th className="w-[100px] p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/70"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        className="accent-[#025cca]"
                        checked={selectedIds.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds((prev) => [...prev, item.id]);
                          } else {
                            setSelectedIds((prev) =>
                              prev.filter((id) => id !== item.id)
                            );
                          }
                        }}
                      />
                    </td>

                    <td className="p-3 text-[#f5f5f5] truncate">{item.id}</td>
                    <td className="p-3 text-[#f5f5f5] truncate">{item.penanggungJawab}</td>

                    <td
                      className="p-3 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                      onClick={() => toggleAktivitas(item.id)}
                    >
                      <span
                        className={`inline-block w-[120px] px-2 py-1 rounded text-xs ${
                          item.aktivitas === "Pemasukan"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.aktivitas}
                      </span>
                    </td>

                    <td className="p-3 text-[#f5f5f5]">
                      Rp {item.total.toLocaleString()}
                    </td>

                    <td className="p-3 text-[#f5f5f5]">{item.tanggal}</td>
                    <td className="p-3 text-[#ababab] truncate">{item.keterangan}</td>

                    <td className="p-3">
                      <button className="text-[#ababab] hover:text-[#f5f5f5] text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-6 text-[#777777] italic">
              No data found
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </section>
  );
};

export default Kas;