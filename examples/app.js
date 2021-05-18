
// Settings and options
let options = new Map();
options.set("includeFileDialog", false);            // Show the file input element?
options.set("uploadOnDrop", false);                 // Upload the file when it is dropped?
options.set("useExistingForm", true);              // Use a form that already exists in your page?
options.set("dropZoneSelector", "body");            // The id of the element that you want to be the drop zone?
options.set("formId", "existing-form");             // The id of the form.  Either the Id of a pre-existing form, or the id that will be given to the form rendered by the js. 
options.set("formAction", "/test/drag/drop/upload");// The action attribute that will be added to the form rendered by the js.  
options.set("formContainerId", "form-container");   // The Id that you want set to the form container element.
options.set("appendToElementId", "student-image");  // Append the file input container to this element.

let dragDrop = new DragDropFileUpload(options);

