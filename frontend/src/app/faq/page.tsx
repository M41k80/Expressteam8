import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function FAQ() {
  return (
    <main>
      <Header />
      <section id="faq" className="py-32 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center py-16">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Puedo usar la app gratis?",
                a: "Sí, tenemos un plan gratuito con límite mensual.",
              },
              {
                q: "¿Puedo cancelar en cualquier momento?",
                a: "Claro, no hay compromiso.",
              },
              {
                q: "¿Qué tan seguro es mi contenido?",
                a: "Cumplimos con estándares de seguridad y cifrado.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold">{item.q}</h3>
                <p
                  className={i === 2 ? "text-[#66bb6a]" : "text-muted-foreground"}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="mt-24">
        <Footer />
      </footer>
    </main>
  );
}
