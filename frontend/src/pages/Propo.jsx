import React, { useState } from 'react'
import BottomNav from "../components/shared/BottomNav";
import PropoCard from "../components/propo/PropoCard";
import BackButton from "../components/shared/BackButton";
import { propoLPJ } from "../constants/index";

const Propo = () => {
  const [status, setStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filteredData = status === "All" 
    ? propoLPJ 
    : propoLPJ.filter((item) => item.status === status);

  // --- ADD THIS DEFINITION HERE ---
  const StatusButton = ({ label }) => (
    <button 
      onClick={() => setStatus(label)} 
      className={`text-sm md:text-lg transition-all duration-200 font-semibold px-5 py-2 rounded-lg ${
        status === label 
          ? "bg-[#383838] text-[#f5f5f5]" 
          : "text-[#ababab] hover:bg-[#2a2a2a]"
      }`}
    >
      {label}
    </button>
  );

  const handleEditClick = () => {
    const itemToEdit = propoLPJ.find(item => item.id === selectedId);
    setEditingItem(itemToEdit);
    setIsModalOpen(true);
  };

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden relative'>
      <div className='flex items-center justify-between px-10 py-6 mt-2'>
        <div>
          <BackButton />
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Proposal Tracking</h1>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center justify-around gap-2 bg-[#262626] p-1 rounded-xl'>
            <StatusButton label="All" />
            <StatusButton label="Under Process" />
            <StatusButton label="BEM/DPM" />
            <StatusButton label="Kaprodi/Binma" />
            <StatusButton label="Fakultas" />
          </div>

          <button 
            disabled={!selectedId}
            onClick={handleEditClick}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              selectedId 
                ? "bg-blue-600 text-white" 
                : "bg-[#262626] text-[#555] cursor-not-allowed"
            }`}
          >
            Edit
          </button>
        </div>
      </div>

      <div className='flex flex-wrap gap-6 items-start justify-center px-10 py-4 overflow-y-auto h-[calc(100vh-15rem)] scrollbar-hide'>
        {filteredData.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedId(item.id)}
            className={`transition-all duration-200 cursor-pointer rounded-xl ${
              selectedId === item.id ? "ring-2 ring-blue-500 bg-[#3a3a3a]" : ""
            }`}
          >
            <PropoCard item={item} />
          </div>
        ))}
      </div>

      {isModalOpen && (
  <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
    <div className="bg-[#262626] p-8 rounded-2xl w-[500px] border border-[#383838] shadow-2xl">
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold">Edit Submission</h2>
        <p className="text-[#777777] text-sm">ID: {editingItem?.id}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Name of Event */}
        <div className="col-span-2">
          <label className="text-[#ababab] text-xs uppercase font-bold mb-1 block">Event Name</label>
          <input 
            type="text" 
            defaultValue={editingItem?.namaAcara}
            className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg outline-none border border-[#383838] focus:border-blue-500 transition-all"
          />
        </div>

        {/* PIC */}
        <div>
          <label className="text-[#ababab] text-xs uppercase font-bold mb-1 block">PIC</label>
          <input 
            type="text" 
            defaultValue={editingItem?.pic}
            className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg outline-none border border-[#383838]"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="text-[#ababab] text-xs uppercase font-bold mb-1 block">Budget</label>
          <input 
            type="text" 
            defaultValue={editingItem?.budget}
            className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg outline-none border border-[#383838]"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="text-[#ababab] text-xs uppercase font-bold mb-1 block">Status</label>
          <select 
            defaultValue={editingItem?.status}
            className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg outline-none border border-[#383838] appearance-none"
          >
            <option value="Under Process">Under Process</option>
            <option value="BEM/DPM">BEM/DPM</option>
            <option value="Kaprodi/Binma">Kaprodi/Binma</option>
            <option value="Fakultas">Fakultas</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="text-[#ababab] text-xs uppercase font-bold mb-1 block">Type</label>
          <select 
            defaultValue={editingItem?.tipe}
            className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg outline-none border border-[#383838] appearance-none"
          >
            <option value="PROPOSAL">PROPOSAL</option>
            <option value="LPJ">LPJ</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="px-4 py-2 text-[#777] hover:text-white transition-colors font-semibold"
        >
          Cancel
        </button>
        <button 
          onClick={() => {
            // Logic for saving would go here
            setIsModalOpen(false);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-bold transition-all shadow-lg shadow-blue-900/20"
        >
          Update Data
        </button>
      </div>
    </div>
  </div>
)}

      <BottomNav />
    </section>
  )
}

export default Propo