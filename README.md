# Angular SimpleMDE
AngularJS integeration for the SimpleMDE markdown editor, [demo can be found here](http://nextstepwebs.github.io/simplemde-markdown-editor).

This module exposes a directive that can be placed on a textarea to expose the SimpleMDE editor.  It will handle the synchronisation between the ng-model and the actual editor.

## Install

Via [bower](https://www.bower.io).
```
bower install angular-simplemde --save
```

## Configuration

Include the *mbsimplemde.js* file in your project, along with the simplemde JS and CSS files.  For the simplemde files, the easiest setup is using the minified JS and CSS files in the dist directory, as they are built with the required codemirror libraries included.

## Usage

Currently this module only exposes a directive, this can be placed on any textarea as

```html
<textarea simplemde="options" ng-model="model">
</textarea>
```

where options is an object containing the [simplemde/codemirror configuration options](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration)

## Requests

Currently, this has been developed so that we can drop in the editor easily on multiple projects.  Please feel free to drop us a line in Issues if you have any requests or suggestions

## License
Copyright (c) 2015 Judd Kirby

[MIT License]