class DragDropFileUpload {
    
    options;

    dropZone;

    formContainer;

    form;

    uploadOnDrop;

    fileInput;

    submitButton;

    primaryList;

    constructor(options) {

        this.options = options;

        // Set the drop zone element
        this.dropZone = document.querySelectorAll(this.options.get("dropZoneSelector"))[0];

        this.formContainer = document.getElementById(this.options.get("formContainerId"));

        this.createUploadElements();

        this.options.get("uploadOnDrop") ? this.submitButton.classList.add("hidden") : this.submitButton.classList.remove("hidden");

        this.options.get("includeFileDialog") ? this.fileInput.classList.remove("hidden") : this.fileInput.classList.add("hidden");

        this.primaryList = new DataTransfer();

        this.addEventListeners();
    }

    // Create and append all of the needed upload elements to the form.
    createUploadElements() {

        this.form = this.options.get("useExistingForm") ? document.getElementById(this.options.get("formId")) : this.appendFormElement();
        this.uploadContainer = this.appendUploadContainer();
        this.fileInput = this.appendFileInput();

        if(document.querySelectorAll("[type='submit']")[0] != null && this.options.get("useExistingForm")) {

            this.submitButton = document.querySelectorAll("[type='submit']")[0];
            
        } else {

            this.submitButton = this.appendSubmitButton();
        }
    }

    // add the files to the data transfer, and update the interface.
    addFiles(e) {

        this.updateDataTransfer(e);

        this.updateUserInterface();

        if(this.options.get("uploadOnDrop")) this.form.submit();
    }

    // Add the event listeners
    addEventListeners() {

        this.dropZone.ondragover = (e) => {

            e.preventDefault();
            e.target.classList.add("highlight");
        };
    
        this.dropZone.ondragleave = (e) => {
    
            e.preventDefault();
            e.target.classList.remove("highlight");
        };
    
        this.dropZone.ondrop = (e) => {
    
            e.preventDefault();
            e.target.classList.remove("highlight");
            this.addFiles(e);
        };
    
        this.fileInput.onchange = (e) => {
    
            e.preventDefault();	
            this.addFiles(e);
        };
    }


    updateDataTransfer(e){

        let files = e.type == "drop" ? e.dataTransfer.files : e.target.files;

        for(let i = 0; i <= files.length -1; i++){

            this.primaryList.items.add(files[i]);
        }

        this.fileInput.files = this.primaryList.files;
    }

    updateUserInterface() {

        let statusContainer = this.appendStatusContainer();
        let queuedFiles = this.getQueuedFileNames();

        this.updateStatusContainer(statusContainer, queuedFiles);
    }


    // Return the file names of the files currently stored in the "files" array of files in the "files" input element.
    getQueuedFileNames(){

        let queuedFileNames = new Array();
        for(let i = 0; i <= this.primaryList.files.length -1; i++){

            queuedFileNames.push(this.primaryList.files[i]["name"]);
        }

        return queuedFileNames;
    }

    updateStatusContainer(container, filenames){

        let ul = document.getElementById("filelist") != null ? document.getElementById("filelist") : document.createElement("ul");
        ul.setAttribute("id", "filelist");
        ul.setAttribute("style", "list-style: none;");

        for(let i = 0; i <= filenames.length -1; i++){

            let li = document.createElement("li");
            li.innerText = filenames[i];

            ul.appendChild(li);
        }

        container.appendChild(ul);
    }


    // Create the form element, insert it into the document nodelist, and return it.
    appendFormElement(){

        let form = document.createElement("form");
        form.setAttribute("id", this.options.get("formId"));
        form.setAttribute("action", this.options.get("formAction"));
        form.setAttribute("method", "post");
        form.setAttribute("enctype","multipart/form-data");

        this.formContainer.appendChild(form);  // Probably wont want to append here.

        return form;
    }

    // Create a container for the upload elements and append it to the form, and return in.
    appendUploadContainer(){

        let container = document.createElement("div");
        container.setAttribute("id", "file-input-container");
        container.classList.add("file-upload-container");
        container.setAttribute("style", "text-align:center;");

        let appendToElement = document.getElementById(this.options.get("appendToElementId"));

        appendToElement != null ? appendToElement.appendChild(container) : this.form.appendChild(container);
        
        return container;
    }

    // Create a input of type file, append it to the container, and return it.
    appendFileInput(filename){

        let fileInput = document.createElement("INPUT");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("name", "attachments__c[]");
        fileInput.setAttribute("id", "attachments__c[]");
        fileInput.setAttribute("multiple", true);
        fileInput.classList.add("upload");

        this.uploadContainer.appendChild(fileInput);

        return fileInput;
    }

    // Create a submit button, append it to the form, and return it.
    appendSubmitButton() {

        let button = document.createElement("button");
        button.setAttribute("type", "submit")
        button.setAttribute("id", "submit-button");
        button.innerText = "SUBMIT";
        button.classList.add("upload-button");

        this.form.appendChild(button);

        return button;
    }


    // Create a container for displaying the status of the files array.  The names of the files in the upload queue will be displayed here.
    appendStatusContainer(){
        
        let statusContainer = document.createElement("div");
        statusContainer.setAttribute("class", "form-item");

        this.uploadContainer.prepend(statusContainer);

        return statusContainer;
    }
}