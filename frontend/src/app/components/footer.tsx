import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AI Email App. Todos los derechos reservados.</p>
            
            <Link href="/privacy" className="hover:underline text-[#4FC3F7]">Política de Privacidad</Link>
            <Link href="/terms" className="hover:underline ml-4 text-[#4FC3F7]">Términos y Condiciones</Link>
        </footer>
    );
}