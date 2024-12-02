export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface IUpdateUser {
    name?: string;
    email?: string;
    level?: string;
    points?: number;
    password?: string;
    is_first_access?: boolean;
}