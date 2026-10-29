/* =====================================================
   API PLANTACARE
   Comunicação entre o aplicativo e o backend online.
===================================================== */

// API publicada na Vercel
const API_URL = "https://planta-care-psi.vercel.app";

console.log("API PlantaCare inicializada em:", API_URL);

/**
 * Realiza requisições POST para a API.
 */
async function enviarDadosAPI(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const texto = await response.text();

        let result;

        try {
            result = JSON.parse(texto);
        } catch {
            console.error("Resposta recebida da API:", texto);

            throw new Error(
                `A API retornou uma resposta que não é JSON. Status: ${response.status}. Verifique o endereço e a rota: ${API_URL}${endpoint}`
            );
        }

        if (!response.ok) {
            throw new Error(
                result.erro ||
                result.message ||
                "Erro na requisição com o servidor."
            );
        }

        return result;

    } catch (error) {
        console.error(`[API Error - ${endpoint}]:`, error);
        throw error;
    }
}

/**
 * Autentica o usuário.
 */
async function fazerLogin(email, senha) {
    return await enviarDadosAPI("/login", { email, senha });
}

/**
 * Cadastra um novo usuário.
 */
async function cadastrarUsuario(usuarioData) {
    return await enviarDadosAPI("/usuarios", usuarioData);
}