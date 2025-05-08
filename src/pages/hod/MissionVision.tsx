
import React, { useState } from 'react';
import { Eye, Flag, Book, ListOrdered, Award, Edit, Save, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SectionData {
  title: string;
  content: string | string[];
  icon: React.ElementType;
  color: string;
}

const MissionVision: React.FC = () => {
  // Data state
  const [sectionData, setSectionData] = useState<Record<string, SectionData>>({
    vision: {
      title: "Vision",
      content: "To be a center of excellence in technical education and research, nurturing professionals who contribute to the development of society.",
      icon: Eye,
      color: "border-blue-400"
    },
    mission: {
      title: "Mission",
      content: "To impart quality education and foster innovation through dedicated teaching and collaborative learning.",
      icon: Flag,
      color: "border-green-400"
    },
    peo: {
      title: "Program Educational Objectives (PEO)",
      content: [
        "PEO1: Build a strong foundation in core subjects",
        "PEO2: Adapt effectively to emerging technologies",
        "PEO3: Uphold ethics and professionalism in careers"
      ],
      icon: Book,
      color: "border-yellow-400"
    },
    po: {
      title: "Program Outcomes (PO)",
      content: [
        "PO1: Engineering knowledge",
        "PO2: Problem analysis",
        "PO3: Design/development of solutions",
        "PO4: Conduct investigations of complex problems",
        "PO5: Modern tool usage",
        "PO6: The engineer and society",
        "PO7: Environment and sustainability",
        "PO8: Ethics",
        "PO9: Individual and team work",
        "PO10: Communication",
        "PO11: Project management and finance",
        "PO12: Life-long learning"
      ],
      icon: ListOrdered,
      color: "border-purple-400"
    },
    pso: {
      title: "Program Specific Outcomes (PSO)",
      content: [
        "PSO1: Apply computer science knowledge to real-world problems.",
        "PSO2: Demonstrate proficiency with modern tools and technologies."
      ],
      icon: Award,
      color: "border-red-400"
    }
  });

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Record<string, SectionData>>({});

  // Handle starting the edit
  const handleEdit = () => {
    setEditData({...sectionData});
    setIsEditing(true);
  };

  // Handle changes to string content
  const handleStringChange = (sectionKey: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        content: value
      }
    }));
  };

  // Handle changes to array content
  const handleArrayItemChange = (sectionKey: string, index: number, value: string) => {
    setEditData(prev => {
      if (!Array.isArray(prev[sectionKey].content)) return prev;
      
      const newContent = [...prev[sectionKey].content as string[]];
      newContent[index] = value;
      
      return {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          content: newContent
        }
      };
    });
  };

  // Handle save
  const handleSave = () => {
    setSectionData(editData);
    setIsEditing(false);
    // In a real application, you would save this to a database
    console.log('Saving data:', editData);
    toast({
      title: "Changes saved",
      description: "Your Mission & Vision changes have been successfully saved.",
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Render section content
  const renderSectionContent = (section: SectionData) => {
    if (Array.isArray(section.content)) {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {section.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-base">{section.content}</p>;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-academic-primary">
          Institution Mission & Vision
        </h1>
        <Button onClick={handleEdit} className="flex items-center gap-2">
          <Edit size={18} />
          Edit All
        </Button>
      </div>

      <div className="space-y-12">
        {Object.entries(sectionData).map(([key, section]) => (
          <div key={key} id={key} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <section.icon size={28} className="text-academic-primary" />
              <h2 className="text-2xl font-semibold text-academic-primary">{section.title}</h2>
            </div>
            <div className={cn("pl-6 border-l-2 py-4", section.color)}>
              {renderSectionContent(section)}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Mission & Vision</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 py-4">
            {editData && Object.entries(editData).map(([key, section]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center gap-2">
                  <section.icon size={20} className="text-academic-primary" />
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                
                {typeof section.content === 'string' ? (
                  <Textarea 
                    value={section.content} 
                    onChange={(e) => handleStringChange(key, e.target.value)}
                    rows={4}
                  />
                ) : (
                  <div className="space-y-2">
                    {(section.content as string[]).map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          value={item}
                          onChange={(e) => handleArrayItemChange(key, index, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X size={18} className="mr-2" /> Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save size={18} className="mr-2" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MissionVision;
