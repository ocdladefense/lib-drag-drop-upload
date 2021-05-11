# lib-drag-drop-file-upload
Drag and drop file uploader

Requires:
1.	Obviously a page
2.	A form element with
    a.	 an id that matches the id set in the “dragDrop.js” file.
    b.	an action pointing to a callback.
3.	A link tag for the dragDrop.css before any relevant elements
4.	A script tag for the dragDrop.js after any relevant elements



### So far this library is dependant on this being in the page:  Gonna reduce that to no dependencies though.

```
<link rel="stylesheet" type="text/css" href="<?php print module_path(); ?>/lib-drag-drop-upload/css/dragDrop.css" />

<div id="container">
    
    <form id="upload-form" action="/test/drag/drop/upload">

    </form>

</div>

<script src="<?php print module_path(); ?>/lib-drag-drop-upload/js/dragDrop.js" />
```

