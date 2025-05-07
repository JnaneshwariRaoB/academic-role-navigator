
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from 'lucide-react';

interface COPOMappingProps {
  courseCode?: string;
  courseName?: string;
}

const COPOMapping: React.FC<COPOMappingProps> = ({ courseCode = "24CVT205X1", courseName = "Engineering Mechanics" }) => {
  // Example data - in a real app, this would come from an API or props
  const courseOutcomes = [
    "CO1: Apply the principles of mechanics to solve engineering problems",
    "CO2: Analyze static equilibrium of rigid bodies",
    "CO3: Evaluate kinematic and kinetic behavior of particles and rigid bodies",
    "CO4: Formulate mathematical models for engineering mechanics problems"
  ];

  const programOutcomes = [
    "PO1: Engineering Knowledge",
    "PO2: Problem Analysis",
    "PO3: Design/Development",
    "PO4: Investigation",
    "PO5: Modern Tool Usage",
    "PO6: Engineer & Society",
    "PO7: Environment & Sustainability",
    "PO8: Ethics",
    "PO9: Individual & Team Work",
    "PO10: Communication",
    "PO11: Project Management",
    "PO12: Lifelong Learning"
  ];

  // This would typically come from a database
  const [mappingData, setMappingData] = useState([
    [3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 3, 1, 2, 0, 0, 1, 0, 0, 0, 0],
  ]);

  const handleMappingChange = (coIndex: number, poIndex: number, value: number) => {
    const newMappingData = [...mappingData];
    newMappingData[coIndex][poIndex] = value;
    setMappingData(newMappingData);
  };

  // Calculate totals for each PO
  const calculateTotalForPO = (poIndex: number) => {
    return mappingData.reduce((sum, row) => sum + row[poIndex], 0);
  };

  // Calculate averages for each PO
  const calculateAverageForPO = (poIndex: number) => {
    const total = calculateTotalForPO(poIndex);
    const count = mappingData.length;
    return count > 0 ? (total / count).toFixed(1) : "0.0";
  };

  const exportAsPDF = () => {
    console.log("Exporting as PDF...");
    // Logic to generate and download a PDF would go here
  };

  const exportAsExcel = () => {
    console.log("Exporting as Excel...");
    // Logic to generate and download an Excel file would go here
  };

  // Color mapping for correlation values
  const getMappingColor = (value: number) => {
    switch (value) {
      case 3: return "bg-purple-100 text-purple-800"; // High correlation
      case 2: return "bg-blue-50 text-blue-700"; // Medium correlation
      case 1: return "bg-green-50 text-green-700"; // Low correlation
      default: return ""; // No correlation
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{courseName} ({courseCode})</h2>
          <p className="text-gray-600">CO-PO Mapping Table</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportAsPDF} className="flex items-center gap-2">
            <Download size={16} />
            <span>PDF</span>
          </Button>
          <Button variant="outline" onClick={exportAsExcel} className="flex items-center gap-2">
            <FileDown size={16} />
            <span>Excel</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Mapping between Course Outcomes and Program Outcomes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-100">CO/PO</TableHead>
              {programOutcomes.map((po, index) => (
                <TableHead key={index} className="bg-gray-100 text-center" title={po}>
                  PO{index + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseOutcomes.map((co, coIndex) => (
              <TableRow key={coIndex}>
                <TableCell className="font-medium bg-gray-50" title={co}>
                  CO{coIndex + 1}
                </TableCell>
                {mappingData[coIndex].map((value, poIndex) => (
                  <TableCell key={poIndex} className={`text-center ${getMappingColor(value)}`}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          {value}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleMappingChange(coIndex, poIndex, 0)}>0</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMappingChange(coIndex, poIndex, 1)}>1</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMappingChange(coIndex, poIndex, 2)}>2</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMappingChange(coIndex, poIndex, 3)}>3</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow className="bg-yellow-50">
              <TableCell className="font-bold">Total</TableCell>
              {programOutcomes.map((_, poIndex) => (
                <TableCell key={poIndex} className="text-center font-bold">
                  {calculateTotalForPO(poIndex)}
                </TableCell>
              ))}
            </TableRow>
            {/* Average Row */}
            <TableRow className="bg-yellow-50">
              <TableCell className="font-bold">Average</TableCell>
              {programOutcomes.map((_, poIndex) => (
                <TableCell key={poIndex} className="text-center font-bold">
                  {calculateAverageForPO(poIndex)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Correlation Levels:</h3>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-purple-100 border border-purple-200"></div>
            <span className="text-sm">3 - Strong</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200"></div>
            <span className="text-sm">2 - Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-50 border border-green-200"></div>
            <span className="text-sm">1 - Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-white border"></div>
            <span className="text-sm">0 - None</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COPOMapping;
