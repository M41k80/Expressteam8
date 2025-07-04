'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type DashboardContextType = {
    isLoading: boolean;
    previousEmail: any;
    generatedEmail: any;
    generateEmail: (prompt: string) => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [previousEmail, setPreviousEmail] = useState<any>(null);
    const [generatedEmail, setGeneratedEmail] = useState<any>(null);


    useEffect(() => {
        const loadPreviousEmail = async () => {
            setIsLoading(true);
            try {
                // const email = await emailService.getPreviousEmail();
                const email = await new Promise((resolve) => setTimeout(() => resolve({ subject: 'Email Previo', body: 'Este es un email previo.' }), 1000));
                setPreviousEmail(email);
            } catch (error) {
                console.error('Error al cargar el email previo:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPreviousEmail();
    }, []);

    const generateEmail = async (prompt: string) => {
        setIsLoading(true);
        try {
            const email = await new Promise((resolve) => setTimeout(() => resolve({ subject: 'Email Generado', body: 'Este es un email generado.' }), 1000));
            // const email = await emailService.generate({ prompt });
            setGeneratedEmail(email);
        } catch (error) {
            console.error('Error al generar el email:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const value: DashboardContextType = {
        isLoading,
        previousEmail,
        generatedEmail,
        generateEmail
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard debe usarse dentro de <DashboardProvider>');
    }
    return context;
};
