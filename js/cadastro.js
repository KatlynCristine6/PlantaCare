document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("formCadastro");
    const btnVoltarLogin = document.getElementById("btnVoltarLogin");

    if (!formCadastro) return;

    const btnCadastrar = formCadastro.querySelector(
        'button[type="submit"]'
    );

    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoTelefone = document.getElementById("telefone");
    const campoQuantidade = document.getElementById("quantidadePlantas");
    const campoSenha = document.getElementById("senha");
    const campoConfirmarSenha = document.getElementById("confirmarSenha");

    // Área para exibir mensagens
    const mensagem = document.createElement("p");
    mensagem.id = "mensagemCadastro";
    mensagem.setAttribute("role", "alert");
    mensagem.setAttribute("aria-live", "polite");
    mensagem.style.marginTop = "12px";
    mensagem.style.textAlign = "center";

    if (btnCadastrar) {
        btnCadastrar.insertAdjacentElement("afterend", mensagem);
    }

    function mostrarMensagem(texto, sucesso = false) {
        mensagem.textContent = texto;
        mensagem.style.color = sucesso ? "#315b38" : "#b42318";
    }

    // Voltar para a tela de login
    if (btnVoltarLogin) {
        btnVoltarLogin.addEventListener("click", function () {
            window.location.href = "login.html";
        });
    }

    // Mostrar ou esconder as senhas
    [
        ["mostrarSenha", campoSenha],
        ["mostrarConfirmarSenha", campoConfirmarSenha]
    ].forEach(([idBotao, campo]) => {
        const botao = document.getElementById(idBotao);

        if (botao && campo) {
            botao.style.cursor = "pointer";
            botao.setAttribute("role", "button");
            botao.setAttribute("tabindex", "0");
            botao.setAttribute("aria-label", "Mostrar ou esconder senha");

            function alternarSenha() {
                campo.type =
                    campo.type === "password" ? "text" : "password";
            }

            botao.addEventListener("click", alternarSenha);

            botao.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    alternarSenha();
                }
            });
        }
    });

    // Validação do nome completo
    function nomeCompletoValido(nome) {
        const partes = nome.trim().split(/\s+/).filter(Boolean);

        return partes.length >= 2 &&
            partes.every(parte => /\p{L}/u.test(parte));
    }

    // Validação do e-mail
    function emailValido(email) {
        // Bloqueia espaços, caracteres não ASCII e e-mails sem formato válido.
        // Isso também impede letras acentuadas no endereço.
        if (!email || /[^\x00-\x7F]/.test(email)) {
            return false;
        }

        const formatoEmail =
            /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

        return formatoEmail.test(email);
    }

    // Validação da senha forte
    function senhaForte(senha) {
        const temOitoCaracteres = senha.length >= 8;
        const temMaiuscula = /[A-Z]/.test(senha);
        const temMinuscula = /[a-z]/.test(senha);
        const temNumero = /[0-9]/.test(senha);
        const temSimbolo = /[^A-Za-z0-9]/.test(senha);

        return (
            temOitoCaracteres &&
            temMaiuscula &&
            temMinuscula &&
            temNumero &&
            temSimbolo
        );
    }

    // Validação do formulário
    formCadastro.addEventListener("submit", async function (event) {
        event.preventDefault();
        mensagem.textContent = "";

        const nome = campoNome.value.trim();
        const email = campoEmail.value.trim();
        const telefone = campoTelefone.value.trim();
        const quantidadePlantas = campoQuantidade.value;
        const senha = campoSenha.value;
        const confirmarSenha = campoConfirmarSenha.value;

        // 1. Verificar campos obrigatórios
        if (
            !nome ||
            !email ||
            !telefone ||
            quantidadePlantas === "" ||
            !senha ||
            !confirmarSenha
        ) {
            mostrarMensagem("Preencha todos os campos.");
            return;
        }

        // 2. Verificar nome completo
        if (!nomeCompletoValido(nome)) {
            mostrarMensagem(
                "Digite seu nome completo, incluindo nome e sobrenome."
            );
            campoNome.focus();
            return;
        }

        // 3. Verificar e-mail
        if (!emailValido(email)) {
            mostrarMensagem(
                "Digite um e-mail válido, sem acentos e com @ e domínio. Exemplo: usuario@email.com"
            );
            campoEmail.focus();
            return;
        }

        // 4. Verificar força da senha
        if (!senhaForte(senha)) {
            mostrarMensagem(
                "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um símbolo especial."
            );
            campoSenha.focus();
            return;
        }

        // 5. Confirmar se as senhas são iguais
        if (senha !== confirmarSenha) {
            mostrarMensagem(
                "As senhas não coincidem. Digite a mesma senha nos dois campos."
            );
            campoConfirmarSenha.focus();
            campoConfirmarSenha.select();
            return;
        }

        // 6. Verificar se a API está disponível
        if (typeof cadastrarUsuario !== "function") {
            mostrarMensagem(
                "Não foi possível conectar ao sistema de cadastro. Verifique a API e tente novamente."
            );
            return;
        }

        // 7. Enviar cadastro
        btnCadastrar.disabled = true;
        btnCadastrar.textContent = "Cadastrando...";

        try {
            const resultado = await cadastrarUsuario({
                nome,
                email,
                telefone,
                quantidade_plantas: Number(quantidadePlantas),
                senha
            });

            mostrarMensagem(
                resultado?.mensagem ||
                    "Cadastro realizado com sucesso! Sua conta PlantaCare foi criada.",
                true
            );

            formCadastro.reset();

        } catch (erro) {
            console.error("Erro no cadastro:", erro);

            mostrarMensagem(
                erro.message || "Não foi possível realizar o cadastro."
            );
        } finally {
            btnCadastrar.disabled = false;
            btnCadastrar.textContent = "Cadastrar";
        }
    });

    // Conferir as senhas novamente quando o usuário digitar
    if (campoConfirmarSenha) {
        campoConfirmarSenha.addEventListener("input", function () {
            if (
                campoConfirmarSenha.value &&
                campoSenha.value !== campoConfirmarSenha.value
            ) {
                mostrarMensagem("As senhas não coincidem.");
            } else {
                mensagem.textContent = "";
            }
        });
    }
});
