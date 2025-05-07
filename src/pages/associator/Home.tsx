
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AssociatorHome: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-academic-primary">Course Associator Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Course Associator</CardTitle>
          <CardDescription>
            You can manage your subjects, batches, attendance, and evaluations from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Select an option from the sidebar to get started with your course association activities.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssociatorHome;
