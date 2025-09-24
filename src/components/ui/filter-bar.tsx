"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onFilterStatus?: (status: string) => void;
  onFilterType?: (type: string) => void;
}

export function FilterBar({ onSearch, onFilterStatus, onFilterType }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Status Filter */}
        <select 
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 min-w-[150px]"
          onChange={(e) => onFilterStatus?.(e.target.value)}
          defaultValue=""
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        {/* Type Filter */}
        <select
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 min-w-[150px]"
          onChange={(e) => onFilterType?.(e.target.value)}
          defaultValue=""
        >
          <option value="">All Types</option>
          <option value="cliente">Client</option>
          <option value="vendedor">Seller</option>
          <option value="prestador">Provider</option>
        </select>
      </div>
    </div>
  );
}