
// Settings and options
let options = new Map();
options.set("includeFileDialog", false);
options.set("uploadOnDrop", false);
options.set("useExistingForm", false);
options.set("dropZoneSelector", "body");
options.set("formId", "existing-form");
options.set("formAction", "/test/drag/drop/upload");
options.set("formContainerId", "form-container");

let dragDrop = new DragDropFileUpload(options);

