
import React, { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, ClipboardList, ClipboardCheck, 
  Users, FileText, LayoutDashboard, Book, Calendar 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const Sidebar: React.FC = () => {
  const { role } = useRole();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getNavItems = (): SidebarItem[] => {
    switch (role) {
      case 'Course Coordinator':
        return [
          { title: 'Home', path: '/coordinator/home', icon: Home },
          { title: 'Course Builder', path: '/coordinator/course-builder', icon: BookOpen },
          { title: 'CIE', path: '/coordinator/cie', icon: ClipboardList },
          { title: 'CO Attainment', path: '/coordinator/co-attainment', icon: ClipboardCheck },
          { title: 'Group Discussion Attendance', path: '/coordinator/gd-attendance', icon: Users },
          { title: 'Mentoring', path: '/coordinator/mentoring', icon: Users },
        ];
      case 'Course Associator':
        return [
          { title: 'Home', path: '/associator/home', icon: Home },
          { title: 'Subject Builder', path: '/associator/subject-builder', icon: Book },
          { title: 'My Batches', path: '/associator/my-batches', icon: Users },
          { title: 'Attendance', path: '/associator/attendance', icon: ClipboardCheck },
          { title: 'Lab Attendance', path: '/associator/lab-attendance', icon: ClipboardCheck },
          { title: 'Assignments', path: '/associator/assignments', icon: FileText },
          { title: 'CIE', path: '/associator/cie', icon: ClipboardList },
          { title: 'CIE Evaluations', path: '/associator/cie-evaluations', icon: ClipboardList },
        ];
      case 'HOD':
        return [
          { title: 'Dashboard', path: '/hod/dashboard', icon: LayoutDashboard },
          { title: 'Curriculum', path: '/hod/curriculum', icon: Book },
          { title: 'Course List', path: '/hod/course-list', icon: ClipboardList },
          { title: 'Faculty Mapping', path: '/hod/faculty-mapping', icon: Users },
          { title: 'Course Files', path: '/hod/course-files', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside 
      className={cn(
        "bg-academic-light h-screen border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {!isCollapsed && <h2 className="font-semibold text-academic-primary">{role}</h2>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-200 text-gray-600"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm",
                    "hover:bg-academic-secondary/10 hover:text-academic-primary transition-colors duration-200",
                    location.pathname === item.path 
                      ? "bg-academic-secondary/10 text-academic-primary font-medium" 
                      : "text-gray-700"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center">
              <Calendar size={20} className="text-gray-600" />
              <span className="ml-3 text-sm text-gray-600">Academic Year: 2023-24</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
