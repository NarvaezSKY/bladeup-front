import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@heroui/react";
import { format } from "date-fns";

interface AppointmentCardProps {
  appointment: {
    _id: string;
    client: { name: string; lastName: string };
    barber: { name: string; lastName: string };
    service: {
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    };
    status: string;
    date: string;
  };
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { client, barber, service, status, date } = appointment;

  return (
    <Card className="w-[280px] min-w-[280px] max-w-[280px] flex-shrink-0 border border-secondary bg-default-50 shadow-sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-sm text-default-500 font-semibold">Servicio</p>
        <h4 className="font-bold text-large">{service.name}</h4>
        <p className="text-sm text-default-500">{service.description}</p>
      </CardHeader>

      <CardBody className="overflow-visible p-0 flex items-center justify-center">
        <Image
          alt={service.name}
          className="object-cover h-[100px]"
          radius="lg"
          shadow="sm"
          width={300}
          height={300}
          src={service.imageUrl}
        />
      </CardBody>

      <CardBody className="px-4 py-2 space-y-1">
        <div className="text-sm">
          <strong>Cliente:</strong> {client.name} {client.lastName} (Tú)
        </div>
        <div className="text-sm">
          <strong>Barbero:</strong> {barber.name} {barber.lastName}
        </div>
        <div className="text-sm">
          <strong>Fecha:</strong> {format(new Date(date), "dd MMM yyyy, HH:mm")}
        </div>
        <div className="text-sm">
          <strong>Precio:</strong> ${service.price.toLocaleString()}
        </div>
      </CardBody>

      <CardFooter className="px-4 py-2 flex justify-end">
        <Button
          color={status === "pending" ? "secondary" : "success"}
          variant="ghost"
          radius="full"
          size="sm"
          className="w-full"
          disabled={status !== "pending"}
        >
          <b className="text-sm">{status.toUpperCase()}</b>
        </Button>
      </CardFooter>
    </Card>
  );
};
