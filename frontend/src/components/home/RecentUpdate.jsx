import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecentUpdate = () => {
  return (
    <div className="px-6 mt-6">
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Update
          </h1>
          <Link to="/orders" className="text-[#025cca] text-sm font-semibold">
            View all
          </Link>
        </div>

        {/* Search */}
        <div className="mx-6 mb-4 flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
          />
        </div>

        {/* Empty List Container */}
        <div className="mt-4 px-6 overflow-y-auto h-[300px] flex items-center justify-center">
          <p className="text-gray-500">No updates available</p>
        </div>
      </div>
    </div>
  );
};

export default RecentUpdate;