"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/mode-toogle";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold">
                    <Image src="/App.png" alt="Logo" width={120} height={80} className="rounded-full" />
                </Link>


                <nav className="hidden md:flex gap-8">
                    <Link href="/features" className="hover:underline">
                        Características
                    </Link>
                    <Link href="/pricing" className="hover:underline">
                        Precios
                    </Link>
                    <Link href="/faq" className="hover:underline">
                        FAQ
                    </Link>
                    <Link href="/contact" className="hover:underline">
                        Contacto
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-2">
                <div className="md:hidden">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <ModeToggle />
                            <nav className="flex flex-col gap-4 p-4">
                                <Link href="/features" className="hover:underline">
                                    Características
                                </Link>
                                <Link href="/pricing" className="hover:underline">
                                    Precios
                                </Link>
                                <Link href="/faq" className="hover:underline">
                                    FAQ
                                </Link>
                                <Link href="/contact" className="hover:underline">
                                    Contacto
                                </Link>
                                <Link href="/auth/login" className="hover:underline">
                                    Iniciar Sesión
                                </Link>
                                <Link href="/auth/register" className="hover:underline">
                                    Registrarse
                                </Link>

                            </nav>
                        </DrawerContent>
                    </Drawer>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <ModeToggle />
                    <Button asChild variant="outline" className="hover:bg-[#4FC3F7]">
                        <Link href="/auth/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild className="bg-[#4FC3F7] hover:bg-[#29B6F6]">
                        <Link href="/auth/register">Registrarse</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
