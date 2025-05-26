import { IGetAllServicesRes } from "@/core/client/domain/get-all-services";
import { Button, Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useBarberHomeData } from "../hooks/useHome";

interface IDeleteServiceFormProps {
  service: IGetAllServicesRes;
  onclose: () => void;
}

export const DeleteServiceForm = ({
  service,
  onclose,
}: IDeleteServiceFormProps) => {
  const { handleDeleteService } = useBarberHomeData();

  return (
    <div>
      <Card
        shadow="sm"
        className="min-w-[260px] max-w-[260px] bg-default-200 flex-shrink-0  border-1 border-secondary"
      >
        <CardBody className="overflow-visible p-0 flex justify-center items-center">
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
        <CardFooter className="flex flex-col justify-center items-start p-2 gap-1">
          <b>{service.name}</b>
          <b className="truncate w-full">{service.description}</b>
          <p className="text-default-500">${service.price}</p>
        </CardFooter>
      </Card>

      <p className="text-default-500 text-sm mt-4">
        ¿Estás seguro de que deseas eliminar este servicio? Esta acción no se
        puede deshacer.
      </p>
      <div className="flex gap-2 mt-4">
        <Button
          fullWidth
          variant="bordered"
          color="danger"
          onClick={() => {
            handleDeleteService(service._id);
            onclose();
          }}
        >
          Eliminar
        </Button>
        <Button
          fullWidth
          variant="bordered"
          color="secondary"
          onClick={() => {
            onclose();
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
