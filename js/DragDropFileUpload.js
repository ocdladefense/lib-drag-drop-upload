class DragDropFileUpload {
    
    options;

    dropZone;

    form;

    uploadOnDrop;

    fileInput;

    submitButton;

    primaryList;

    constructor(options) {

        this.options = options;

        // Set the drop zone element
        this.dropZone = document.querySelectorAll(this.options.dropZoneSelector)[0];

        this.createUploadElements();

        this.addEventListeners();

        this.options.uploadOnDrop ? this.submitButton.classList.add("hidden") : this.submitButton.classList.remove("hidden");

        this.options.includeFileDialog ? this.fileInput.classList.remove("hidden") : this.fileInput.classList.add("hidden");

        this.primaryList = new DataTransfer();
    }

    // Create and append all of the needed upload elements to the form.
    createUploadElements() {

        this.form = document.getElementById(this.options.formId) != null ? document.getElementById(this.options.formId) : appendFormElement()
        this.uploadContainer = appendUploadContainer();
        this.fileInput = appendFileInput();
        this.submitButton = appendSubmitButton();
    }

    // Add the event listeners
    addEventListeners() {

        this.dropContainer.ondragover = function(e) {

            e.preventDefault();
            this.dropContainer.classList.add("highlight");
        };
    
        this.dropContainer.ondragleave = function(e) {
    
            e.preventDefault();
            this.dropContainer.classList.remove("highlight");
        };
    
        this.dropContainer.ondrop = function(e) {
    
            e.preventDefault();
            this.dropContainer.classList.remove("highlight");
            this.addFiles(e);
        };
    
        this.fileInput.onchange = function(e) {
    
            e.preventDefault();	
            this.addFiles(e);
        }
    }
    
    // add the files to the data transfer, and update the interface.
    addFiles(e) {

        this.updateDataTransfer(e);

        this.updateUserInterface();

        if(this.uploadOnDrop) this.form.submit();
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


    // Return the file names of the files currently stored in the "Attachments__c" array of files in the "files" input element.
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
        form.setAttribute("id", this.options.formId);
        form.setAttribute("action", this.options.formAction);

        this.dropContainer.insertBefore(form, document.querySelectorAll(this.options.insertBeforSelector)[0]);  // Probably wont want to append here.
        return form;
    }

    // Create a container for the upload elements and append it to the form, and return in.
    appendUploadContainer(){

        let container = document.createElement("div");
        container.setAttribute("id", "file-input-container");
        container.classList.add("file-upload-container");
        container.setAttribute("style", "text-align:center;");

        this.form.appendChild(container);  // Probably shouldnt append here.
        
        return container;
    }

    // Create a input of type file, append it to the container, and return it.
    appendFileInput(filename){

        let fileInput = document.createElement("INPUT");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("name", "Attachments__c[]");
        fileInput.setAttribute("id", "Attachments__c[]");
        fileInput.setAttribute("multiple", "true");
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

    getOptions() {

        return this.options;
    }
}