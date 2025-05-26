import { IAppointmentRes } from "@/core/client/domain/make-appointment";
import { ICreateServiceRes } from "./create-service";
import { IGetAllServicesRes } from "@/core/client/domain/get-all-services";

export interface IBarberRepository {
  createService: (data: FormData) => Promise<ICreateServiceRes>;
  getMyServices: () => Promise<IGetAllServicesRes[]>;
  getServicesByBarber: (id: string) => Promise<ICreateServiceRes[]>;
  getBarberAppointments: () => Promise<IAppointmentRes[]>;
  deleteService: (id: string) => Promise<void>;
}