import React, {useState} from 'react';
import {CreateRole} from './API_code';

function RoleForm(){
    const [role, setRole] = useState({name: ''});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRole((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        CreateRole(role).then(response=>{
            console.log(response);
        }
        ).catch(error => console.error('Error:', error));
    };

    return (
        <div>
        <h1>Create Role</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Name:
            <input
                type="text"
                name="name"
                value={role.name || '' }
                onChange={handleChange}
            />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </div>
    );
}

export default RoleForm;