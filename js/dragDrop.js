// Set options for including the built in file dialog, and uploading a file when dropped instead of on click of the submit button.
let includeFileDialog = true;
let uploadOnDrop = true;

// Set the drop zone area
let dropContainer = document.getElementsByTagName("body")[0];

// Get the form from the document, and the submit button from the form.  This has to change.
let form = document.getElementById("upload-form");
let submitButton = document.getElementById("submit-button");
uploadOnDrop == true ? submitButton.classList.add("hidden") : submitButton.classList.remove("hidden");

// If the file input element does not already exist, create the element and append it to the form element.
let fileInput = document.getElementById('Attachments__c[]') != null ? document.getElementById('Attachments__c[]') : appendFileInput("rainbow.jpg");
let fileInputContainer = document.getElementById("file-input-container");
includeFileDialog == true ? fileInputContainer.classList.remove("hidden") : fileInputContainer.classList.add("hidden");

let primaryList = new DataTransfer();

dropContainer.ondragover = function(e) {

    e.preventDefault();
    dropContainer.classList.add("highlight");
};

dropContainer.ondragleave = function(e) {

    e.preventDefault();
    dropContainer.classList.remove("highlight");
};
  
dropContainer.ondrop = function(e) {

    e.preventDefault();
    dropContainer.classList.remove("highlight");
    addFiles(e);
};

fileInput.onchange = fileInput.onchange = function(e) {

    e.preventDefault();	
    addFiles(e);
}

function addFiles(e) {

    updateDataTransfer(e);

    updateUserInterface();

    if(uploadOnDrop == true){

        form.submit();
    }
}


function updateDataTransfer(e){

    let files = e.type == "drop" ? e.dataTransfer.files : e.target.files;

    for(let i = 0; i <= files.length -1; i++){

        primaryList.items.add(files[i]);
    }

    fileInput.files = primaryList.files;
}


function updateUserInterface() {

    let statusContainer = appendStatusContainer();
    let queuedFiles = getQueuedFileNames();

    updateStatusContainer(statusContainer, queuedFiles);
}


// Return the file names of the files currently stored in the "Attachments__c" array of files in the "files" input element.
function getQueuedFileNames(){

    let queuedFileNames = new Array();
    for(let i = 0; i <= primaryList.files.length -1; i++){

        queuedFileNames.push(primaryList.files[i]["name"]);
    }

    return queuedFileNames;
}

function updateStatusContainer(container, filenames){

    let ul = document.getElementById("filelist") != null ? document.getElementById("filelist") : document.createElement("ul");
    ul.setAttribute("id", "filelist");

    for(let i = 0; i <= filenames.length -1; i++){

        let li = document.createElement("li");
        li.innerText = filenames[i];

        ul.appendChild(li);
    }

    container.appendChild(ul);
}

// Create a file input element and insert it into the form before the last element.  Usually a submit button I would think.
// To do: This should just return the element.  The calling code shoud insert the element.
function appendFileInput(filename){

    let fileInput = document.createElement("INPUT");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("name", "Attachments__c[]");
    fileInput.setAttribute("id", "Attachments__c[]");
    fileInput.setAttribute("multiple", "true");
    fileInput.classList.add("upload");

    let container = document.createElement("div");
    container.setAttribute("id", "file-input-container");
    container.classList.add("file-upload-container");
    container.setAttribute("style", "text-align:center;");
    container.appendChild(fileInput);

    let button = document.createElement("button");
    button.innerHTML = "Select Image: " + filename;
    button.setAttribute("style","border-radious: 5px; margin-bottom: 5px;");
    container.appendChild(button);

    form.insertBefore(container, form.children[form.children.length -6]);

    return fileInput;
}

// Create a status container element and insert it into the form before the second to last element.  Would hopefully be the file input element.
// To do: This should just return the element.  The calling code shoud insert the element.
function appendStatusContainer(){

    let statusContainer = document.createElement("div");
    statusContainer.setAttribute("class", "form-item");

    form.insertBefore(statusContainer, form.children[form.children.length -2]);

    return statusContainer;
}