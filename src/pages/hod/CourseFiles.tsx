
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

interface CourseFile {
  id: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  cieScore: number;
  seeScore: number;
  syllabusCoverage: number;
  status: 'complete' | 'incomplete' | 'pending';
}

const CourseFiles: React.FC = () => {
  const [batch, setBatch] = useState('');
  const [scheme, setScheme] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const [courseFiles, setCourseFiles] = useState<CourseFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const batches = ['2022-26', '2023-27', '2024-28'];
  const schemes = ['2021', '2022', '2023'];
  const sections = ['A', 'B', 'C'];
  
  const fetchCourseFiles = () => {
    if (!batch || !scheme || !section || !semester) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockCourseFiles: CourseFile[] = [
        {
          id: 'cf1',
          courseName: 'Data Structures and Algorithms',
          courseCode: 'CS301',
          instructor: 'Dr. Amit Kumar',
          cieScore: 92,
          seeScore: 85,
          syllabusCoverage: 100,
          status: 'complete'
        },
        {
          id: 'cf2',
          courseName: 'Database Management Systems',
          courseCode: 'CS302',
          instructor: 'Prof. Sunita Sharma',
          cieScore: 88,
          seeScore: 80,
          syllabusCoverage: 95,
          status: 'complete'
        },
        {
          id: 'cf3',
          courseName: 'Computer Networks',
          courseCode: 'CS303',
          instructor: 'Dr. Rajesh Verma',
          cieScore: 78,
          seeScore: 0,
          syllabusCoverage: 85,
          status: 'incomplete'
        },
        {
          id: 'cf4',
          courseName: 'Operating Systems',
          courseCode: 'CS304',
          instructor: 'Dr. Priya Singh',
          cieScore: 0,
          seeScore: 0,
          syllabusCoverage: 60,
          status: 'pending'
        },
        {
          id: 'cf5',
          courseName: 'Web Technologies',
          courseCode: 'CS305',
          instructor: 'Prof. Deepak Joshi',
          cieScore: 90,
          seeScore: 82,
          syllabusCoverage: 100,
          status: 'complete'
        },
      ];
      
      setCourseFiles(mockCourseFiles);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status: 'complete' | 'incomplete' | 'pending') => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Complete</Badge>;
      case 'incomplete':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Incomplete</Badge>;
      case 'pending':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-academic-primary">Course Files</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>View Course Files</CardTitle>
          <CardDescription>
            Select the batch, scheme, section, and semester to view course files.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select
                value={batch}
                onValueChange={setBatch}
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
              <Label htmlFor="scheme">Scheme</Label>
              <Select
                value={scheme}
                onValueChange={setScheme}
                disabled={!batch}
              >
                <SelectTrigger id="scheme">
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  {schemes.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select
                value={section}
                onValueChange={setSection}
                disabled={!scheme}
              >
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={semester}
                onValueChange={setSemester}
                disabled={!section}
              >
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {['3', '4', '5', '6', '7', '8'].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={fetchCourseFiles} 
            className="bg-academic-primary hover:bg-academic-secondary"
            disabled={!batch || !scheme || !section || !semester || isLoading}
          >
            {isLoading ? 'Loading...' : 'View Course Files'}
          </Button>
          
          {courseFiles.length > 0 && (
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">
                Course Files for {batch} (Scheme: {scheme}, Section: {section}, Semester: {semester})
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {courseFiles.map(file => (
                  <Card key={file.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-muted/30 p-4 md:w-60 flex-shrink-0 border-b md:border-r md:border-b-0">
                        <h4 className="font-medium">{file.courseName}</h4>
                        <p className="text-sm text-muted-foreground">{file.courseCode}</p>
                      </div>
                      <div className="p-4 flex-grow">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Instructor</p>
                            <p>{file.instructor}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <div className="mt-1">{getStatusBadge(file.status)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">CIE Score</p>
                            <p>{file.cieScore > 0 ? `${file.cieScore}/100` : 'Not Available'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">SEE Score</p>
                            <p>{file.seeScore > 0 ? `${file.seeScore}/100` : 'Not Available'}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-muted-foreground">Syllabus Coverage</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                              <div 
                                className="bg-academic-primary h-2.5 rounded-full" 
                                style={{ width: `${file.syllabusCoverage}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1">{file.syllabusCoverage}%</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" className="text-academic-primary">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseFiles;
