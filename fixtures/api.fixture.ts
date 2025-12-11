import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "@baseAPI";
import { UserAPI } from "@/api-objects/clients/user.api";
import { ContactAPI } from "@/api-objects/clients/contact.api";

export class APIFixture {
    private base: BaseAPI;
    user: UserAPI;
    contact: ContactAPI;
    
    constructor(request: APIRequestContext, baseURL?: string) {
        this.base = new BaseAPI(request, baseURL);
        this.user = new UserAPI(request, baseURL);
        this.contact = new ContactAPI(request, baseURL);
    }
}