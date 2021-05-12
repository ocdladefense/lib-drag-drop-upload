# lib-drag-drop-file-upload
Drag and drop file uploader

Requires:
1.	Obviously a page
2.	A form element that has an id that matches the id that is set in “dragDrop.js”, and an action pointing to a callback.
3.	A link tag for the dragDrop.css before any relevant elements
4.	A script tag for the dragDrop.js after any relevant elements


To do:
1. The dragDrop.js file should really be a class.
2. The library should have an "app.js" file that instanciates that class.
3. The dropzone should be highlighted when a file is dragged over it.
4. The form element should be created dynamically in the dragDrop.js file.
5. Figure out why the files are not being uploaded.
6. Figur3e out why the method on the request is "GET".  It should be "POST".
7. Need to make sure everything is really well documented/commented.
8. After everything is working, push to main, and tag a version 1.0.


### So far this library is dependant on this being in the page:  Gonna reduce that to no dependencies though.

```
<link rel="stylesheet" type="text/css" href="<?php print module_path(); ?>/lib-drag-drop-upload/css/dragDrop.css" />

<div id="container">
    
    <form id="upload-form" action="/test/drag/drop/upload">

    </form>

</div>

<script src="<?php print module_path(); ?>/lib-drag-drop-upload/js/dragDrop.js" />
```

