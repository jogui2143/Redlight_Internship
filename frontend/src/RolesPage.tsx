// RolesPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RolesPage() {
  // Add your role-related functionality here
  
  return (
    <div>
      <h2>Roles</h2>
      <Link to="/roles/create">Create New Role</Link>
      <Link to="/roles/list">List Existing Roles</Link>
    </div>
  );
}

export default RolesPage;
