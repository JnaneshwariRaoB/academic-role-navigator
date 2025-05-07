
import React from 'react';
import COPOMapping from '@/components/coordinator/COPOMapping';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const COPOMappingPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Course Outcome - Program Outcome Mapping</h1>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-6">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Academic Year</label>
            <select className="w-full rounded-md border border-gray-300 p-2">
              <option>2024-25</option>
              <option>2023-24</option>
              <option>2022-23</option>
            </select>
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select className="w-full rounded-md border border-gray-300 p-2">
              <option>Semester 1</option>
              <option>Semester 2</option>
              <option>Semester 3</option>
              <option>Semester 4</option>
            </select>
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Course</label>
            <select className="w-full rounded-md border border-gray-300 p-2">
              <option>Engineering Mechanics (24CVT205X1)</option>
              <option>Data Structures (24CST203)</option>
              <option>Digital Electronics (24ECT301)</option>
            </select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="mapping" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mapping">CO-PO Mapping</TabsTrigger>
          <TabsTrigger value="attainment">Attainment Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="mapping" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <COPOMapping />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attainment" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500">Attainment Analysis coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500">Reports coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default COPOMappingPage;
