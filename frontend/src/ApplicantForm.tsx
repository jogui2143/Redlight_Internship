import React, { useState } from 'react';
import { CreateApplicant } from './API_code';
import { ApplicantFormData } from './types';
import {useNavigate} from 'react-router-dom';

type Error = {
    [key: string]: string[];
 };

function ApplicantForm() {
    const [applicant, setApplicant] = useState<ApplicantFormData>({ "applicant[name]": '', "applicant[email]": '', "applicant[phone]" : '', "applicant[avatar]": undefined });
    const [errors, setErrors] = useState<Error | undefined>(undefined);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setApplicant((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('applicant[name]', applicant["applicant[name]"]);
        formData.append('applicant[email]', applicant["applicant[email]"]);
        formData.append('applicant[phone]', applicant["applicant[phone]"]);
        if (applicant["applicant[avatar]"] !== undefined)
            formData.append('applicant[avatar]', applicant["applicant[avatar]"]);
        CreateApplicant(formData).then(response=>{
            navigate('/applicants');
        }
        ).catch(error => {
            setErrors(error.response.data);
            console.error('Error:', error.response.data);
        });
    };


    const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        setApplicant((prevState) => ({
            ...prevState,
            [name]: files && files[0],
        }));
    };



    
    return (
        <div style={{ backgroundImage: `url('/banner2x.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
        <h1>Create Applicant</h1>
        <form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
            <label className='d-flex flex-column gap-1'>
            Name:
            <input className='fixForm'
                type="text"
                name="applicant[name]"
                value={applicant["applicant[name]"] || '' }
                onChange={handleChange}
            />
            {
                errors && errors["name"] && 
                <span>{errors["name"].toString()}</span>
            }
            </label>
            <label className='d-flex flex-column gap-1'>
            E-mail:
            <input className='fixForm'
                type="text"
                name="applicant[email]"
                value={applicant["applicant[email]"] || '' }
                onChange={handleChange}
            /> 
            {
                errors && errors["email"] && 
                <span>{errors["email"].toString()}</span>
            }
            </label>
            <label className='d-flex flex-column gap-1'>
            Phone:
            <input className='fixForm'
                type="text"
                name="applicant[phone]"
                value={applicant["applicant[phone]"] || '' }
                onChange={handleChange}
            />
            </label>
            <label className='d-flex flex-column gap-1'>
                Avatar:
                <input
                type="file"
                name="applicant[avatar]"
                onChange={imageChange}
                />
            </label>
            <input type="submit" value="Submit" className='fixForm'/>
        </form>
        </div>
    );
    }

export default ApplicantForm;