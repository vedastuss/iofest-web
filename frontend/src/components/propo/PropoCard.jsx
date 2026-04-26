import React from 'react';
import { FaHistory, FaUser, FaLayerGroup } from 'react-icons/fa';

// Accept 'item' as a prop
const ProposalCard = ({ item }) => {
  if (!item) return null; // Safety check

  return (
    <div className='w-[400px] bg-[#262626] p-5 rounded-lg mb-4 border border-[#333333]'>
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-4'>
          <div className='p-3 rounded-lg text-xl font-bold bg-[#333333] text-[#f5f5f5] border border-[#444444]'>
            {item.tipe === "LPJ" ? "LJ" : "PR"}
          </div>
          <div>
            <h1 className='text-[#f5f5f5] text-lg font-bold leading-tight'>
              {item.namaAcara}
            </h1>
            <p className='text-[#ababab] text-xs font-mono mt-1'>{item.id}</p>
          </div>
        </div>
        
        <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider 
          ${item.status === "Fakultas" ? "bg-green-900 text-green-300" : "bg-blue-900 text-blue-300"}`}>
          {item.status}
        </span>
      </div>

      <div className='grid grid-cols-2 gap-y-3 mb-4'>
        <div className='flex items-center gap-2 text-[#ababab]'>
          <FaUser size={12} />
          <span className='text-sm'>{item.pic}</span>
        </div>
        <div className='flex items-center gap-2 text-[#ababab]'>
          <FaLayerGroup size={12} />
          <span className='text-sm'>{item.tipe}</span>
        </div>
      </div>

      <hr className="border-t border-[#333333] mb-4" />

      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 text-[#777777]'>
          <FaHistory size={12} />
          <span className='text-xs'>{item.lastUpdated}</span>
        </div>
        <p className="text-[#f5f5f5] font-semibold text-sm">
          {item.budget}
        </p>
      </div>
    </div>
  );
};

export default ProposalCard;