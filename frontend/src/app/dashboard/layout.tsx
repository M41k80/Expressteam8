"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Menu,
    LayoutDashboard,
    Mail,
    Settings,
    ArrowLeft,
    X,
} from "lucide-react";
import { ModeToggle } from "../components/mode-toogle";
import clsx from "clsx";
import Image from "next/image";
import { Toaster } from "sonner";
import { DashboardProvider } from "../context/DashboardContext";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
        { href: "/dashboard/history", label: "Mis Correos", icon: Mail },
        { href: "/dashboard/settings", label: "Configuración", icon: Settings },
    ];

    return (
        <DashboardProvider>
            <main className="min-h-screen flex flex-col md:flex-row bg-background text-foreground relative">
                <Toaster theme="dark" />


                <aside className="hidden md:flex w-64 flex-col border-r p-4 bg-muted/30 z-10">
                    <Image src="/App.png" alt="Logo" width={120} height={80} className="rounded-full" />
                    <ModeToggle />
                    <nav className="flex flex-col gap-1 mt-4">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-2 rounded px-3 py-2 hover:bg-muted transition"
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-auto pt-4 border-t">
                        <Button asChild variant="ghost" className="w-full justify-start">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Logout
                            </Link>
                        </Button>
                    </div>
                </aside>


                <div className="flex md:hidden w-full p-4 border-b items-center justify-between bg-background z-20">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
                        <Menu className="w-1 h-1" />
                    </Button>

                </div>


                <div
                    className={clsx(
                        "fixed inset-0 bg-black/50 transition-opacity duration-200 z-40",
                        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    )}
                    onClick={() => setIsOpen(false)}
                />


                <aside
                    className={clsx(
                        "fixed top-0 left-0 h-full w-64 bg-background border-r shadow-lg z-50 transform transition-transform duration-200",
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <LayoutDashboard className="w-5 h-5" />
                            Panel
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                        <ModeToggle />
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-2 rounded px-3 py-2 hover:bg-muted transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </Link>
                        ))}
                        <Link
                            href="/"
                            className="flex items-center gap-2 rounded px-3 py-2 hover:bg-muted transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Logout
                        </Link>
                    </nav>
                </aside>


                <section className="flex-1 p-4 md:p-8">{children}</section>
            </main>
        </DashboardProvider>
    );
}
