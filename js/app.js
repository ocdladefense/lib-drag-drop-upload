
// Settings and options
let options = new Map([
    ["includeFileDialog", false],
    ["uploadOnDrop", false],  // False will show the submit button on the form
    ["useExistingForm", false],
    ["dropZoneSelector", "body"],
    ["formId", "existing-form"],
    ["formAction", "/test/drag/drop/upload"],
    ["formContainerId", "form-container"]
]);


let dragDrop = new DragDropFileUpload(options);

