import React from 'react'
import BottomNav from "../components/shared/BottomNav";
import PropoCard from "../components/propo/PropoCard";
import BackButton from "../components/shared/BackButton";
import { propoLPJ } from "../constants/index";

const Propo = () => {
  // Set initial state to "All"
  const [status, setStatus] = React.useState("All");

  // Logic: If status is "All", show everything. Otherwise, filter by status.
  const filteredData = status === "All" 
    ? propoLPJ 
    : propoLPJ.filter((item) => item.status === status);

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

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden'>
      <div className='flex items-center justify-between px-10 py-6 mt-2'>
        <div>
          <BackButton />
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Proposal Tracking</h1>
          <p className='text-[#777777] text-sm'>Showing: {status}</p>
        </div>

        <div className='flex items-center justify-around gap-2 bg-[#262626] p-1 rounded-xl'>
          <StatusButton label="All" />
          <StatusButton label="Under Process" />
          <StatusButton label="BEM/DPM" />
          <StatusButton label="Kaprodi/Binma" />
          <StatusButton label="Fakultas" />
        </div>
      </div>

      <div className='flex flex-wrap gap-6 items-start justify-center px-10 py-4 scrollbar-hide overflow-y-auto h-[calc(100vh-15rem)]'>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <PropoCard key={item.id} item={item} />
          ))
        ) : (
          <div className="mt-20">
             <p className='text-[#777777] text-lg italic'>No proposals found in this category.</p>
          </div>
        )}
      </div>
      
      <BottomNav />
    </section>
  )
}

export default Propo