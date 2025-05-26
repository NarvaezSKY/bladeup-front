import { IAppointmentRepository } from "../domain/apponitment.repository";

export const updateAppointmentStatusUseCase = (repository: IAppointmentRepository) => {
    return repository.updateAppointmentStatus
}