const postBtn = document.getElementById("post-btn");

const postTextArea = document.getElementById("post-textarea");

const postContainer = document.getElementById("post-container");

postBtn.addEventListener('click', () => {
    if(fileUploader.files.length < 1 && postTextArea.value.trim() === ""){
        fileNameP.innerText = "Post Cannot be Blank!";
        return;
    }

    let newElement = document.createElement("div");
    newElement.classList.add("post");
    newElement.innerHTML = `
            <div class="post-heading">
                <div class="author-icon"></div>
                <h3 class="author">${user.name}</h3>
            </div>   
    `;

    if(postTextArea.value.trim() !== ""){
        newElement.innerHTML += `<p class="post-text">${postTextArea.value}</p>`;
    }

    if(fileUploader.files.length > 0){
        let latestFile = fileUploader.files[fileUploader.files.length-1];
        newElement.innerHTML += `<img src=${URL.createObjectURL(latestFile)} class="post-image">`
    }

    postContainer.appendChild(newElement);

    fileUploader.value = '';

    fileNameP.innerText = '';

    postTextArea.value = "";
});