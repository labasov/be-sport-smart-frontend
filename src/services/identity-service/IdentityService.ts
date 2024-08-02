import { RestServiceBase } from "../RestService";

import { UserInfo } from "./interfaces";


export class IdentityService extends RestServiceBase {
  public constructor(baseUrl: string) {
    super(baseUrl, '/identity');
  }

  public async signIn(userName: string | undefined, email: string | undefined, password: string): Promise<{ userName: string}> {
    return await this.post('signIn',
    {
      userName,
      email,
      password
    });
  }

  public async signUp(userName: string | undefined, email: string | undefined, password: string): Promise<void> {
    await this.post('signUp',
    {
      userName,
      email,
      password
    });
  }

  public async signOut(): Promise<void> {
    await this.post('signOut');
  }

  public async getUserInfo(): Promise<UserInfo> {
    return await this.post<UserInfo>('getUserInfo');
  }
}