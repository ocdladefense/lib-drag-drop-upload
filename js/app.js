
let options = new Map([
    ["includeFileDialog", true],
    ["uploadOnDrop", true],
    ["dropZoneSelector", "body"],
    ["formId", "upload-form"],
    ["formAction", "/test/drag/drop/upload"],
    ["formContainerId", "form-container"]
]);


let dragDrop = new DragDropFileUpload(options);

