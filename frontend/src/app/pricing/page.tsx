import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Prices() {
  return (
    <main>
      <Header />
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Planes y Precios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                title: "Gratis",
                price: "$0",
                features: ["100 emails/mes", "Soporte básico"],
              },
              {
                title: "Pro",
                price: "$29/mes",
                features: [
                  "5,000 emails/mes",
                  "IA Avanzada",
                  "Soporte prioritario",
                ],
              },
              {
                title: "Enterprise",
                price: "Personalizado",
                features: ["Volumen ilimitado", "Integraciones personalizadas"],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="border rounded-lg p-6 text-center bg-muted/30 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
                  <p className="text-2xl font-bold mb-6">{plan.price}</p>
                  <ul className="text-muted-foreground mb-6 space-y-2">
                    {plan.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                </div>
                <Button className="bg-[#4FC3F7] hover:bg-[#29B6F6] p-6" size="lg" asChild>
                  <Link href="/auth/register">Elegir Plan</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>


      <footer className="mt-50">
        <Footer />
      </footer>
    </main>

  );
}


