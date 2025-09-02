// NOME DO ARQUIVO: public/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos elementos do DOM ---
    const guestNameInput = document.getElementById('guest-name');
    const buttonsContainer = document.getElementById('invite-buttons');
    const responseContainer = document.getElementById('response-container');
    const copyButton = document.getElementById('copy-button');
    const profileDescriptionInput = document.getElementById('profile-description');
    const aiGenerateButton = document.getElementById('ai-generate-button');
    const aiLoader = document.getElementById('ai-loader');
    const whatsappNumberInput = document.getElementById('whatsapp-number');
    const whatsappShareButton = document.getElementById('whatsapp-share-button');

    // --- Textos dos convites (Modelos Prontos) ---
    const convites = {
        'convite_1': { title: "📈 Profissional", text: "Oi [Nome do Convidado], tudo bem? Estou trabalhando em um projeto que está dando super certo e lembrei de você. Acho que pode ser algo interessante para o seu perfil, com potencial de crescimento e ótimos resultados! Podemos marcar uma conversa rápida para eu te explicar direitinho? Será ótimo compartilhar essa oportunidade com você." },
        'convite_2': { title: "😊 Amigável", text: "Oi [Nome do Convidado]! Como você está? Descobri uma oportunidade incrível que está me ajudando muito financeiramente, e logo lembrei de você. Acho que poderia te interessar! É algo flexível, que encaixa bem na rotina e dá pra fazer no seu ritmo. Que tal marcarmos um papo para eu te explicar melhor? 😊" },
        'convite_5': { title: "🚀 Empreendedor", text: "Oi [Nome do Convidado]! Lembrei de você e do seu perfil empreendedor. Estou desenvolvendo um projeto com grande potencial e suporte para empreender. Posso te explicar tudo em uma conversa rápida, assim te mostro todos os detalhes!" },
        'convite_4': { title: "💵 Renda Extra", text: "Oi [Nome do Convidado], como estão as coisas? Já pensou em conseguir uma renda extra? Tenho uma oportunidade que pode encaixar bem com seu ritmo, super flexível. Podemos marcar uma conversa rápida? Assim te explico direitinho como funciona." },
    };

    // --- Gera os botões dos modelos ---
    for (const key in convites) {
        const button = document.createElement('button');
        button.dataset.key = key;
        button.innerHTML = convites[key].title;
        button.className = "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg p-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition";
        buttonsContainer.appendChild(button);
    }

    // --- Event Listener para os botões de modelo ---
    buttonsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const guestName = guestNameInput.value.trim();
        if (!guestName) {
            alert('Por favor, digite o nome do convidado primeiro.');
            guestNameInput.focus();
            return;
        }
        const conviteKey = button.dataset.key;
        const template = convites[conviteKey].text;
        const finalInvite = template.replace(/\[Nome do Convidado\]/g, guestName);
        responseContainer.value = finalInvite;
    });

    // --- Função para chamar NOSSO BACKEND SEGURO na Vercel ---
    async function getSecureApiResponse(prompt) {
        try {
            const response = await fetch('/api/', { // Chama a API em /api/index.js
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ocorreu um erro no servidor.');
            }
            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error("Erro ao chamar a API segura:", error);
            return `Ocorreu um erro: ${error.message}. Verifique os logs da Vercel.`;
        }
    }

    // --- Event Listener para o botão de gerar com IA ---
    aiGenerateButton.addEventListener('click', async () => {
        const guestName = guestNameInput.value.trim();
        const profileDescription = profileDescriptionInput.value.trim();
        const selectedTone = document.querySelector('input[name="tone"]:checked').value;

        if (!guestName || !profileDescription) {
            alert('Por favor, preencha o nome e o perfil do convidado.');
            return;
        }

        const prompt = `Crie um convite ${selectedTone} para um negócio de marketing de rede. O convidado se chama "${guestName}" e tem o seguinte perfil: "${profileDescription}". O objetivo é levá-lo para uma apresentação de negócios. Mencione de forma positiva a "Equipe de Triunfo". Foque em crescimento, oportunidade e empreendedorismo, adaptando os argumentos ao perfil. Gere apenas o texto do convite.`;
        
        // UI de carregamento
        aiGenerateButton.disabled = true;
        aiGenerateButton.querySelector('span').textContent = 'Gerando...';
        aiLoader.classList.remove('hidden');
        responseContainer.value = '';

        const result = await getSecureApiResponse(prompt);
        responseContainer.value = result.trim();

        // Restaura a UI
        aiLoader.classList.add('hidden');
        aiGenerateButton.disabled = false;
        aiGenerateButton.querySelector('span').textContent = 'Gerar Convite com IA';
    });

    // --- Event Listener para o botão de copiar ---
    copyButton.addEventListener('click', () => {
        const textToCopy = responseContainer.value;
        if (textToCopy && textToCopy !== "O seu convite aparecerá aqui...") {
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyButton.textContent = 'Copiado!';
                setTimeout(() => { copyButton.textContent = 'Copiar'; }, 2000);
            });
        }
    });

    // --- Event Listener para o botão do WhatsApp ---
    whatsappShareButton.addEventListener('click', () => {
        const phoneNumber = whatsappNumberInput.value.trim().replace(/\D/g, '');
        const inviteText = responseContainer.value;

        if (!phoneNumber) {
            alert('Por favor, insira um número de telefone.');
            return;
        }
        if (!inviteText || inviteText === "O seu convite aparecerá aqui...") {
            alert('Gere um convite antes de compartilhar.');
            return;
        }
        
        const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(inviteText)}`;
        window.open(whatsappUrl, '_blank');
    });
});

