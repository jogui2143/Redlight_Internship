// ApplicantsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ApplicantsPage() {
  // Add your applicant-related functionality here
  
  return (
    <div>
      <h2>Applicants</h2>
      <ul>
        <li>
            <Link to="/applicants/create">Create New Applicant</Link>
        </li>
        <li>
            <Link to="/applicants/list">List Existing Applicants</Link>
        </li>
        <li>
            <Link to="/applicants/show/id">Show Existing Applicant</Link>
        </li>
        <li>
            <Link to="/applicants/list">List Existing Applicants</Link>
        </li>
      </ul>
    </div>
  );
}

export default ApplicantsPage;