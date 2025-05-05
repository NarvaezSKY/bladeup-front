import DefaultLayout from "@/layouts/default";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  CardFooter,
  Button,
  Divider,
} from "@heroui/react";

const mockRequests = [
  {
    service: "Corte degradado",
    description: "Me gustaría un degradado clásico con un diseño en el lateral.",
    price: "$20.000",
    user: {
      name: "Juan Pérez",
      avatar: "https://heroui.com/avatars/avatar-1.png",
    },
  },
  {
    service: "Arreglo de cabello",
    description: "Necesito un alisado y corte de puntas",
    price: "$15.000",
    user: {
      name: "Luis Martínez",
      avatar: "https://heroui.com/avatars/avatar-2.png",
    },
  },
  {
    service: "Corte + diseño personalizado",
    description: "Busco un corte moderno con diseño en ambos lados.",
    price: "$30.000",
    user: {
      name: "Carlos Gómez",
      avatar: "https://heroui.com/avatars/avatar-3.png",
    },
  },
  {
    service: "Perfilado de cejas",
    description: "Quiero un perfilado discreto y simétrico.",
    price: "$12.000",
    user: {
      name: "Andrés Torres",
      avatar: "https://heroui.com/avatars/avatar-4.png",
    },
  },
];

const BarberHome = () => {
  return (
    <DefaultLayout>
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold my-2">Últimas solicitudes</h1>
        <Divider className="my-2" />

        <div className="flex flex-col gap-4">
          {mockRequests.map((request, index) => (
            <Card key={index} shadow="sm">
              <CardHeader className="gap-4 items-center">
                <Avatar
                  radius="full"
                  size="lg"
                  src={request.user.avatar}
                  alt={request.user.name}
                />
                <div>
                  <h4 className="font-semibold text-large">{request.user.name}</h4>
                  <p className="text-default-500 text-sm">{request.service}</p>
                </div>
              </CardHeader>
              <CardBody className="text-default-600 text-sm pt-0 px-6 pb-4">
                {request.description}
              </CardBody>
              <CardFooter className="flex justify-between items-center p-4">
                <p className="text-default-700 font-bold">{request.price}</p>
                <div className="flex gap-2">
                  <Button color="primary" size="sm" radius="full">
                    Aceptar
                  </Button>
                  <Button color="danger" size="sm" radius="full">
                    Rechazar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BarberHome;
