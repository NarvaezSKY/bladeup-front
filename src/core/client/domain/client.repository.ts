import { IGetAllBarbersRes } from "./get-all-barbers";
import { IGetAllServicesRes } from "./get-all-services";

export interface IClientRepository {
  getAllBarbers: () => Promise<IGetAllBarbersRes[]>;
  getAllServices: () => Promise<IGetAllServicesRes[]>;
}