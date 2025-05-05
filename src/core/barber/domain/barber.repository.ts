import { ICreateServiceReq } from "./create-service";
import { ICreateServiceRes } from "./create-service";

export interface IBarberRepository {
  createService: (data: ICreateServiceReq) => Promise<ICreateServiceRes>;
}