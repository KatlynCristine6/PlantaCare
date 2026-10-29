document.addEventListener("DOMContentLoaded", function () {

    const nome =
        sessionStorage.getItem("cadastroNome");

    const email =
        sessionStorage.getItem("cadastroEmail");

    const telefone =
        sessionStorage.getItem("cadastroTelefone");

    const plantas =
        sessionStorage.getItem("cadastroPlantas");


    document.getElementById("confirmaNome").textContent =
        nome || "";

    document.getElementById("confirmaEmail").textContent =
        email || "";

    document.getElementById("confirmaTelefone").textContent =
        telefone || "";

    document.getElementById("confirmaPlantas").textContent =
        plantas || "";


    /* =========================
       CADASTRAR DEFINITIVAMENTE
    ========================= */

    const btnCadastrar =
        document.getElementById("btnCadastrar");


    if (btnCadastrar) {

        btnCadastrar.addEventListener("click", function () {

            alert("Cadastro realizado com sucesso! 🌿");

            sessionStorage.clear();

            window.location.href =
                "login.html";

        });

    }


    /* =========================
       VOLTAR
    ========================= */

    const btnVoltar =
        document.getElementById("btnVoltar");


    if (btnVoltar) {

        btnVoltar.addEventListener("click", function () {

            window.location.href =
                "cadastro.html";

        });

    }

});