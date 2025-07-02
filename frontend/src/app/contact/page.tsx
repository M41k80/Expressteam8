import Footer from "../components/footer";
import Header from "../components/header";

export default function ContactPage() {
    return (
        <main>
            <Header />
            <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">

                <h1 className="text-4xl font-bold mb-6">Contacto</h1>
                <p className="text-muted-foreground mb-8 max-w-xl text-center">
                    Si tienes dudas o quieres más información sobre nuestra plataforma de generación de emails con IA, completa el formulario o escríbenos.
                </p>
                <form className="w-full max-w-md space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu nombre"
                            className="w-full border rounded px-3 py-2 bg-background"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            className="w-full border rounded px-3 py-2 bg-background"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1 font-medium">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            placeholder="Escribe tu mensaje..."
                            className="w-full border rounded px-3 py-2 bg-background"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-medium py-2 rounded hover:opacity-90"
                    >
                        Enviar Mensaje
                    </button>
                </form>
                <footer className="mt-72">
                    <Footer />
                </footer>
                    
            </div>
            
        </main>
    );
}
