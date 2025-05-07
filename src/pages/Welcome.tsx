
import React from 'react';
import { useRole } from '@/context/RoleContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const { role } = useRole();
  const navigate = useNavigate();

  const getStartPath = () => {
    switch (role) {
      case 'Course Coordinator':
        return '/coordinator/home';
      case 'Course Associator':
        return '/associator/home';
      case 'HOD':
        return '/hod/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-academic-primary mb-6">Academic Role Navigator</h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the Academic Role Navigator! To begin, please select your role from the dropdown in the top-right corner.
        </p>
        
        <div className="mb-8">
          <p className="text-gray-700 font-medium mb-2">Your current role:</p>
          <div className="inline-block bg-academic-secondary/10 text-academic-primary font-semibold px-4 py-2 rounded-full">
            {role || "Not Selected"}
          </div>
        </div>
        
        <Button 
          onClick={() => navigate(getStartPath())}
          className="bg-academic-primary hover:bg-academic-secondary text-white"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
