import { UserAPI } from "@/api-objects/clients/user.api"
import { ContactAPI } from "./clients/contact.api";

export type APIClients = {
  user: UserAPI;
  contact: ContactAPI;
};