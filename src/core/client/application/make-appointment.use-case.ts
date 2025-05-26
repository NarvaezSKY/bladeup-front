import { IClientRepository } from "../domain/client.repository";
import { IMakeAppointmentReq } from "../domain/make-appointment";

export const makeAppointmentUseCase = (repository: IClientRepository) => 
  (data: IMakeAppointmentReq) => repository.makeAppointment(data);
