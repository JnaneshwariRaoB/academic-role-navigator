// authContext.tsx or a similar authentication context file

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext<{ role: string; setRole: React.Dispatch<React.SetStateAction<string>> }>({
  role: 'HOD',
  setRole: () => {},
});

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('HOD'); // Default role set to 'HOD'

  // ... your existing authentication logic

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
