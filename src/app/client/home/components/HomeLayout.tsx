import DefaultLayout from "@/layouts/default";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
  Divider,
} from "@heroui/react";

const mockServices = [
  {
    title: "Corte moderno",
    price: "$20.000",
    img: "https://i.pinimg.com/736x/d5/55/40/d5554045789d07d46cab34ef9f4cf6bf.jpg",
  },
  {
    title: "Diseño de barba",
    price: "$15.000",
    img: "https://i.pinimg.com/236x/7a/6b/3d/7a6b3d01156977d042aa26aae3e0a3dd.jpg",
  },
  {
    title: "Corte + Barba",
    price: "$30.000",
    img: "https://i.pinimg.com/236x/0a/cf/0a/0acf0a33d4fa10bc72d4bb2b1ba520da.jpg",
  },
  {
    title: "Perfilado premium",
    price: "$18.000",
    img: "https://i.pinimg.com/236x/cb/00/ae/cb00ae94382be9e984630119f361a428.jpg",
  },
];

const mockBarbers = [
  {
    name: "Carlos Barber",
    username: "@carlosblade",
    avatar: "https://heroui.com/avatars/avatar-1.png",
    bio: "Experto en fades y diseños personalizados.",
  },
  {
    name: "Andrés Corte",
    username: "@andresfade",
    avatar: "https://heroui.com/avatars/avatar-2.png",
    bio: "Barbero con más de 10 años de experiencia.",
  },
  {
    name: "Alejandro Style",
    username: "@galohub",
    avatar: "https://heroui.com/avatars/avatar-4.png",
    bio: "Apasionado de la moda y el estilo.",
  },
  {
    name: "Ricardo Barber",
    username: "@ricardobarber",
    avatar: "https://heroui.com/avatars/avatar-3.png",
    bio: "Barbero con experiencia en cortes de cabello.",
  },
];

const ClientHome = () => {
  const username = "Juan";

  return (
    <DefaultLayout>
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold my-2">Bienvenido, {username}</h1>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="col-span-2 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Últimos servicios publicados
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {mockServices.map((item, index) => (
                <Card
                  key={index}
                  isPressable
                  shadow="sm"
                  className="min-w-[160px] max-w-[160px]"
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      alt={item.title}
                      className="object-cover h-[100px]"
                      radius="lg"
                      shadow="sm"
                      width={300}
                      height={300}
                      src={item.img}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b className="truncate">{item.title}</b>
                    <p className="text-default-500">{item.price}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          <Divider className="my-4" />
          <aside className="p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Servicios de BladeUp</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                {
                  title: "Servicios de barbería",
                  subtitle: "Fades, cortes y más",
                  tracks: "15 servicios",
                  img: "https://peluqueriacruz.com/wp-content/uploads/2024/02/joven-peluqueria-corte-pelo-1024x683.jpg",
                },
                {
                  title: "Servicios de peluquería",
                  subtitle: "Color, cepillado, estilo",
                  tracks: "12 servicios",
                  img: "https://eccu.edu.mx/beauty/wp-content/uploads/2020/12/32d055a9aa13c212e3587d65a89c17d1609d6372.XL2_.jpg",
                },
                {
                  title: "Otros servicios",
                  subtitle: "Cuidado facial, cejas",
                  tracks: "8 servicios",
                  img: "https://i.pinimg.com/236x/e1/22/29/e12229711226d55900b1b7b7d0628e59.jpg",
                },
              ].map((item, index) => (
                <Card key={index} className="w-full max-w-sm">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      {item.tracks}
                    </p>
                    <small className="text-default-500">{item.subtitle}</small>
                    <h4 className="font-bold text-large">{item.title}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 flex items-center justify-center">
                    <Image
                      alt={item.title}
                      className="object-cover rounded-lg"
                      src={item.img}
                      width={320}
                      height={200}
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          </aside>

          <Divider className="my-4" />
        </div>
        <section className="mt-6 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Barberos Blade Up!</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {mockBarbers.map((barber, index) => (
              <Card key={index} className="min-w-[300px] max-w-[300px]">
                <CardHeader className="justify-between pb-2">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      className="m-4"
                      src={barber.avatar}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center ml-2">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {barber.name}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        {barber.username}
                      </h5>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-4 pt-0 pb-4 text-small text-default-400">
                  <p>{barber.bio}</p>
                </CardBody>
                <CardFooter className="px-4 pt-0">
                  <Button
                    color="primary"
                    radius="full"
                    size="sm"
                    variant="solid"
                    className="w-full"
                  >
                    ¡Pide una cita!
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ClientHome;
