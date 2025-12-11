import { BaseAPI } from '@baseAPI';
import { User, CreateUserPayload, UpdateUserPayload, LoginUserPaylod } from '@/api-objects/models/user.model';
import { ENDPOINTS } from '@/enums/api-endpoints';
import { ApiResponseHandler } from '@/utils/api-response-handler';

export class UserAPI extends BaseAPI {

  async getUsers() {
    const response = await this.get(ENDPOINTS.USERS);
    return response;
  }

  async getUserById(userId: number) {
    const response = await this.get(`${ENDPOINTS.USERS}/${userId}`);
    return response;
  }

  async createUser(payload: CreateUserPayload){
    const response = await this.post(ENDPOINTS.USERS, { data: payload });
    return response;
  }

  async updateUser(userId: number, payload: UpdateUserPayload) {
    const response = await this.put(`${ENDPOINTS.USERS}/${userId}`, { data: payload });
    return response;
  }

  async deleteUser(userId: number) {
    const response = await this.delete(`${ENDPOINTS.USERS}/${userId}`);
    return response;
  }

  async login(payload: LoginUserPaylod) { 
    const response = await this.post(ENDPOINTS.LOGIN, { data: payload });
    return response;
  }


  /* to be continued */

  // async getUsers(): Promise<User[]> {
  //   const response = await this.get(ENDPOINTS.USERS);
  //   return await ApiResponseHandler.validateAndGetJson<User[]>(response, 200);
  // }

  // async getUserById(userId: number): Promise<User> {
  //   const response = await this.get(`${ENDPOINTS.USERS}/${userId}`);
  //   return await ApiResponseHandler.validateAndGetJson<User>(response, 200);
  // }

  // async createUser(payload: CreateUserPayload): Promise<User> {
  //   const response = await this.post(ENDPOINTS.USERS, { data: payload });
  //   return await ApiResponseHandler.validateAndGetJson<User>(response, 201);
  // }

  // async updateUser(userId: number, payload: UpdateUserPayload): Promise<User> {
  //   const response = await this.put(`${ENDPOINTS.USERS}/${userId}`, { data: payload });
  //   return await ApiResponseHandler.validateAndGetJson<User>(response, 200);
  // }

  // async deleteUser(userId: number): Promise<void> {
  //   const response = await this.delete(`${ENDPOINTS.USERS}/${userId}`);
  //   await ApiResponseHandler.validateStatus(response, 204);
  // }

  // async login(payload: LoginUserPaylod) { 
  //   const response = await this.post(ENDPOINTS.LOGIN, { data: payload });
  //   return await ApiResponseHandler.validateAndGetJson<User>(response, 200);
  // }
}
