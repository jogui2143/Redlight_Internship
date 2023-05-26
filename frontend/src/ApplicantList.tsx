import React, { useEffect, useState } from 'react';
import { GetApplicants } from './API_code';
import { ApplicantData } from './types';

function ApplicantList() {
  const [applicants, setApplicants] = useState<ApplicantData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [typed, setTyped] = useState<string>('');

  //handler to update typed state
    const handleTyped = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTyped(event.target.value);
        if (event.target.value === '') {
            setSearch('');
        }
    };

    //handler to update search state
    const handleSearch = () => {
        setSearch(typed);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

  useEffect(() => {
    // fetch applicants from your API
    GetApplicants(search)
    .then(response => setApplicants(response))
    .catch(error => console.error('Error:', error));
  }, [search]);
  return (
    <div style={{ backgroundImage: `url('/banner2x.jpg')`,  backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
        <nav className="navbar navbar-light justify-content-between px-5 custom-navbar">
            <a className="navbar-brand" href='/'>Home</a>
            <a className="navbar-brand" href='/applicants/new'>Create</a>
            <form className="d-flex">
                <input onChange={handleTyped} onKeyDown={handleKeyPress} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button onClick={handleSearch} className="btn btn-outline-success" type='button' >Search</button>
            </form>
        </nav>
        <div className="container grid-container py-5 mx-auto">
            {
                applicants.map((applicant) => {
                    const app = applicant.applicant;
                    return (
                        <a key={app.id} className='d-flex flex-column px-2 custom-link container-item' href={`/applicants/${app.id}`}>
                            <img src={app.avatar_url} alt="avatar" className='grid-item avatar' />
                            <span className='name'>{app.name}</span>
                        </a>
                    );
                })
            }
        </div>
    </div>
  );
}

export default ApplicantList;