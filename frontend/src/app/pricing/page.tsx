import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Prices() {
  return (
    <main>
      <Header />
      <section id="pricing" className="py-16">

        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Planes y Precios</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Gratis",
                price: "$0",
                features: ["100 emails/mes", "Soporte básico"]
              },
              {
                title: "Pro",
                price: "$29/mes",
                features: ["5,000 emails/mes", "IA Avanzada", "Soporte prioritario"]
              },
              {
                title: "Enterprise",
                price: "Personalizado",
                features: ["Volumen ilimitado", "Integraciones personalizadas"]
              },
            ].map((plan, i) => (
              <div key={i} className="border rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold">{plan.title}</h3>
                <p className="text-2xl font-bold my-2">{plan.price}</p>
                <ul className="text-muted-foreground mb-4">
                  {plan.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                <Button asChild>
                  <Link href="/register">Elegir Plan</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="mt-72">
        <Footer />
      </footer>
    </main>

  );
}

   
