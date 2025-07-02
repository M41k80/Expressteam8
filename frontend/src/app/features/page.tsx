import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function FeaturesPage() {
  const features = [
    {
      title: "Generación Automática",
      description: "Crea emails en segundos usando IA entrenada en millones de ejemplos."
    },
    {
      title: "Personalización Avanzada",
      description: "Añade variables dinámicas y personaliza el tono de voz."
    },
    {
      title: "Análisis de Resultados",
      description: "Obtén métricas de apertura, clics y conversiones."
    },
    {
      title: "Integración Sencilla",
      description: "Conecta tu CRM o herramientas favoritas en un clic."
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-12 p-8">Características</h1>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow transition">
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
      <footer className="mt-72">
        <Footer />
      </footer>
    </main>
  );
}
