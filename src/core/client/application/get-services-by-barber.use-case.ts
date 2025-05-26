import { IClientRepository } from '../domain/client.repository';

export const getServicesByBarberUseCase = (repository: IClientRepository, barberId: string) => () => repository.getServicesByBarber(barberId);