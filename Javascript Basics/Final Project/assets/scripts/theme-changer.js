Array.from(document.querySelectorAll("#mode-change-btn")).forEach(el => {
    el.addEventListener('click', () => {
        document.querySelector('body').classList.toggle("dark-body")
        Array.from(document.getElementsByClassName("changeHeadings")).forEach(el =>{
            el.classList.toggle("dark-mode-text");
        });
        Array.from(document.getElementsByClassName("output")).forEach(el =>{
            el.classList.toggle("dark-div");
        });
        Array.from(document.getElementsByClassName("converter-input")).forEach(el =>{
            el.classList.toggle("dark-input");
        });
        Array.from(document.getElementsByClassName("login-text")).forEach(el =>{
            el.classList.toggle("dark-mode-text");
        });
        Array.from(document.getElementsByClassName("close-login")).forEach(el =>{
            el.classList.toggle("dark-mode-text");
        });
        Array.from(document.getElementsByClassName("modal")).forEach(el =>{
            el.classList.toggle("dark-div");
        });
        document.getElementById("mode-change-btn").classList.toggle("fa-moon");
        document.getElementById("mode-change-btn").classList.toggle("fa-sun");
    });
});