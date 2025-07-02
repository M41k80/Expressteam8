import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "./components/header";
import Footer from "./components/footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Genera emails que convierten con IA
        </h1>
        <p className="text-muted-foreground mb-6 max-w-xl">
          Nuestra plataforma utiliza inteligencia artificial para crear correos
          electrónicos efectivos en minutos.
        </p>
        <Button size="lg" asChild>
          <Link href="/register">Comienza Gratis</Link>
        </Button>
      </section>
      <footer className="bg-background text-foreground py-80">
        <Footer />
      </footer>
      
    </main>
  );
}
