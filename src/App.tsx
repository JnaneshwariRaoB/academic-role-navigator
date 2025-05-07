
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";

// HOD Routes
import Dashboard from "./pages/hod/Dashboard";
import Curriculum from "./pages/hod/Curriculum";
import CourseList from "./pages/hod/CourseList";
import FacultyMapping from "./pages/hod/FacultyMapping";
import CourseFiles from "./pages/hod/CourseFiles";

// Coordinator Routes
import CoordinatorHome from "./pages/coordinator/Home";

// Associator Routes
import AssociatorHome from "./pages/associator/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route path="/" element={<AppLayout />}>
            {/* HOD Routes */}
            <Route path="/hod/dashboard" element={<Dashboard />} />
            <Route path="/hod/curriculum" element={<Curriculum />} />
            <Route path="/hod/course-list" element={<CourseList />} />
            <Route path="/hod/faculty-mapping" element={<FacultyMapping />} />
            <Route path="/hod/course-files" element={<CourseFiles />} />
            
            {/* Coordinator Routes */}
            <Route path="/coordinator/home" element={<CoordinatorHome />} />
            <Route path="/coordinator/course-builder" element={<CoordinatorHome />} />
            <Route path="/coordinator/cie" element={<CoordinatorHome />} />
            <Route path="/coordinator/co-attainment" element={<CoordinatorHome />} />
            <Route path="/coordinator/gd-attendance" element={<CoordinatorHome />} />
            <Route path="/coordinator/mentoring" element={<CoordinatorHome />} />
            
            {/* Associator Routes */}
            <Route path="/associator/home" element={<AssociatorHome />} />
            <Route path="/associator/subject-builder" element={<AssociatorHome />} />
            <Route path="/associator/my-batches" element={<AssociatorHome />} />
            <Route path="/associator/attendance" element={<AssociatorHome />} />
            <Route path="/associator/lab-attendance" element={<AssociatorHome />} />
            <Route path="/associator/assignments" element={<AssociatorHome />} />
            <Route path="/associator/cie" element={<AssociatorHome />} />
            <Route path="/associator/cie-evaluations" element={<AssociatorHome />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
