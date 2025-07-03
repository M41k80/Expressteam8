import Footer from "../components/footer";
import Header from "../components/header";


export default function TermsPage() {
  return (

    <main>
      <Header />

      <div className="max-w-3xl mx-auto py-12 px-4 space-y-6 text-center">

     <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
    </div>
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      
      <p>
        Al utilizar IA Email App, aceptas los siguientes términos y condiciones.
        Por favor, léelos cuidadosamente.
      </p>
      <h2 className="text-xl font-semibold mt-4">Uso de la Aplicación</h2>
      <p>
        La aplicación está destinada exclusivamente a generar contenido de correo
        electrónico. No podrás usarla con fines ilegales.
      </p>
      <h2 className="text-xl font-semibold mt-4">Propiedad Intelectual</h2>
      <p>
        Todo el contenido y código relacionado con la aplicación son propiedad de
        IA Email App.
      </p>
      <h2 className="text-xl font-semibold mt-4">Limitación de Responsabilidad</h2>
      <p>
        No nos hacemos responsables por pérdidas o daños derivados del uso de la
        aplicación.
      </p>
      <h2 className="text-xl font-semibold mt-4">Cambios en los Términos</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos en cualquier
        momento. Si continúas utilizando la aplicación, aceptas dichos cambios.
      </p>
      <p className="text-sm text-muted-foreground mt-4">
        Última actualización: {new Date().getFullYear()}
      </p>
    </div>
    <Footer />
    </main>
    
  );
}
