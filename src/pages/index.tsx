import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Encuentra tu&nbsp;</span>
          <span className={title({ color: "violet" })}>estilo&nbsp;</span>
          <br />
          <span className={title()}>esto es Blade Up!</span>
          <div className={subtitle({ class: "mt-4" })}>
            ¡Tu aplicación de barbería!
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "secondary",
              radius: "full",
              variant: "shadow",
            })}
            href={'/register'}
          >
            Registrate
          </Link>
          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={'/login'}
          >
            Inicia Sesión
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
