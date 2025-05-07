
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Faculty {
  id: string;
  name: string;
  specialization: string;
}

interface Section {
  id: string;
  name: string;
  students: string[];
}

interface Subject {
  id: string;
  code: string;
  name: string;
}

interface FacultyAssignment {
  sectionId: string;
  subjectId: string;
  facultyId: string;
  isCoordinator: boolean;
}

const FacultyMapping: React.FC = () => {
  const [batch, setBatch] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [assignments, setAssignments] = useState<FacultyAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');

  // Mock batches
  const batches = ['2022-26', '2023-27', '2024-28'];
  
  const mockFaculty: Faculty[] = [
    { id: 'f1', name: 'Dr. Amit Kumar', specialization: 'Algorithms' },
    { id: 'f2', name: 'Prof. Sunita Sharma', specialization: 'Database Systems' },
    { id: 'f3', name: 'Dr. Rajesh Verma', specialization: 'Computer Networks' },
    { id: 'f4', name: 'Dr. Priya Singh', specialization: 'Operating Systems' },
    { id: 'f5', name: 'Prof. Deepak Joshi', specialization: 'Web Technologies' },
  ];
  
  const mockSubjects: Subject[] = [
    { id: 's1', code: 'CS301', name: 'Data Structures and Algorithms' },
    { id: 's2', code: 'CS302', name: 'Database Management Systems' },
    { id: 's3', code: 'CS303', name: 'Computer Networks' },
    { id: 's4', code: 'CS304', name: 'Operating Systems' },
    { id: 's5', code: 'CS305', name: 'Web Technologies' },
  ];

  const handleGenerateSections = () => {
    if (!batch) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedSections: Section[] = [
        {
          id: 'secA',
          name: 'A',
          students: ['Rahul Sharma', 'Priya Patel', 'Amit Singh', 'Kavita Reddy', 'Vikram Verma']
        },
        {
          id: 'secB',
          name: 'B',
          students: ['Shreya Kumar', 'Raj Malhotra', 'Deepa Gupta', 'Nikhil Joshi', 'Sanya Mehta']
        },
        {
          id: 'secC',
          name: 'C',
          students: ['Arjun Kapur', 'Neha Sharma', 'Kunal Khanna', 'Divya Rao', 'Akshay Kumar']
        }
      ];
      
      setSections(generatedSections);
      setSubjects(mockSubjects);
      setFaculty(mockFaculty);
      setSelectedTab(generatedSections[0].id);
      setIsLoading(false);
    }, 1000);
  };

  const handleFacultyAssignment = (sectionId: string, subjectId: string, facultyId: string) => {
    const existingAssignmentIndex = assignments.findIndex(
      a => a.sectionId === sectionId && a.subjectId === subjectId
    );
    
    if (existingAssignmentIndex >= 0) {
      const updatedAssignments = [...assignments];
      updatedAssignments[existingAssignmentIndex].facultyId = facultyId;
      setAssignments(updatedAssignments);
    } else {
      setAssignments([
        ...assignments,
        { sectionId, subjectId, facultyId, isCoordinator: false }
      ]);
    }
  };

  const handleCoordinatorSelection = (sectionId: string, subjectId: string, isSelected: boolean) => {
    setAssignments(prev => 
      prev.map(a => 
        a.sectionId === sectionId && a.subjectId === subjectId
          ? { ...a, isCoordinator: isSelected }
          : (a.subjectId === subjectId ? { ...a, isCoordinator: false } : a)
      )
    );
  };

  const getAssignedFaculty = (sectionId: string, subjectId: string) => {
    return assignments.find(a => a.sectionId === sectionId && a.subjectId === subjectId)?.facultyId || '';
  };

  const isCoordinator = (sectionId: string, subjectId: string) => {
    return assignments.find(a => a.sectionId === sectionId && a.subjectId === subjectId)?.isCoordinator || false;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  
  // Check if all subjects have faculty assigned for each section
  const isReadyToSubmit = () => {
    if (!sections.length || !subjects.length) return false;
    
    for (const section of sections) {
      for (const subject of subjects) {
        const assigned = assignments.some(
          a => a.sectionId === section.id && a.subjectId === subject.id && a.facultyId
        );
        if (!assigned) return false;
      }
    }
    
    // Check if there's at least one coordinator for each subject
    for (const subject of subjects) {
      const hasCoordinator = assignments.some(
        a => a.subjectId === subject.id && a.isCoordinator
      );
      if (!hasCoordinator) return false;
    }
    
    return true;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-academic-primary">Faculty Mapping</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Course Faculty Assignment</CardTitle>
          <CardDescription>
            Assign faculty members to courses for each section and select course coordinators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isSubmitted ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch">Select Batch</Label>
                  <Select
                    value={batch}
                    onValueChange={setBatch}
                    disabled={sections.length > 0}
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
                
                {sections.length === 0 && (
                  <Button 
                    onClick={handleGenerateSections} 
                    className="bg-academic-primary hover:bg-academic-secondary w-fit"
                    disabled={!batch || isLoading}
                  >
                    {isLoading ? 'Generating...' : 'Generate Sections'}
                  </Button>
                )}
              </div>
              
              {sections.length > 0 && (
                <>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <h3 className="font-medium mb-2">Batch Information</h3>
                    <div className="text-sm">
                      <p><strong>Batch:</strong> {batch}</p>
                      <p><strong>Number of Sections:</strong> {sections.length}</p>
                    </div>
                  </div>
                  
                  <Tabs 
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                    className="w-full"
                  >
                    <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${sections.length}, 1fr)` }}>
                      {sections.map(section => (
                        <TabsTrigger key={section.id} value={section.id}>
                          Section {section.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {sections.map(section => (
                      <TabsContent key={section.id} value={section.id}>
                        <div className="space-y-6">
                          <div className="border-b pb-4">
                            <h3 className="font-medium mb-2">Sample Students in Section {section.name}</h3>
                            <ul className="grid grid-cols-2 gap-2">
                              {section.students.map((student, idx) => (
                                <li key={idx} className="text-sm">{student}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-4">Assign Faculty for Theory Subjects</h3>
                            <div className="border rounded-lg overflow-hidden">
                              <table className="w-full">
                                <thead className="bg-muted">
                                  <tr>
                                    <th className="text-start p-3">Subject</th>
                                    <th className="text-start p-3">Faculty</th>
                                    <th className="text-start p-3 w-40">Course Coordinator</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {subjects.map(subject => (
                                    <tr key={subject.id} className="border-t">
                                      <td className="p-3">
                                        <div>
                                          <div className="font-medium">{subject.name}</div>
                                          <div className="text-sm text-muted-foreground">{subject.code}</div>
                                        </div>
                                      </td>
                                      <td className="p-3">
                                        <Select
                                          value={getAssignedFaculty(section.id, subject.id)}
                                          onValueChange={(value) => handleFacultyAssignment(section.id, subject.id, value)}
                                        >
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Assign faculty" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {faculty.map(f => (
                                              <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </td>
                                      <td className="p-3">
                                        <RadioGroup
                                          value={isCoordinator(section.id, subject.id) ? "true" : "false"}
                                          onValueChange={(value) => 
                                            handleCoordinatorSelection(section.id, subject.id, value === "true")
                                          }
                                          disabled={!getAssignedFaculty(section.id, subject.id)}
                                        >
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="true" id={`coord-${section.id}-${subject.id}`} />
                                            <Label htmlFor={`coord-${section.id}-${subject.id}`} className="cursor-pointer">
                                              Coordinator
                                            </Label>
                                          </div>
                                        </RadioGroup>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 p-2 bg-green-50 border border-green-200 text-green-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Faculty mapping has been successfully submitted and locked.</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Faculty Assignments Summary</h3>
                
                {subjects.map(subject => (
                  <Card key={subject.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/20 py-3">
                      <CardTitle className="text-base">{subject.name} ({subject.code})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <table className="w-full">
                        <thead className="border-b">
                          <tr>
                            <th className="text-start p-3">Section</th>
                            <th className="text-start p-3">Faculty</th>
                            <th className="text-start p-3">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sections.map(section => {
                            const assignment = assignments.find(
                              a => a.sectionId === section.id && a.subjectId === subject.id
                            );
                            const assignedFaculty = faculty.find(f => f.id === assignment?.facultyId);
                            
                            return (
                              <tr key={section.id} className="border-t">
                                <td className="p-3">Section {section.name}</td>
                                <td className="p-3">{assignedFaculty?.name}</td>
                                <td className="p-3">
                                  {assignment?.isCoordinator ? (
                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                      Course Coordinator
                                    </span>
                                  ) : "Faculty"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        {sections.length > 0 && !isSubmitted && (
          <CardFooter>
            <Button 
              className="bg-academic-primary hover:bg-academic-secondary ml-auto"
              disabled={!isReadyToSubmit()}
              onClick={handleSubmit}
            >
              Submit & Lock Faculty Mapping
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default FacultyMapping;
