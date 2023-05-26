import React, { useEffect, useState } from 'react';
import { Role } from './types';
import { ChangeStatus } from './API_code';

function RoleElement(props: { role: Role, applicantId: number }) {
    const [status, setStatus] = useState(props.role.status);
    const [editable, setEditable] = useState(false);

  useEffect(() => {
    setStatus(props.role.status);
  }, [props.role.status]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
};

const handleToggle = () => {
    setEditable(!editable);
    if(!props.role.id || !editable || !status) return;
    ChangeStatus(props.applicantId, props.role.id, status)
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));
};

  return (
    <>
        <a className='fontSize2' href={`/roles/${props.role.id}`}>{props.role.name}: </a>
    {editable ? (
        <select className="dropDownSize" value={status} onChange={handleChange}>
          <option value="under_analysis">under analysis</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        ) : (
        <span className='fontSize2' >{status}</span>
            )}
    <button type="button" className="btn btn-outline-dark buttonFix" onClick={() => handleToggle()}>
        <img className='resizeImage' src="/pencil.svg" alt='edit' />
    </button>
    </>
  );
}

export default RoleElement;