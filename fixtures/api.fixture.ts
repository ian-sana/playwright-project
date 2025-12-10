import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "@baseAPI";
import { UserAPI } from "@/api-objects/clients/user.api";

export class APIFixture {
    private base: BaseAPI;
    user: UserAPI;
    
    constructor(request: APIRequestContext, baseURL?: string) {
        this.base = new BaseAPI(request, baseURL);
        this.user = new UserAPI(request, baseURL);
    }
}