const fileUploader = document.getElementById('file-upload');

const fileNameP = document.getElementById('filename');

fileUploader.onchange = function () {
    fileNameP.innerText = this.value.replace(/.*[\/\\]/, '');
};