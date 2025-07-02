export default function Footer() {
    return (
        <footer className="py-6 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IA Email App. Todos los derechos reservados.
        </footer>
    );
}