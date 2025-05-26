export interface IAppointmentRepository {
    updateAppointmentStatus: (id: string, status: string) => Promise<void>;
}