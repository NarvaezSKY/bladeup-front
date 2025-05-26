import { IBarberRepository } from '../domain/barber.repository';

export const getBarberAppointmentsUseCase = (barberRepository: IBarberRepository) => {
    return barberRepository.getBarberAppointments;
}