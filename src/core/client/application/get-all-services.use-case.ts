import { IClientRepository } from '../domain/client.repository';


export const getAllServicesUseCase = (repository: IClientRepository) => () => repository.getAllServices();