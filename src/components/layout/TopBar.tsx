
import React from 'react';
import { useRole } from '@/context/RoleContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopBar: React.FC = () => {
  const { role, setRole } = useRole();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-bold text-academic-primary text-xl">Academic Role Navigator</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Role:</span>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as any)}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Course Coordinator">Course Coordinator</SelectItem>
                <SelectItem value="Course Associator">Course Associator</SelectItem>
                <SelectItem value="HOD">HOD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-academic-secondary flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
