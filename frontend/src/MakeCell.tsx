import React, { useState, useRef } from 'react';
import { RoleData, ApplicantData } from './types';
import EditCell from './EditCell';
import {
	UpdateRole,
	DeleteRole,
	AddRole,
	Search_without_x_role,
} from './API_code';

type Error = {
	[key: string]: string[];
};

function MakeCell(props: { role: RoleData }) {
	const [selected, setSelected] = useState<Boolean>(false);
	const [editable, setEditable] = useState(false);
	const [rol, setRol] = useState(props.role.role);
	const [applicantsWithoutRole, setApplicantsWithoutRole] = useState<
		ApplicantData[]
	>([]);
	const [errors, setErrors] = useState<Error | undefined>(undefined);
	const ref = useRef<HTMLDialogElement>(null);

	const handleShowDropdown = () => {
		if (rol.id !== undefined) {
			Search_without_x_role(rol.id)
				.then(applicants => {
					setApplicantsWithoutRole(applicants);
					ref.current?.showModal();
				})
				.catch(error => console.error('Error:', error));
		}
	};

	const handleApplicantSelection = (applicant: ApplicantData) => {
		if (rol.id === undefined || applicant.applicant.id === undefined) return;
		AddRole({
			applicant_id: applicant.applicant.id,
			role_id: rol.id,
			status: 'under_analysis',
		})
			.then(response => {
				console.log(response);
				window.location.reload();
			})
			.catch(error => console.error('Error:', error));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRol({ ...rol, name: e.target.value });
	};

	const handleEdit = () => {
		setEditable(!editable);
		if (editable && rol.id !== undefined) {
			UpdateRole(rol.id, rol)
				.then(() => setErrors(undefined))
				.catch(error => {
					setErrors(error.response.data);
					setEditable(editable);
				});
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleEdit();
		}
	};

	const handleDelete = () => {
		if (rol.id !== undefined) {
			DeleteRole(rol.id)
				.then(response => {
					console.log(response);
					window.location.reload();
				})
				.catch(error => console.error('Error:', error));
		}
	};

	return (
		<div className='d-flex marginFix'>
			<button
				type='button'
				className='btn btn-outline-dark buttonFix marginFix2 '
				onClick={() => handleDelete()}
			>
				<img className='resizeImage' src='/trash.svg' alt='trash' />
			</button>
			<div key={rol.id} className='hoverable fixRoles'>
				<div
					className={`px-2 custom-link container-item listCell ${
						selected ? 'expanded' : ''
					}`}
					onClick={() => setSelected(!selected)}
				>
					{editable ? (
						<div>
							<input
								onKeyDown={e => handleKeyPress(e)}
								type='text'
								value={rol.name}
								onChange={e => handleChange(e)}
							/>
							{errors && errors['name'] && (
								<span>{errors['name'].toString()}</span>
							)}
						</div>
					) : (
						<span className='name'>{rol.name}</span>
					)}
				</div>

				{selected && (
					<ul className='list-group'>
						{props.role.applicants.map(applicant => (
							<EditCell role_id={rol.id} applicant={applicant} />
						))}
					</ul>
				)}
			</div>
			<button
				type='button'
				className='btn btn-outline-dark buttonFix'
				onClick={handleEdit}
			>
				<img className='resizeImage' src='/pencil.svg' alt='edit' />
			</button>
			<button
				type='button'
				className='btn btn-outline-dark buttonFix'
				onClick={handleShowDropdown}
			>
				<img className='resizeImage' src='/plus.svg' alt='edit' />
			</button>
			<dialog ref={ref} className='dropdown'>
				<button onClick={() => ref.current?.close()}>Close</button>
				<div className='dropdown-content d-flex flex-column'>
					{applicantsWithoutRole.map(applicant => (
						<div
							className='hoverable colorHoverable'
							key={applicant.applicant.id}
							onClick={() => handleApplicantSelection(applicant)}
						>
							{applicant.applicant.name}
						</div>
					))}
				</div>
			</dialog>
		</div>
	);
}

export default MakeCell;
