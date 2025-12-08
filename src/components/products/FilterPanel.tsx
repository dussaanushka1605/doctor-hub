import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { getManufacturers, getVendors } from '@/data/products';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    manufacturer: string;
    vendor: string;
    batch: string;
    expiryStatus: string;
  }) => void;
  initialFilters: {
    manufacturer: string;
    vendor: string;
    batch: string;
    expiryStatus: string;
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [vendors, setVendors] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load manufacturers and vendors
    const loadData = async () => {
      setManufacturers(getManufacturers());
      setVendors(getVendors());
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      manufacturer: '',
      vendor: '',
      batch: '',
      expiryStatus: '',
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 border border-gray-200"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Manufacturer Filter */}
          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
              Manufacturer
            </label>
            <select
              id="manufacturer"
              name="manufacturer"
              value={filters.manufacturer}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option value="">All Manufacturers</option>
              {manufacturers.map((mfr) => (
                <option key={mfr} value={mfr}>
                  {mfr}
                </option>
              ))}
            </select>
          </div>

          {/* Vendor Filter */}
          <div>
            <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">
              Vendor
            </label>
            <select
              id="vendor"
              name="vendor"
              value={filters.vendor}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option value="">All Vendors</option>
              {vendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
          </div>

          {/* Batch Filter */}
          <div>
            <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">
              Batch Number
            </label>
            <input
              type="text"
              id="batch"
              name="batch"
              value={filters.batch}
              onChange={handleInputChange}
              placeholder="Enter batch number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Expiry Status Filter */}
          <div>
            <label htmlFor="expiryStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Status
            </label>
            <select
              id="expiryStatus"
              name="expiryStatus"
              value={filters.expiryStatus}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option value="">All Statuses</option>
              <option value="valid">Valid</option>
              <option value="near-expiry">Near Expiry</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
