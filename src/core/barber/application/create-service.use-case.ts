import { IBarberRepository } from '../domain/barber.repository';

export const createServiceUseCase = (repository: IBarberRepository) => {
    return repository.createService
}