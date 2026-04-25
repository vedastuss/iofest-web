import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentUpdate from "../components/home/RecentUpdate";
import PopularItems from "../components/home/PopularItems";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

const Home = () => {
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex">
      {/* Left Div */}
      <div className="flex-[3] bg-[#44444e]">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard title="Kas Organisasi" icon={<BsCashCoin />} number={512000} />
          <MiniCard title="Proposal dan LPJ dalam proses" icon={<GrInProgress />} number={16}  />
        </div>
        <RecentUpdate />
      </div>
      {/* Right Div */}
      <div className="flex-[2] bg-[#44444e]">
        <PopularItems />
      </div>
      
      <BottomNav />
    </section>
  )
};
export default Home;
