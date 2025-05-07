
import { Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import { RoleProvider } from '@/context/RoleContext';

const Index = () => {
  return (
    <RoleProvider>
      <Welcome />
    </RoleProvider>
  );
};

export default Index;
