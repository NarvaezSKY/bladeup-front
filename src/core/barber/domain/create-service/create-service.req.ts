export interface ICreateServiceReq {
  name: string;
  price: number;
  description: string;
  category: 'Corte clásico' | 'Fade' | 'Diseño' | 'Barba' | 'Color' | 'Tratamiento' | 'Otro';
  image: File
}