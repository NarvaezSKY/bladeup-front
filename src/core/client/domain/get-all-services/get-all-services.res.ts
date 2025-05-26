export interface IGetAllServicesRes {
  _id: string;
  name: string;
  price: number;
  description: string;
  barber: IBbarber;
  imageUrl: string;
  category: 'Corte clásico' | 'Fade' | 'Diseño' | 'Barba' | 'Color' | 'Tratamiento' | 'Otro';

}

interface IBbarber {
  _id: string;
  name: string;
  lastName: string;
}