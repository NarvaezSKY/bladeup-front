import { IBarberRepository } from '../domain/barber.repository';


export const deleteServiceUseCase = (barberRepository: IBarberRepository, id: string) => {
    return barberRepository.deleteService(id);

}
