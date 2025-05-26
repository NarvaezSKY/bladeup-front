import { ILoginReq, ILoginRes } from "./login";
import { IRegisterReq, IRegisterRes } from "./register";
import { IVerifyRes } from "./verify";

export interface IAuthRepository {
    login(data: ILoginReq): Promise<ILoginRes>;
    register(data: IRegisterReq): Promise<IRegisterRes>;
    verify(): Promise<IVerifyRes>;
}