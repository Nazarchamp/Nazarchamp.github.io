const querryInput = document.getElementById('query');

const googleBtn = document.getElementById('google-btn');
const bingBtn = document.getElementById('bing-btn');

googleBtn.addEventListener('click', ()=>{
   window.location.href = `https://google.com/search?q=${querryInput.value.trim()}`;
});

bingBtn.addEventListener('click', ()=>{
    window.location.href = `https://bing.com/search?q=${querryInput.value.trim()}`;
});