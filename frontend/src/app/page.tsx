import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "./components/header";
import Footer from "./components/footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Tus Emails, potenciados por Inteligencia 
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center text-[#4FC3F7]">Artificial</h1>
        <p className="text-muted-foreground text-2xl mb-8 max-w-xl p-16">
          Nuestra plataforma utiliza inteligencia artificial para crear correos
          electrónicos efectivos en minutos.
        </p>
        <Button className="bg-[#4FC3F7] hover:bg-[#29B6F6] p-8" size="lg" asChild>
          <Link className="text-white" href="/register">Comienza Gratis</Link>
        </Button>
      </section>
      <footer className="bg-background text-foreground py-60">
        <Footer />
      </footer>
      
    </main>
  );
}
