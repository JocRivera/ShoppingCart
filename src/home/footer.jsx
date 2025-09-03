import { Icons } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 py-10">
      {/* <div className="container mx-auto px-6 gap-8 flex justify-center">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Calle 123 #45-67, Medellín, Colombia</li>
            <li>📞 +57 300 123 4567</li>
            <li>✉️ jriverab@mitienda.com</li>
            <li>🕒 Lunes - Sábado: 9am - 7pm</li>
          </ul>
        </div>
      </div> */}

      {/* Redes sociales + derechos reservados */}
      <div className="mt-10 pt-6 text-end mr-4">
        <div className="flex justify-end space-x-6 mb-4">
          <a href="#" className="hover:text-white transition">
            <Icons.instagram className="h-6 w-6 text-gray-400 hover:text-white transition" />
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
