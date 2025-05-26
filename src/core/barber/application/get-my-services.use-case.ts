import { IBarberRepository } from "../domain/barber.repository";

export const getMyServicesUseCase = async (barberRepository: IBarberRepository) => {
    return barberRepository.getMyServices();
};