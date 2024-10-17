import { Role } from 'src/enums/role';

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  is_first_access: boolean;
  points: number;
  created_at: Date;
  updated_at: Date;
  delete_at?: Date;
}
