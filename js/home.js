
document.addEventListener("DOMContentLoaded", () => {
    const nomeElemento = document.getElementById("nomeUsuario");
    const totalElemento = document.getElementById("totalPlantas");
    const btnPerfil = document.getElementById("btnPerfil");
    const btnVerTodas = document.getElementById("btnVerTodas");

    // Carrega os dados do usuário, se existirem.
    try {
        const dados = localStorage.getItem("usuarioPlantaCare");
        const usuario = dados ? JSON.parse(dados) : null;

        if (usuario) {
            const nome = usuario.nome || usuario.usuario?.nome;

            if (nome && nomeElemento) {
                nomeElemento.textContent = nome.split(" ")[0];
            }

            const quantidade =
                usuario.quantidade_plantas ??
                usuario.usuario?.quantidade_plantas;

            if (
                quantidade !== undefined &&
                totalElemento &&
                Number.isFinite(Number(quantidade))
            ) {
                totalElemento.textContent = Number(quantidade);
            }
        }
    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
    }

    function mostrarAviso(mensagem) {
        let aviso = document.getElementById("avisoHome");

        if (!aviso) {
            aviso = document.createElement("div");
            aviso.id = "avisoHome";

            Object.assign(aviso.style, {
                position: "fixed",
                bottom: "85px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#315b38",
                color: "white",
                padding: "12px 18px",
                borderRadius: "12px",
                fontSize: "13px",
                zIndex: "20",
                maxWidth: "90%",
                textAlign: "center"
            });

            document.body.appendChild(aviso);
        }

        aviso.textContent = mensagem;
    }

    if (btnPerfil) {
        btnPerfil.addEventListener("click", () => {
            mostrarAviso("A tela de perfil será conectada em seguida.");
        });
    }

    if (btnVerTodas) {
        btnVerTodas.addEventListener("click", () => {
            mostrarAviso("A lista completa de plantas será conectada em seguida.");
        });
    }

    document.querySelectorAll(".item-menu").forEach((botao) => {
        botao.addEventListener("click", () => {
            const pagina = botao.dataset.pagina;

            if (pagina !== "inicio") {
                mostrarAviso(
                    "Vamos conectar a seção " + pagina + " em seguida."
                );
                return;
            }

            document.querySelectorAll(".item-menu").forEach((item) => {
                item.classList.remove("ativo");
            });

            botao.classList.add("ativo");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});
