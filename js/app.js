let options = new Array(
    includeFileDialog => true,
    uploadOnDrop => true,
    dropZoneSelector => "body",
    formId => "upload-form",
    formAction => "/test/drag/drop/upload",
    insertBeforSelector => "footer"
);

let dragDrop = new DragDropFileUpload(options);
