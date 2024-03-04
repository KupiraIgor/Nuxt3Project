export interface User {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  position_id?: number | any;
  registration_timestamp?: number;
  photo?: string;
}
export interface Users {
  success: boolean;
  total_pages: number;
  total_users: number;
  count: number;
  page: number;
  users: User[];
}

export interface Token {
  success: boolean;
  token: string;
}
export interface Position {
  id: number;
  name: string;
}
export interface Positions {
  success: boolean;
  positions: Position[];
}

export interface ResUser {
  success: boolean;
  message: string;
}
