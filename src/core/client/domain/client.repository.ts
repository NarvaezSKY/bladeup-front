import { IGetAllBarbersRes } from "./get-all-barbers";
import { IGetAllServicesRes } from "./get-all-services";
import { IAppointmentRes, IMakeAppointmentReq, IService } from "./make-appointment";

export interface IClientRepository {
  getAllBarbers: () => Promise<IGetAllBarbersRes[]>;
  getAllServices: () => Promise<IGetAllServicesRes[]>;
  makeAppointment: (data: IMakeAppointmentReq) => Promise<IAppointmentRes>;
  getAllClientAppointments: () => Promise<IAppointmentRes[]>;
  getServicesByBarber: (
    barberId: string
  ) => Promise<IService[]>;
}