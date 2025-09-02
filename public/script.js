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
    'convite_3': { title: "🌍 Flexível", text: "Oi [Nome do Convidado]! Tudo bem? Sei que você valoriza a liberdade de horário e a flexibilidade. Por isso, pensei em te falar sobre um projeto que estou desenvolvendo: super flexível e com possibilidade de trabalhar de qualquer lugar. Podemos marcar uma conversa rápida para te explicar tudo. É uma ótima chance de gerar renda e ter mais liberdade! O que acha?" },
    'convite_4': { title: "💵 Renda Extra", text: "Oi [Nome do Convidado], como estão as coisas? Já pensou em conseguir uma renda extra? Tenho uma oportunidade que pode encaixar bem com seu ritmo, super flexível. Podemos marcar uma conversa rápida? Assim te explico direitinho como funciona e você vê se faz sentido para você. 😊" },
    'convite_5': { title: "🚀 Empreendedor", text: "Oi [Nome do Convidado]! Lembrei de você e do seu perfil empreendedor. Como estão as coisas? Estou desenvolvendo um projeto que tem transformado a vida de muita gente e achei que você poderia gostar de conhecer. É uma oportunidade com grande potencial e suporte para empreender. Posso te explicar tudo em uma conversa rápida, assim te mostro todos os detalhes! Será ótimo compartilhar isso com você." },
    'convite_6': { title: "👀 Curioso", text: "Oi [Nome do Convidado]! Lembrei de você, tudo bem? Tô envolvido em um projeto novo e muito bacana, e achei que você poderia se interessar. 😊 Te explico melhor quando tivermos um tempinho para conversar. Acho que vai te surpreender! 😉" },
    'convite_7': { title: "✨ Inspirador", text: "Oi [Nome do Convidado]! Como você está? Estou trabalhando em um projeto que realmente mudou minha visão sobre alcançar meus sonhos e objetivos. É uma oportunidade que não só aumenta a renda, mas também oferece desenvolvimento pessoal e crescimento. Quer que eu te conte mais?" },
    'convite_8': { title: "⏳ P/ Ocupados", text: "Oi [Nome do Convidado]! Como estão as coisas? Entendo sua rotina! Eu também estava com a agenda bem cheia quando descobri uma forma de aumentar minha renda, mesmo com a agenda apertada. Acho que poderia te interessar! É uma oportunidade flexível, que você pode fazer no seu próprio ritmo e sem comprometer muito tempo. Podemos bater um papo rápido sobre?" },
    'convite_9': { title: "📊 Estabilidade", text: "Oi [Nome do Convidado]! Tudo certo? Estou envolvido(a) em um projeto que oferece uma oportunidade de gerar uma renda extra de forma estável e segura. Acho que você poderia gostar! Podemos conversar rapidinho? Assim te conto tudo e você vê se se encaixa no que está buscando." },
    'convite_10': { title: "🕒 Autonomia", text: "Oi [Nome do Convidado]! Como estão as coisas? Estou com uma oportunidade que oferece mais autonomia e liberdade para você decidir seu ritmo e seu horário. Pensei que poderia ser algo que você gostaria! Posso te explicar melhor em uma conversa rápida. É uma oportunidade de ter controle sobre sua renda e seu tempo. Que tal?" },
    'convite_11': { title: "🧠 Inovador", text: "Oi [Nome do Convidado]! Tenho explorado novas ideias e queria compartilhar com você um projeto que pode ser revolucionário. Estou buscando pessoas com visão e queiram inovar. Posso te contar mais?" },
    'convite_12': { title: "🤝 Networking", text: "Oi [Nome do Convidado]! Admiro sua habilidade de fazer conexões! Estou envolvido em um projeto com um grande potencial de networking, abrindo portas para novas oportunidades. Posso te mostrar como você pode usar sua rede para prosperar?" },
    'convite_13': { title: "🌱 Crescimento", text: "Oi [Nome do Convidado]! Seu espírito de crescimento me inspira! Estou desenvolvendo um projeto que além de resultados financeiros oferece muito crescimento pessoal e profissional. Quer saber mais sobre essa jornada?" },
    'convite_14': { title: "🎁 Oportunidade", text: "Oi [Nome do Convidado]! Tenho uma oportunidade exclusiva que acho que você vai adorar! Estou abrindo as portas de um projeto que está transformando a vida de muitas pessoas. Que tal dar uma olhada de perto?" },
    'convite_15': { title: "💡 Solução", text: "Oi [Nome do Convidado]! Sabendo que você sempre está procurando soluções, tenho uma ideia que pode otimizar algo em sua vida!  Acredito que vai se encaixar com seus objetivos! Podemos marcar um horário para te explicar melhor?" }
};

// --- Gera os botões dos modelos ---
for (const key in convites) {
    const button = document.createElement('button');
    button.dataset.key = key;
    button.innerHTML = convites[key].title;
    button.className = "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg p-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 ease-in-out";
    buttonsContainer.appendChild(button);
}

// --- Função para gerar convite com MODELOS ---
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

// --- Função para chamar NOSSO BACKEND SEGURO ---
async function getSecureApiResponse(prompt) {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ocorreu um erro no servidor.');
        }

        const data = await response.json();
        return data.text;

    } catch (error) {
        console.error("Erro ao chamar a API segura:", error);
        return `Ocorreu um erro: ${error.message}.`;
    }
}


// --- Função para gerar convite com IA ---
const handleAiSubmission = async () => {
    const guestName = guestNameInput.value.trim();
    const profileDescription = profileDescriptionInput.value.trim();
    const selectedTone = document.querySelector('input[name="tone"]:checked').value;

    if (!guestName || !profileDescription) {
        alert('Por favor, preencha o nome e o perfil do convidado.');
        return;
    }

    const prompt = `
        Crie um convite para um negócio de marketing de rede.
        **Instruções:**
        1.  **Destinatário:** "${guestName}".
        2.  **Perfil:** ${profileDescription}. Adapte os argumentos para este perfil.
        3.  **Meu Time:** "Equipe de Triunfo". Mencione de forma positiva.
        4.  **Objetivo:** Convencer a pessoa a participar de uma apresentação de negócios online.
        5.  **Tom:** Mantenha um tom ${selectedTone}, mas inspirador. Foque em crescimento, oportunidade e empreendedorismo.
        6.  **Estrutura:** Comece com uma saudação personalizada, conecte com o perfil, apresente a oportunidade sutilmente, mencione a força da "Equipe de Triunfo" e termine com uma chamada para ação clara para agendar a apresentação.
        Gere apenas o texto do convite.
    `;

    aiGenerateButton.disabled = true;
    aiGenerateButton.querySelector('span').textContent = 'Gerando...';
    aiLoader.classList.remove('hidden');
    responseContainer.value = '';

    const result = await getSecureApiResponse(prompt);
    responseContainer.value = result.trim();

    aiLoader.classList.add('hidden');
    aiGenerateButton.disabled = false;
    aiGenerateButton.querySelector('span').textContent = 'Gerar Convite com IA';
};

aiGenerateButton.addEventListener('click', handleAiSubmission);

// --- Função para copiar o texto ---
copyButton.addEventListener('click', () => {
    const textToCopy = responseContainer.value;
    if (textToCopy && textToCopy !== "O seu convite aparecerá aqui...") {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copiado!';
            copyButton.classList.add('copy-success');
            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.classList.remove('copy-success');
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
            alert('Não foi possível copiar o texto.');
        });
    } else {
        alert('Gere um convite antes de copiar.');
    }
});

// --- Função para compartilhar no WhatsApp ---
whatsappShareButton.addEventListener('click', () => {
    const phoneNumber = whatsappNumberInput.value.trim();
    const inviteText = responseContainer.value;

    if (!phoneNumber) {
        alert('Por favor, insira um número de telefone para compartilhar.');
        whatsappNumberInput.focus();
        return;
    }
    if (!inviteText || inviteText === "O seu convite aparecerá aqui...") {
        alert('Gere um convite antes de compartilhar.');
        return;
    }
    
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const encodedText = encodeURIComponent(inviteText);
    const whatsappUrl = `https://wa.me/55${cleanedPhoneNumber}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
});
