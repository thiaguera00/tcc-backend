export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  level?: string;
  points?: number;
  is_first_access?: boolean;
}
