import React, { useEffect, useState, useRef } from 'react';
import { GetApplicant, UpdateApplicant, DeleteApplicant } from './API_code';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicantData } from './types';
import RoleElement from './RoleElement';

type Error = {
  [key: string]: string[];
};


type RouteParams = {
  id: string; // Assuming the id parameter is a string
}

type EditableState = {
  [key: string]: boolean;
}

function ApplicantDetails() {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState<ApplicantData>({ applicant: { name: '', email: '', phone: '' }, roles: [] });
  const [editable, setEditable] = useState<EditableState>({ name: false, email: false, phone: false });
  const [errors, setErrors] = useState<Error | undefined>(undefined);
  const ref = useRef<HTMLImageElement>(null);

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, field: string) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleEdit(field);
    }
};

  useEffect(() => {
    if (id === undefined) return;
    GetApplicant(id)
      .then(response => setApplicant(response))
      .catch(error => console.error('Error:', error));
  }, []);


  const handleEdit = (field: string) => {
    setEditable((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    if (editable[field] && applicant.applicant.id !== undefined){
        UpdateApplicant(applicant.applicant.id, applicant.applicant)
        .then(() => setErrors(undefined))
        .catch(error => {
          setErrors(error.response.data);
          setEditable((prevState) => ({ ...prevState, [field]: !prevState[field] }));
        });
    }

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setApplicant((prevState) => ({
      ...prevState,
      applicant: { ...prevState.applicant, [field]: e.target.value },
    }));
  };

  const handleDelete = () => {
    if (applicant.applicant.id !== undefined) {
        DeleteApplicant(applicant.applicant.id)
          .then(response => {
            console.log(response);
            navigate('/applicants'); // Redirect to the specified URL after deletion
          })
          .catch(error => console.error('Error:', error));
      }
    };

    const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        setApplicant((prevState) => ({
            ...prevState,
            [name]: files && URL.createObjectURL(files[0]),
        }));
            if (files){
                ref.current!.src = URL.createObjectURL(files[0]);
                const formData = new FormData()
                formData.append('applicant[avatar]', files[0]);
                if (applicant.applicant.id !== undefined)
                    UpdateApplicant(applicant.applicant.id, formData)
                    .then(response => console.log(response))
                    .catch(error => console.error('Error:', error));
                
            }
            
    };

  return (
    <div style={{ backgroundImage: `url('/banner2x.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <nav className="navbar navbar-light justify-content-between px-5 custom-navbar">
        <a className="navbar-brand" href='/'>Home</a>
      </nav>
      <div className="container py-5 mx-auto">
        <label className='hoverable' htmlFor="applicant[avatar]">
            <img ref={ref} id='avatar_image' src={applicant.applicant.avatar_url} alt="avatar" className='avatar' />
            <input type="file" name="applicant[avatar]" id="applicant[avatar]" onChange={(e) => imageChange(e)} hidden/>
        </label>
        <div className='py-5'>
          <div>
            <span style={{ width: 'content-fit' }} className="fontsize">Name: </span>
            {editable.name ? (
              <div> 
                <input onKeyDown={(e)=> handleKeyPress(e, "name")} type="text" value={applicant.applicant.name} onChange={(e) => handleInputChange(e, 'name')} />
                {errors && errors["name"] &&
                <span className="error">{errors["name"].toString()}</span>}
              </div>
            ) : (
              <span className="fontsize">{applicant.applicant.name}</span>
            )}
            <button type="button" className="btn btn-outline-dark buttonFix" onClick={() => handleEdit('name')}>
              <img className='resizeImage' src="/pencil.svg" alt='Image' />
            </button>
          </div>
          <div>
            <span style={{ width: 'content-fit' }} className="fontsize">E-mail: </span>
            {editable.email ? (
              <div> 
                <input onKeyDown={(e)=> handleKeyPress(e, "email")} type="text" value={applicant.applicant.email} onChange={(e) => handleInputChange(e, 'email')} />
                {errors && errors["email"] &&
                <span className="error">{errors["email"].toString()}</span>}
              </div>
            ) : (
              <span className="fontsize">{applicant.applicant.email}</span>
            )}
            <button type="button" className="btn btn-outline-dark buttonFix" onClick={() => handleEdit('email')}>
              <img className='resizeImage' src="/pencil.svg" alt='Image' />
            </button>
          </div>
          <div>
            <span style={{ width: 'content-fit' }} className="fontsize">Phone: </span>
            {editable.phone ? (
              <input onKeyDown={(e)=> handleKeyPress(e, "phone")} type="text" value={applicant.applicant.phone} onChange={(e) => handleInputChange(e, 'phone')} />
            ) : (
              <span className="fontsize">{applicant.applicant.phone}</span>
            )}
            <button type="button" className="btn btn-outline-dark buttonFix" onClick={() => handleEdit('phone')}>
              <img className='resizeImage' src="/pencil.svg" alt='Image' />
            </button>
          </div>
          <div>
            <span style={{ width: 'content-fit' }} className="fontsize">Roles:</span>
            <ul>
              {
                applicant.roles.map((role) => {
                  return (
                    <li key={role.id}>
                        <RoleElement role={role} applicantId={applicant.applicant.id||1}/>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
                <button type="button" className="btn btn-outline-dark buttonFix" onClick={() => handleDelete()}>
                    <img className='resizeImage' src="/trash.svg" alt='Image' />
                </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDetails;
