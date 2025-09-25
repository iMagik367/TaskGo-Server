import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterStatus: (status: string) => void;
  onFilterType: (type: string) => void;
}

export function FilterBar({ onSearch, onFilterStatus, onFilterType }: FilterBarProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <Input
        type="search"
        placeholder="Search users..."
        className="max-w-xs"
        onChange={(e) => onSearch(e.target.value)}
      />
      
      <select
        className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm"
        onChange={(e) => onFilterStatus(e.target.value)}
        defaultValue=""
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="blocked">Blocked</option>
      </select>

      <select
        className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm"
        onChange={(e) => onFilterType(e.target.value)}
        defaultValue=""
      >
        <option value="">All Types</option>
        <option value="client">Client</option>
        <option value="seller">Seller</option>
        <option value="provider">Provider</option>
      </select>

      <Button variant="secondary" size="sm" className="ml-auto">
        Clear Filters
      </Button>
    </div>
  );
}