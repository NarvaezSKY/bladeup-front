import { ILoginReq, ILoginRes } from "./login";
import { IRegisterReq } from "./register";

export interface IAuthRepository {
    login(data: ILoginReq): Promise<ILoginRes>;
    register (data: IRegisterReq): Promise<any>;
}