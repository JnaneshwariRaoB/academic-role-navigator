
import React from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { RoleProvider } from '@/context/RoleContext';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  return (
    <RoleProvider>
      <div className="flex flex-col h-screen">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </RoleProvider>
  );
};

export default AppLayout;
