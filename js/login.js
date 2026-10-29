document.addEventListener("DOMContentLoaded", function () {

    const btnEntrar = document.getElementById("btnEntrar");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");

    if (!btnEntrar) return;

    btnEntrar.addEventListener("click", async function () {

        const email = emailInput.value.trim();
        const senha = senhaInput.value;

        if (!email || !senha) {
            alert("Preencha o e-mail e a senha.");
            return;
        }

        if (typeof fazerLogin !== "function") {
            alert("A comunicação com a API não foi carregada.");
            return;
        }

        btnEntrar.disabled = true;
        btnEntrar.textContent = "Entrando...";

        try {
            const resultado = await fazerLogin(email, senha);

            // Esta resposta deverá conter os dados do usuário
            // após implementarmos a rota POST /login na API.
            if (!resultado || !resultado.usuario) {
                throw new Error("Resposta de login inválida.");
            }

            // A identificação será utilizada na tela inicial.
            sessionStorage.setItem(
                "usuario",
                JSON.stringify(resultado.usuario)
            );

            window.location.href = "inicio.html";

        } catch (erro) {
            console.error("Erro no login:", erro);

            alert(
                erro.message ||
                "Não foi possível entrar. Verifique seus dados."
            );

        } finally {
            btnEntrar.disabled = false;
            btnEntrar.textContent = "Entrar";
        }
    });

});
