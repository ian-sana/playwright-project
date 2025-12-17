export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateUserPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {}

export interface LoginUserPaylod {
  email: string;
  password: string;
}
