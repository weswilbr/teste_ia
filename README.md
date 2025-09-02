Gerador de Convites com IA (Estrutura Escalável)
Este é um projeto reestruturado para ser mais seguro, organizado e pronto para crescer. A principal mudança é que sua chave de API do Gemini agora está protegida em um backend (uma Serverless Function), em vez de estar exposta no código do frontend.

Estrutura dos Arquivos
/public: Contém todos os arquivos que o usuário acessa diretamente no navegador.

index.html: A estrutura principal da página (sem lógica ou estilos).

script.js: Toda a interatividade da página (lógica JavaScript).

style.css: Os estilos personalizados da página.

/api: Contém a nossa função de backend (Serverless Function).

generate.js: Este arquivo Node.js recebe a requisição do nosso site, usa a chave de API (que está segura no servidor) para contatar o Gemini e retorna a resposta.

.gitignore: Arquivo para dizer ao Git quais arquivos ignorar (como chaves de API locais).

package.json: Define as informações do projeto.

Como Usar e Fazer o Deploy no Vercel
1. Configuração Local (Opcional, para testar no seu PC)
Crie um arquivo na raiz do projeto chamado .env.local

Dentro dele, adicione sua chave de API assim:

GEMINI_API_KEY="SUA_CHAVE_DE_API_VAI_AQUI"

Este arquivo NUNCA deve ser enviado para o GitHub. O .gitignore já está configurado para evitar isso.

2. Deploy no Vercel (Recomendado)
Envie todos os arquivos para o seu repositório no GitHub (exceto o .env.local).

Na Vercel, importe o projeto a partir do seu repositório.

A Vercel vai identificar a estrutura automaticamente.

Antes de fazer o deploy, vá para as configurações do projeto na Vercel (Settings -> Environment Variables).

Crie uma nova variável de ambiente:

Name: GEMINI_API_KEY

Value: Cole a sua chave da API do Gemini aqui.

Salve e faça o deploy.

Agora sua aplicação estará online, e sua chave de API estará segura!
