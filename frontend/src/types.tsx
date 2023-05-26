export type Applicant = {
    'name': string,
    'email': string,
    'phone': string,
    'id'?: number,
    'status'?: string,
    'avatar_url'?: string
};

export type Role = {
    'name': string,
    'id'?: number,
    'status'?: string
};

export type ApplicantRole = {
    'applicant_id': number,
    'role_id': number,
    'status': string
};

export type ApplicantData = {
    'applicant': Applicant,
    'roles': Role[];
};

export type RoleData = {
    'role': Role,
    'applicants': Applicant[];
};

export type ApplicantFormData = {
    "applicant[name]": string,
    "applicant[email]": string,
    "applicant[phone]": string,
    "applicant[avatar]"?: string | Blob;
};



