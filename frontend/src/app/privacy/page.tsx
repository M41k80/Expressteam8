import Footer from "../components/footer";
import Header from "../components/header";
export default function PrivacyPage() {
  return (
    <main>
      <Header />
    
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6 text-center">

      <h1 className="text-3xl font-bold">Política de Privacidad</h1>
    </div>
    <div className="max-w-3xl mx-auto px-4 space-y-6">
      <p>
        Esta política de privacidad describe cómo se recopila, utiliza y protege la información personal de los usuarios de nuestro sitio web.
      </p>
      <h2 className="text-2xl font-semibold">Información que recopilamos</h2>
      <p>
        Recopilamos información personal que los usuarios nos proporcionan voluntariamente, como nombre, correo electrónico y cualquier otra información necesaria para proporcionar nuestros servicios.
      </p>
      <h2 className="text-2xl font-semibold">Uso de la información</h2>
      <p>
        Utilizamos la información recopilada para mejorar nuestros servicios, enviar actualizaciones y responder a consultas.
      </p>
      <h2 className="text-2xl font-semibold">Protección de la información</h2>
      <p>
        Implementamos medidas de seguridad adecuadas para proteger la información personal contra el acceso no autorizado, divulgación o destrucción.
      </p>
      <h2 className="text-2xl font-semibold">Cambios en esta política</h2>
      <p>
        Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios se publicarán en esta página.
      </p>
    </div>
    <Footer />
    </main>
  );
}
