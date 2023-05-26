import React, {useState} from "react";
import {Applicant} from "./types";
import { ChangeStatus, RemoveRole } from './API_code';

function EditCell(props:{role_id: number | undefined, applicant: Applicant}){
    const [status, setStatus] = useState(props.applicant.status);
    const [editable, setEditable] = useState(false);

    const [visible, setVisible] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    }

    const handleToggle = () => {
        setEditable(!editable);
        if(!props.role_id || !editable || !status || !props.applicant.id) return;
        ChangeStatus(props.applicant.id, props.role_id, status)
        .then(response => console.log(response))
        .catch(error => console.error('Error:', error));
    }

    const handleDelete = () => {
        if(!props.role_id || !props.applicant.id) return;
        RemoveRole(props.applicant.id, props.role_id)
        .then(response => console.log(response))
        .catch(error => console.error('Error:', error));
        setVisible(false);
    }

    return (
        <>
        {
            visible &&
            <li key={props.applicant.id} className=' centerText'>{props.applicant.name} -&nbsp;
                {editable ? (
                    <select className="dropDownSize" value={status} onChange={handleChange}>
                        <option value="under_analysis">under analysis</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                ) : (
                    <span className='fontSize1' >{status}</span>
                )}
                <button type="button" className="btn btn-outline-dark buttonFix" onClick={handleToggle}>
                    <img className='resizeImage' src="/pencil.svg" alt='Image' />
                </button>
                {/* button to delete the role from the applicant */}
                <button type="button" className="btn btn-outline-dark buttonFix" onClick={handleDelete}>
                    <img className='resizeImage' src="/trash.svg" alt='Image' />
                </button>
            </li>
        }
            
        </>
    );
};

export default EditCell;