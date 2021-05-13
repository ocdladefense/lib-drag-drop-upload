# lib-drag-drop-file-upload
Drag and drop file uploader

Requires:
1.  A link tag for the dragDrop.css
2.  A script tag for the app.js
3.	A script tag for the DragDropFileUpload.js


To do:
1. Figure out what happens if there is already a form on the page.
    
### This is a sample of what this library is expecting to be in the page with no pre-existing form:

```
<div id="form-container"></div>

<link rel="stylesheet" type="text/css" href="<?php print module_path(); ?>/lib-drag-drop-upload/css/dragDrop.css" />
<script src="<?php print module_path(); ?>/lib-drag-drop-upload/js/DragDropFileUpload.js"></script>
<script src="<?php print module_path(); ?>/lib-drag-drop-upload/js/app.js"></script>

```

### This is a sample of what this library is expecting to be in the page with a pre-existing form:

```
<form id="existing-form" action="/test/drag/drop/upload" method="post" multiple enctype="multipart/form-data">
    <button type="submit" id="existing-submit">Existing Submit</button>
</form>

<div id="form-container"></div>

<link rel="stylesheet" type="text/css" href="<?php print module_path(); ?>/lib-drag-drop-upload/css/dragDrop.css" />
<script src="<?php print module_path(); ?>/lib-drag-drop-upload/js/DragDropFileUpload.js"></script>
<script src="<?php print module_path(); ?>/lib-drag-drop-upload/js/app.js"></script>


```

