
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
}

const Curriculum: React.FC = () => {
  const [scheme, setScheme] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('3');
  const [subjects, setSubjects] = useState<{[key: string]: Subject[]}>({
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
  });
  const [currentSubject, setCurrentSubject] = useState<Omit<Subject, 'id'>>({
    code: '',
    name: '',
    credits: 3,
  });
  const [isFrozen, setIsFrozen] = useState(false);

  const handleSubjectChange = (field: keyof Omit<Subject, 'id'>, value: string | number) => {
    setCurrentSubject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSubject = () => {
    if (currentSubject.code && currentSubject.name) {
      const newSubject = {
        ...currentSubject,
        id: `${currentSubject.code}-${Date.now()}`
      };
      
      setSubjects(prev => ({
        ...prev,
        [selectedSemester]: [...prev[selectedSemester], newSubject]
      }));
      
      setCurrentSubject({
        code: '',
        name: '',
        credits: 3,
      });
    }
  };

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSubjects(prev => ({
      ...prev,
      [semesterId]: prev[semesterId].filter(subject => subject.id !== subjectId)
    }));
  };

  const freezeScheme = () => {
    setIsFrozen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-academic-primary">Curriculum Management</h1>
        {isFrozen && (
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Scheme Frozen
          </div>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Scheme Information</CardTitle>
          <CardDescription>Enter the scheme details and add subjects to each semester.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="scheme">Scheme Number</Label>
              <Input 
                id="scheme" 
                placeholder="e.g. 2021, 2022" 
                value={scheme}
                onChange={(e) => setScheme(e.target.value)}
                disabled={isFrozen}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Semester Subjects</CardTitle>
          <CardDescription>Add subjects for each semester in the curriculum.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="3"
            value={selectedSemester}
            onValueChange={setSelectedSemester}
            className="w-full"
          >
            <TabsList className="grid grid-cols-6">
              {['3', '4', '5', '6', '7', '8'].map(sem => (
                <TabsTrigger key={sem} value={sem}>Semester {sem}</TabsTrigger>
              ))}
            </TabsList>
            
            {['3', '4', '5', '6', '7', '8'].map(sem => (
              <TabsContent key={sem} value={sem} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Semester {sem} Subjects</h3>
                  
                  {subjects[sem].length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-start p-3">Subject Code</th>
                            <th className="text-start p-3">Subject Name</th>
                            <th className="text-start p-3">Credits</th>
                            {!isFrozen && <th className="p-3 w-16">Actions</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {subjects[sem].map(subject => (
                            <tr key={subject.id} className="border-t">
                              <td className="p-3">{subject.code}</td>
                              <td className="p-3">{subject.name}</td>
                              <td className="p-3">{subject.credits}</td>
                              {!isFrozen && (
                                <td className="p-3">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                    onClick={() => removeSubject(sem, subject.id)}
                                  >
                                    Remove
                                  </Button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-muted/50 p-6 text-center rounded-lg">
                      <p className="text-muted-foreground">No subjects added yet. Add subjects using the form below.</p>
                    </div>
                  )}
                  
                  {!isFrozen && (
                    <Card className="border-dashed">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Add New Subject</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="code">Subject Code</Label>
                            <Input 
                              id="code" 
                              placeholder="e.g. CS301" 
                              value={currentSubject.code}
                              onChange={(e) => handleSubjectChange('code', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name">Subject Name</Label>
                            <Input 
                              id="name" 
                              placeholder="e.g. Data Structures" 
                              value={currentSubject.name}
                              onChange={(e) => handleSubjectChange('name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="credits">Credits</Label>
                            <Select
                              value={currentSubject.credits.toString()}
                              onValueChange={(value) => handleSubjectChange('credits', parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select credits" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map(credit => (
                                  <SelectItem key={credit} value={credit.toString()}>{credit}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="bg-academic-primary hover:bg-academic-secondary"
                          onClick={addSubject}
                        >
                          Add Subject
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          {!isFrozen && (
            <Button 
              className="bg-academic-primary hover:bg-academic-secondary"
              onClick={freezeScheme} 
              disabled={!scheme || Object.values(subjects).every(arr => arr.length === 0)}
            >
              Freeze Scheme
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Curriculum;
