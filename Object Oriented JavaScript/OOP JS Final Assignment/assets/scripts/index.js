const modalBtn = document.getElementById('profile-pic');


const overlay = document.getElementById('overlay');

const modal = document.getElementsByClassName('modal')[0];

overlay.style.display = "none";

overlay.addEventListener('click', ()=>{
    overlay.style.display = "none";
});

modal.addEventListener('click', (e)=>{
    e.stopPropagation();
});

overlay.addEventListener('click', ()=>{
    overlay.style.display = "none";
});


modalBtn.addEventListener('click', ()=>{
    let infoList = user.info().split(";");

    for(let i = modal.childNodes.length - 1; i > -1; i--){
        if(modal.childNodes[i].nodeName === 'P')
            modal.childNodes[i].innerText = infoList.pop().trim();
        else if(modal.childNodes[i].nodeName === 'H1')
            modal.childNodes[i].innerText = infoList.pop().split(":")[1].trim();
    }

    overlay.style.display = "flex";
    console.log(user.info());
    console.log(modal.childNodes);
});
