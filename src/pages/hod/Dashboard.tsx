
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Complete', value: 65, color: '#4C51BF' },
  { name: 'In Progress', value: 25, color: '#ED8936' },
  { name: 'Pending', value: 10, color: '#E53E3E' },
];

const barData = [
  { name: 'CS301', passRate: 92 },
  { name: 'CS302', passRate: 85 },
  { name: 'CS303', passRate: 78 },
  { name: 'CS304', passRate: 88 },
  { name: 'CS305', passRate: 95 },
];

const lineData = [
  { month: 'Aug', attendance: 95 },
  { month: 'Sep', attendance: 93 },
  { month: 'Oct', attendance: 90 },
  { month: 'Nov', attendance: 87 },
  { month: 'Dec', attendance: 89 },
  { month: 'Jan', attendance: 92 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-academic-primary">HOD Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Academic Year:</span>
          <span className="font-medium">2023-24</span>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Faculty Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">450</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">91%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Course File Completion Status</CardTitle>
            <CardDescription>Overall completion status of course files</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Course Passing Rate</CardTitle>
            <CardDescription>Student passing percentages by course</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passRate" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Trend</CardTitle>
          <CardDescription>Average attendance percentage over the academic semester</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#4C51BF"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-2 border-b">
                <span>Review CIE evaluations</span>
                <span className="text-sm text-red-600">Due in 2 days</span>
              </li>
              <li className="flex items-center justify-between p-2 border-b">
                <span>Faculty performance review</span>
                <span className="text-sm text-amber-600">Due in 5 days</span>
              </li>
              <li className="flex items-center justify-between p-2 border-b">
                <span>Department meeting</span>
                <span className="text-sm text-blue-600">Due in 1 week</span>
              </li>
              <li className="flex items-center justify-between p-2">
                <span>Course file audit</span>
                <span className="text-sm text-blue-600">Due in 2 weeks</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-0">
            <button className="text-sm text-academic-primary hover:underline">View all tasks</button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              <li className="flex items-start p-2 border-b">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <div>
                  <p className="font-medium">CIE marks uploaded</p>
                  <p className="text-sm text-muted-foreground">Prof. Sunita uploaded CIE marks for CS302</p>
                  <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                </div>
              </li>
              <li className="flex items-start p-2 border-b">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <div>
                  <p className="font-medium">New faculty request</p>
                  <p className="text-sm text-muted-foreground">Dr. Rajesh requested leave for next week</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                </div>
              </li>
              <li className="flex items-start p-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 mr-2"></div>
                <div>
                  <p className="font-medium">Course file reminder</p>
                  <p className="text-sm text-muted-foreground">Reminder for pending course files submission</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-0">
            <button className="text-sm text-academic-primary hover:underline">View all notifications</button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
