import {Authentication} from "./authentication";

export class WebUser {
  id: number;
  email: string = "frontend@capjavert.dev";
  password: string = "12345";
  token: string;

  public authenticate(auth: Authentication) {
    this.token = auth.token;
  }
}
