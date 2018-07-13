import { User } from './user';

export interface UserList {
  users: User[];
  total: number;
  nextPage: string;
}
