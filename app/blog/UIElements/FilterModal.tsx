import React, { useContext } from "react";
import { BlogContext } from '../context/BlogContext';
interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
    isOpen,
    onClose}) => {
    const { quickFilter, searchType, searchTerm, fromDate, toDate, setQuickFilter, setSearchType, setSearchTerm, setFromDate, setToDate, handleQuickFilter } =
    useContext(BlogContext) ?? {};
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                {/* Date Filter */}
                <select
                    value={quickFilter}
                    onChange={(e) => handleQuickFilter && handleQuickFilter(e.target.value)}
                    className="p-2 w-full border border-neutral-400 text-black rounded-md mb-3"
                >
                    <option value="">Select Date Filter</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="lastYear">Last Year</option>
                </select>

                {/* Date Range Filter */}
                <div className="flex flex-col gap-2 mb-3">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate && setFromDate(e.target.value)}
                        className="p-2 border border-neutral-400 rounded-md"
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate && setToDate(e.target.value)}
                        className="p-2 border border-neutral-400 rounded-md"
                    />
                </div>

                {/* Search By Dropdown */}
                <select
                    value={searchType}
                    onChange={(e) => setSearchType && setSearchType(e.target.value)}
                    className="p-2 w-full border border-neutral-400 text-black rounded-md mb-3"
                >
                    <option value="title">Search by Title</option>
                    <option value="user">Search by User</option>
                </select>

                {/* Search Box */}
                <input
                    type="text"
                    placeholder={`Search by ${(searchType || 'title').charAt(0).toUpperCase() + (searchType || 'title').slice(1)}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                    className="p-2 w-full border border-neutral-400 rounded-md mb-4"
                />

                {/* Close Button & Apply Button */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="w-full border border-neutral-500 text-neutral-500 py-2 rounded-md"
                    >
                        Close
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-neutral-900 text-white py-2 rounded-md"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
