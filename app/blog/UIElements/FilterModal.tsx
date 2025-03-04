import React from "react";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
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

const FilterModal: React.FC<FilterModalProps> = ({
    isOpen,
    onClose,
    quickFilter,
    searchType,
    searchTerm,
    fromDate,
    toDate,
    setQuickFilter,
    setSearchType,
    handleSearchChange,
    setFromDate,
    setToDate,
    handleQuickFilter,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                {/* Quick Filters Dropdown */}
                <select
                    value={quickFilter}
                    onChange={(e) => handleQuickFilter(e.target.value)}
                    className="p-2 w-full border border-neutral-400 text-black rounded-md mb-3"
                >
                    <option value="">Select Date Filter</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="lastYear">Last Year</option>
                </select>

                {/* Date Range */}
                <div className="flex flex-col gap-2 mb-3">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="p-2 border border-neutral-400 rounded-md"
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="p-2 border border-neutral-400 rounded-md"
                    />
                </div>

                {/* Search Type Dropdown */}
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="p-2 w-full border border-neutral-400 text-black rounded-md mb-3"
                >
                    <option value="title">Search by Title</option>
                    <option value="user">Search by User</option>
                    <option value="category">Search by Category</option>
                </select>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder={`Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 w-full border border-neutral-400 rounded-md mb-4"
                />

                {/* Close Button */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 text-white py-2 rounded-md"
                    >
                        Close
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 text-white py-2 rounded-md"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
