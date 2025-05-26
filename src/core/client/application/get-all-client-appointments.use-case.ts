import { IClientRepository } from '../domain/client.repository';

export const getAllClientAppointmentsUseCase = (repository: IClientRepository) =>
  () => repository.getAllClientAppointments();
