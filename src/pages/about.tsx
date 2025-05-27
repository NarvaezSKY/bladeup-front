import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Sobre nosotros</h1>

          <img src="https://media.tenor.com/bfgjTc0DxiIAAAAM/sad-emoji.gif" alt="" width={500}/>
          <p>Profe por favor no dejes que perdamos la nota</p>
        </div>
      </section>
    </DefaultLayout>
  );
}
