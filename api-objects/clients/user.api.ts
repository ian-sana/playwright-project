import { BaseAPI } from '@baseAPI';
import { User, CreateUserPayload, UpdateUserPayload, LoginUserPaylod } from '@/api-objects/models/user.model';
import { ENDPOINTS } from '@/enums/api-endpoints';

export class UserAPI extends BaseAPI {

  async getUsers(): Promise<User[]> {
    const response = await this.get(ENDPOINTS.USERS);
    return response.json();
  }

  async getUserById(userId: number): Promise<User> {
    const response = await this.get(`${ENDPOINTS.USERS}/${userId}`);
    return response.json();
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    const response = await this.post(ENDPOINTS.USERS, { data: payload });
    return response.json();
  }

  async updateUser(userId: number, payload: UpdateUserPayload): Promise<User> {
    const response = await this.put(`${ENDPOINTS.USERS}/${userId}`, { data: payload });
    return response.json();
  }

  async deleteUser(userId: number): Promise<void> {
    await this.delete(`${ENDPOINTS.USERS}/${userId}`);
  }

  async login(payload: LoginUserPaylod) { 
    const response = await this.post(ENDPOINTS.LOGIN, { data: payload });
    return response.json();
  }
}
