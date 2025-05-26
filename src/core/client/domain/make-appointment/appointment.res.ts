export interface IAppointmentRes {
    _id: string,
    client: IClient,
    barber: IBarber,
    service: IService,
    status: string,
    date: string,
    createdAt: string,
}

export interface IClient {
    _id: string,
    name: string,
    lastName: string,
    email: string,
    role: string,
    isBarberActive: boolean,
    creationDate: string,
    active: boolean,
}

export interface IBarber {
    _id: string,
    name: string,
    lastName: string,
    email: string,
    role: string,
    isBarberActive: boolean,
    creationDate: string,
    active: boolean,
}

export interface IService {
    _id: string,
    name: string,
    description: string,
    price: number,
    barber: IBarber,
    imageUrl: string,
}