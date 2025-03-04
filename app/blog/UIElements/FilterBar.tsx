import React, { useState } from "react";
import FilterModal from "./FilterModal";
import { FaFilter } from "react-icons/fa";


interface FilterBarProps {
  quickFilter: string;
  searchType: string;
  searchTerm: string;
  fromDate: string;
  toDate: string;
  setQuickFilter: (value: string) => void;
  setSearchType: (value: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
  handleQuickFilter: (type: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex justify-between items-center mb-4 mt-9">
        <div className="text-3xl font-bold pb-4"></div>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0">
            {/* Quick Filters Dropdown */}
            <select
              value={props.quickFilter}
              onChange={(e) => props.handleQuickFilter(e.target.value)}
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
                value={props.fromDate}
                placeholder="From Date"
                onChange={(e) => props.setFromDate(e.target.value)}
                className="p-2 border-l border-y border-neutral-400 focus:outline-none"
              />

              {/* To Date */}
              <input
                type="date"
                value={props.toDate}
                placeholder="To Date"
                onChange={(e) => props.setToDate(e.target.value)}
                className="p-2 pr-4 border-r border-y border-neutral-400 focus:outline-none rounded-r-full"
              />
            </div>
          </div>

          <div className="flex bg-white rounded-full">
            {/* Search Type Dropdown */}
            <select
              value={props.searchType}
              onChange={(e) => props.setSearchType(e.target.value)}
              className="p-2 pl-4 border-l border-y border-neutral-400 text-black rounded-l-full focus:outline-none"
            >
              <option value="title">Search by Title</option>
              <option value="user">Search by User</option>
              <option value="category">Search by Category</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder={`Search by ${props.searchType.charAt(0).toUpperCase() + props.searchType.slice(1)}...`}
              value={props.searchTerm}
              onChange={props.handleSearchChange}
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
        {...props}
      />
    </>
  );
};

export default FilterBar;
