import type { NextApiRequest, NextApiResponse } from 'next';



interface LoginRequestBody {
    email: string;
    password: string;
    // Add other fields if needed
}

interface LoginResponseData {
    token?: string;
    message?: string;
    // Add other fields returned by the API if needed
}

export default async function handler(
    req: NextApiRequest & { body: LoginRequestBody },
    res: NextApiResponse<LoginResponseData | { message: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const response = await fetch('https://jereprograma.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data: LoginResponseData = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error en proxy-login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
