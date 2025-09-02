// Esta é uma Serverless Function que a Vercel irá executar.
// Ela atua como um intermediário seguro entre o seu site e a API do Gemini.

export default async function handler(request, response) {
    // 1. Apenas permite requisições do tipo POST
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Método não permitido' });
    }

    // 2. Pega o prompt enviado pelo frontend
    const { prompt } = request.body;
    if (!prompt) {
        return response.status(400).json({ error: 'O prompt é obrigatório' });
    }

    // 3. Pega a chave da API das variáveis de ambiente do servidor (SEGURO)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return response.status(500).json({ error: 'A chave da API não está configurada no servidor' });
    }
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    try {
        // 4. Faz a chamada para a API do Gemini a partir do servidor
        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.json();
            console.error('Erro da API do Gemini:', errorBody);
            throw new Error(errorBody.error.message);
        }

        const data = await geminiResponse.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
             return response.status(500).json({ error: 'Resposta inválida da API do Gemini' });
        }

        // 5. Envia a resposta de volta para o frontend
        return response.status(200).json({ text: text });

    } catch (error) {
        console.error('Erro interno do servidor:', error);
        return response.status(500).json({ error: error.message || 'Um erro inesperado aconteceu' });
    }
}
