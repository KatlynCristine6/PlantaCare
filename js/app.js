document.addEventListener("DOMContentLoaded", function () {

    const btnComecar = document.getElementById("btnComecar");
    const btnLogin = document.getElementById("btnLogin");

    if (btnComecar) {

        btnComecar.addEventListener("click", function () {

            window.location.href = "screens/login.html";

        });

    }

    if (btnLogin) {

        btnLogin.addEventListener("click", function () {

            window.location.href = "screens/login.html";

        });

    }

});