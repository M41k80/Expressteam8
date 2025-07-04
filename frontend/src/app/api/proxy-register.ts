import type { NextApiRequest, NextApiResponse } from 'next';

interface RegisterRequestBody {
    // Define the expected fields for the register request body
    // Example:
    // username: string;
    // password: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface RegisterResponseData {
    // Define the expected fields for the register response data
    // Example:
    // success: boolean;
    // message?: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponseData | { message: string }>
): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const response = await fetch('https://jereprograma.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body as RegisterRequestBody),
        });

        const data: RegisterResponseData = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error en proxy-register:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
