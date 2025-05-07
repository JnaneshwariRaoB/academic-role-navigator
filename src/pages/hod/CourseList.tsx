
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: number;
}

const CourseList: React.FC = () => {
  const [batch, setBatch] = useState<string>('');
  const [semesterType, setSemesterType] = useState<'odd' | 'even'>('odd');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock batches
  const batches = ['2022-26', '2023-27', '2024-28'];
  
  const fetchCourses = () => {
    if (!batch) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockCourses = [
        { id: '1', name: 'Data Structures and Algorithms', code: 'CS301', credits: 4, semester: semesterType === 'odd' ? 3 : 4 },
        { id: '2', name: 'Database Management Systems', code: 'CS302', credits: 4, semester: semesterType === 'odd' ? 3 : 4 },
        { id: '3', name: 'Computer Networks', code: 'CS303', credits: 3, semester: semesterType === 'odd' ? 3 : 4 },
        { id: '4', name: 'Operating Systems', code: 'CS304', credits: 4, semester: semesterType === 'odd' ? 5 : 6 },
        { id: '5', name: 'Web Technologies', code: 'CS305', credits: 3, semester: semesterType === 'odd' ? 5 : 6 },
      ];
      
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
  };

  const handleBatchChange = (value: string) => {
    setBatch(value);
    setCourses([]);
  };

  const handleSemesterTypeChange = (value: 'odd' | 'even') => {
    setSemesterType(value);
    setCourses([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-academic-primary">Course List</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Parameters</CardTitle>
          <CardDescription>
            Choose the batch and semester type to view courses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select
                value={batch}
                onValueChange={handleBatchChange}
              >
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Semester Type</Label>
              <RadioGroup
                value={semesterType}
                onValueChange={(value) => handleSemesterTypeChange(value as 'odd' | 'even')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="odd" id="odd" />
                  <Label htmlFor="odd" className="cursor-pointer">Odd (1,3,5,7)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="even" id="even" />
                  <Label htmlFor="even" className="cursor-pointer">Even (2,4,6,8)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button 
            onClick={fetchCourses} 
            className="bg-academic-primary hover:bg-academic-secondary"
            disabled={!batch || isLoading}
          >
            {isLoading ? 'Loading...' : 'View Courses'}
          </Button>
          
          {courses.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Courses for {batch} ({semesterType === 'odd' ? 'Odd' : 'Even'} Semester)
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-start p-3">Course Code</th>
                      <th className="text-start p-3">Course Name</th>
                      <th className="text-start p-3">Credits</th>
                      <th className="text-start p-3">Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id} className="border-t">
                        <td className="p-3">{course.code}</td>
                        <td className="p-3">{course.name}</td>
                        <td className="p-3">{course.credits}</td>
                        <td className="p-3">{course.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseList;
