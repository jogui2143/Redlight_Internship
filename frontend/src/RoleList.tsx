import React, { useEffect, useState } from 'react';
import { GetRoles, CreateRole } from './API_code';
import { RoleData, Role } from './types';
import MakeCell from './MakeCell';

type Error = {
  [key: string]: string[];
};

function RoleList() {
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [typed, setTyped] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [editable, setEditable] = useState(false);
  const [rol, setRol] = useState<Role>({ name: ''});
  const [errors, setErrors] = useState<Error | undefined>(undefined);



  const handleTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyped(e.target.value);
  };

  const handleSearch = () => {
    setSelectedRole(null); // Reset the selected role when searching
    setSearch(typed);
  };
  

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSelectedRole(null); // Reset the selected role when pressing Enter
      handleSearch();
    }
  };

  const handleKeyPressCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      CreateRole(rol).then(response=>{
        console.log(response);
        window.location.reload();
      }
      ).catch(error => {
        setErrors(error.response.data);
        console.error('Error:', error.response.data);
    });
    }
  };

  // const handleRoleClick = (roleId: string) => {
  //   setSelectedRole(roleId === selectedRole ? null : roleId);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRol({...rol, name: e.target.value});
  };


  useEffect(() => {
    // fetch roles from your API
    GetRoles(search)
      .then(response => setRoles(response))
      .catch(error => console.error('Error:', error));
  }, [search]);

  return (
    <div style={{ backgroundImage: `url('/banner2x.jpg')`,  backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
        <nav className="navbar navbar-light justify-content-between px-5 custom-navbar">
            <a className="navbar-brand" href='/'>Home</a>
            {editable ?(
              <div>
                <input onKeyDown={(e)=>handleKeyPressCreate(e)} type='text' value={rol.name} onChange={(e)=> handleChange(e)}/>
                {
                    errors && errors["name"] && 
                    <span>{errors["name"].toString()}</span>
                }
              </div>
              )
              :(
                <a className="navbar-brand hoverable"
                onClick={() => {setEditable(!editable)}}>Create</a>
              )}
            
            <form className="d-flex">
                <input onChange={handleTyped} onKeyDown={handleKeyPress} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button onClick={handleSearch} className="btn btn-outline-success" type='button' >Search</button>
            </form>
        </nav>
        <div className='my-5'>
          <ul className='list-group'>
            {
              roles.map((role) => {
                return (
                  <MakeCell role = {role} key={role.role.id}/>
              )})
            }
          </ul>
        </div>
    </div>
  );
}

export default RoleList;