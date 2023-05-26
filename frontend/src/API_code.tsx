import axios from 'axios';

import {Applicant, Role, ApplicantRole} from './types';

const request = axios.create({baseURL: 'http://localhost:3000/api/v1'});

// show all applicants
export const GetApplicants = async(search:string) => {
    const response = await request.get('/applicants/?search='+search);
    return response.data;
}

// create an applicant
export const CreateApplicant = async(applicant: FormData) => {
    const response = await request.post('/applicants', applicant);
    return response.data;
}

//show an existing applicant
export const GetApplicant = async(id: string) => {
    const response = await request.get(`/applicants/${id}`);
    return response.data;
}

// update an existing applicant
export const UpdateApplicant = async(id: number, applicant: Applicant | FormData) => {
    const response = await request.put(`/applicants/${id}`, applicant);
    return response.data;
}

//Delete an existing applicant
export const DeleteApplicant = async(id: number) => {
    const response = await request.delete(`/applicants/${id}`);
    return response.data;
}

//Search for an applicant
// export const SearchApplicant = async(search: string) => {
//     const response = await request.get(`/applicants/search?search=${search}`);
//     return response.data;
// }

//Create a role
export const CreateRole = async(role: Role) => {
    const response = await request.post('/roles', role);
    return response.data;
}

//Show all roles
export const GetRoles = async(search:string) => {
    const response = await request.get('/roles/?search='+search);
    return response.data;
}

//Show an existing role
export const GetRole = async(id: number) => {
    const response = await request.get(`/roles/${id}`);
    return response.data;
}

//Update an existing role
export const UpdateRole = async(id: number, role: Role) => {
    const response = await request.put(`/roles/${id}`, role);
    return response.data;
}

//Delete an existing role
export const DeleteRole = async(id: number) => {
    const response = await request.delete(`/roles/${id}`);
    return response.data;
}

//Search for a role
// export const SearchRole = async(search: string) => {
//     const response = await request.get(`/roles/search?search=${search}`);
//     return response.data;
// }

//Change applicant status on a given role
export const ChangeStatus = async(applicantId: number, roleId: number, status: string) => {
    const response = await request.put(`/applicants_roles/${applicantId}/${roleId}`, {'status': status});
    return response.data;
}

//add role to applicant
export const AddRole = async(applicantRole: ApplicantRole) => {
    const response = await request.post(`/applicants_roles`, applicantRole);
    return response.data;
}

//remove role from applicant
export const RemoveRole = async(applicantId: number, roleId: number) => {
    const response = await request.delete(`/applicants_roles/${applicantId}/${roleId}`);
    return response.data;
}

//show all applicants without an specific role
export const Search_without_x_role = async(roleId: number) => {
    const response = await request.get(`/applicants/search_without_x_role/${roleId}`);
    return response.data;
}