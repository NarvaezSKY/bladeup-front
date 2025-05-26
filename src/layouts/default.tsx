import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-white text-black transition-colors dark:bg-gradient-to-tr dark:from-[#1d0c25] dark:to-black dark:text-white">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              BladeUp! ©
            </Link>
            . Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
