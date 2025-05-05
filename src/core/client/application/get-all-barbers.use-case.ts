import { IClientRepository } from '../domain/client.repository';

export const getAllBarbersUseCase = (repository: IClientRepository) => () => repository.getAllBarbers();