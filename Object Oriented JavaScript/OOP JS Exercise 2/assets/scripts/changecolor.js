Array.from(document.querySelectorAll("i")).forEach(el => {
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
        document.getElementById("mode-change-btn").classList.toggle("fa-moon");
        document.getElementById("mode-change-btn").classList.toggle("fa-sun");
    });
});
