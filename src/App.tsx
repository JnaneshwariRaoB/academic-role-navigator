
// src/App.jsx
import { useEffect } from "react";
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
import COPOMapping from "./pages/coordinator/COPOMapping";

// Inline external redirect component
const RedirectExternal = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
};

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
            <Route path="/hod/mission" element={
              <div className="h-full w-full">
                {/* The mission content is now handled within the sidebar component */}
                <div className="text-center text-gray-500 mt-10">
                  Select a section from the right sidebar to view details.
                </div>
              </div>
            } />

            {/* Coordinator Routes */}
            <Route
              path="/coordinator/home"
              element={<RedirectExternal to="https://role-route-navigator.lovable.app/coordinator/home" />}
            />
            <Route
              path="/coordinator/course-builder"
              element={<RedirectExternal to="https://role-route-navigator.lovable.app/coordinator/home" />}
            />
            <Route
              path="/coordinator/cie"
              element={<RedirectExternal to="https://role-route-navigator.lovable.app/coordinator/home" />}
            />
            <Route path="/coordinator/co-attainment" element={<COPOMapping />} />
            <Route
              path="/coordinator/gd-attendance"
              element={<RedirectExternal to="https://role-route-navigator.lovable.app/coordinator/home" />}
            />
            <Route
              path="/coordinator/mentoring"
              element={<RedirectExternal to="https://role-route-navigator.lovable.app/coordinator/home" />}
            />

            {/* Associator Routes */}
            <Route
              path="/associator/home"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
            <Route
              path="/associator/subject-builder"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
            <Route
              path="/associator/my-batches"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
            <Route
              path="/associator/attendance"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
            <Route
              path="/associator/lab-attendance"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
            <Route
              path="/associator/assignments"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
            <Route
              path="/associator/cie"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
            <Route
              path="/associator/cie-evaluations"
              element={<RedirectExternal to="https://subject-insight-tool.lovable.app/" />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
