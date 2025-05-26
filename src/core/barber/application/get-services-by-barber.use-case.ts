import { IBarberRepository } from '../domain/barber.repository';

export const getServicesByBarberUseCase = (repository: IBarberRepository) => {
    return repository.getServicesByBarber;
}