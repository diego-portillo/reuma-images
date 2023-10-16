import { useRouter } from 'next/router';
import React from 'react';

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const { userName } = router.query;

  return (
    <div>
      <h1>User Dashboard for {userName}</h1>
      {/* Add content for the user dashboard here */}
    </div>
  );
};

export default UserDashboard;
