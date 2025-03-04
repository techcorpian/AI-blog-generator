import React, { useContext, useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import { FaFilter } from "react-icons/fa";
import { BlogContext } from '../context/BlogContext';

const FilterBar: React.FC = () => {
    const { quickFilter, searchType, searchTerm, fromDate, toDate, setQuickFilter, setSearchType, setSearchTerm, setFromDate, setToDate, handleQuickFilter } =
    useContext(BlogContext) ?? {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return () => {
        document.body.style.overflow = "auto";
    };
}, [isModalOpen]);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex justify-between items-center mb-4 mt-9">
        <div className="text-3xl font-bold pb-4"></div>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0">
            {/* Quick Filters Dropdown */}
            <select
              value={quickFilter}
              onChange={(e) => handleQuickFilter && handleQuickFilter(e.target.value)}
              className="p-2 px-4 border-l border-y bg-white border-neutral-400 text-black rounded-l-full md:rounded-r-none rounded-full focus:outline-none md:border-r-0 border-r"
            >
              <option value="">Select Date Filter</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
            </select>

            <div className="flex items-center bg-white rounded-full md:rounded-l-none md:rounded-r-full w-full">
              {/* From Date */}
              <input
                type="date"
                value={fromDate}
                placeholder="From Date"
                onChange={(e) => setFromDate && setFromDate(e.target.value)}
                className="p-2 border-l border-y border-neutral-400 focus:outline-none"
              />

              {/* To Date */}
              <input
                type="date"
                value={toDate}
                placeholder="To Date"
                onChange={(e) => setToDate && setToDate(e.target.value)}
                className="p-2 pr-4 border-r border-y border-neutral-400 focus:outline-none rounded-r-full"
              />
            </div>
          </div>

          <div className="flex bg-white rounded-full">
            {/* Search Type Dropdown */}
            <select
              value={searchType}
              onChange={(e) => setSearchType && setSearchType(e.target.value)}
              className="p-2 pl-4 border-l border-y border-neutral-400 text-black rounded-l-full focus:outline-none"
            >
              <option value="title">Search by Title</option>
              <option value="user">Search by User</option>
              <option value="category">Search by Category</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder={`Search by ${(searchType || 'title').charAt(0).toUpperCase() + (searchType || 'title').slice(1)}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              className="p-2 pr-4 border border-neutral-400 focus:outline-none rounded-r-full w-64"
            />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex justify-between items-center mb-1 mx-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-neutral-500 text-neutral-500 p-2 rounded-lg"
        >
          <FaFilter/>
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FilterBar;
