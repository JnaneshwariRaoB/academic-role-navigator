
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CoordinatorHome: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-academic-primary">Course Coordinator Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Course Coordinator</CardTitle>
          <CardDescription>
            You can manage your courses, CIE, attainment, and other coordinator responsibilities from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Select an option from the sidebar to get started with your course coordination activities.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoordinatorHome;
