riot.tag('cockpit-field', '<div name="fieldcontainer" type="{ field.type }"></div>', function(opts) {

        var field   = opts.field || {},
            type    = field.type || 'text',
            options = field.options || {},
            fc      = 'field-'+type;

        if (!riot.tags[fc]) {
            fc = 'field-text';
        }

        if (opts.bind) {
            this.fieldcontainer.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            this.fieldcontainer.setAttribute('cls', opts.cls);
        }

        riot.mount(this.fieldcontainer, fc, options);

    
});





riot.tag('field-repeater', '', function(opts) {

        this.fields = [];


        this.$updateValue = function(value) {

            if (Array.isArray(value) && JSON.stringify(this.fields) != JSON.stringify(value)) {

                this.fields = value;
                this.update();
            }

        }.bind(this);


        this.add = function() {

            this.fields.push({
                type: 'text',
                value: null
            });
        }.bind(this);

        this.remove = function() {

        }.bind(this);


        this.on('update', function() {
            this.$setValue(this.fields);
        });


    
});

riot.tag('cockpit-finder', '<div show="{ data }"> <div class="uk-clearfix" data-uk-margin> <div class="uk-float-left"> <span class="uk-button uk-button-primary uk-margin-small-right uk-form-file"> <input class="js-upload-select" type="file" multiple="true" title=""> <i class="uk-icon-upload"></i> </span> <span class="uk-button-group uk-margin-small-right"> <span class="uk-position-relative uk-button" data-uk-dropdown="{\mode:\'click\'\\}"> <i class="uk-icon-magic"></i> <div class="uk-dropdown uk-text-left"> <ul class="uk-nav uk-nav-dropdown"> <li class="uk-nav-header">Create</li> <li><a onclick="{ createfolder }"><i class="uk-icon-folder-o uk-icon-justify"></i> Folder</a></li> <li><a onclick="{ createfile }"><i class="uk-icon-file-o uk-icon-justify"></i> File</a></li> </ul> </div> </span> <button class="uk-button" onclick="{ refresh }"> <i class="uk-icon-refresh"></i> </button> </span> <span class="uk-button" if="{ selected.count }" data-uk-dropdown="\\{mode:\'click\'\\}"> <strong>Batch:</strong> { selected.count } selected &nbsp;<i class="uk-icon-caret-down"></i> <div class="uk-dropdown uk-text-left"> <ul class="uk-nav uk-nav-dropdown"> <li class="uk-nav-header">Batch action</li> <li><a onclick="{ removeSelected }">Delete</a></li> </ul> </div> </span> </div> <div class="uk-float-right"> <div class="uk-form uk-form-icon uk-width-1-1"> <i class="uk-icon-filter"></i> <input name="filter" type="text" onkeyup="{ updatefilter }"> </div> </div> </div> <div class="uk-grid uk-grid-divider uk-margin-large-top" data-uk-grid-margin> <div class="uk-width-medium-1-4"> <div class="uk-panel"> <ul class="uk-nav uk-nav-side"> <li class="uk-nav-header">Display</li> <li class="{ !typefilter ? \'uk-active\':\'\' }"><a data-type="" onclick="{ settypefilter }"><i class="uk-icon-circle-o uk-icon-justify"></i> All</a></li> <li class="{ typefilter==\'images\' ? \'uk-active\':\'\' }"><a data-type="images" onclick="{ settypefilter }"><i class="uk-icon-image uk-icon-justify"></i> Images</a></li> <li class="{ typefilter==\'video\' ? \'uk-active\':\'\' }"><a data-type="video" onclick="{ settypefilter }"><i class="uk-icon-video-camera uk-icon-justify"></i> Video</a></li> <li class="{ typefilter==\'audio\' ? \'uk-active\':\'\' }"><a data-type="audio" onclick="{ settypefilter }"><i class="uk-icon-volume-up uk-icon-justify"></i> Audio</a></li> <li class="{ typefilter==\'documents\' ? \'uk-active\':\'\' }"><a data-type="documents" onclick="{ settypefilter }"><i class="uk-icon-paper-plane uk-icon-justify"></i> Documents</a></li> <li class="{ typefilter==\'archive\' ? \'uk-active\':\'\' }"><a data-type="archive" onclick="{ settypefilter }"><i class="uk-icon-archive uk-icon-justify"></i> Archive</a></li> </ul> </div> </div> <div class="uk-width-medium-3-4"> <div class="uk-panel"> <ul class="uk-breadcrumb"> <li onclick="{ changedir }"><a title="Change dir to root"><i class="uk-icon-home"></i></a></li> <li each="{folder, idx in breadcrumbs}"><a onclick="{ parent.changedir }" title="Change dir to @@ folder.name @@">{ folder.name }</a></li> </ul> </div> <div name="uploadprogress" class="uk-margin uk-hidden"> <div class="uk-progress"> <div name="progressbar" class="uk-progress-bar" style="width: 0%;">&nbsp;</div> </div> </div> <div class="uk-alert uk-text-center uk-margin" if="{ (this.typefilter || this.filter.value) && (data.folders.length || data.files.length) }"> Filter is active </div> <div class="uk-alert uk-text-center uk-margin" if="{ (!data.folders.length && !data.files.length) }"> This is an empty folder </div> <div> <div class="uk-margin-top" if="{data.folders.length}"> <strong class="uk-text-small uk-text-muted" if="{ !(this.filter.value) }"><i class="uk-icon-folder-o uk-margin-small-right"></i> { data.folders.length } Folders</strong> <ul class="uk-grid uk-grid-small uk-grid-match uk-grid-width-1-2 uk-grid-width-medium-1-4"> <li class="uk-grid-margin" each="{folder, idx in data.folders}" onclick="{ parent.select }" if="{ parent.infilter(folder) }"> <div class="uk-panel uk-panel-box { folder.selected ? \'uk-selected\':\'\' }"> <div class="uk-flex"> <div> <span class="uk-margin-small-right" data-uk-dropdown="\\{mode:\'click\'\\}"> <i class="uk-icon-folder-o uk-text-muted js-no-item-select"></i> <div class="uk-dropdown"> <ul class="uk-nav uk-nav-dropdown"> <li class="uk-nav-header uk-text-truncate">{ folder.name }</li> <li><a onclick="{ parent.rename }">Rename</a></li> <li><a onclick="{ parent.remove }">Delete</a></li> </ul> </div> </span> </div> <div class="uk-flex-item-1 uk-text-truncate"> <a class="uk-link-muted" onclick="{ parent.changedir }"><strong>{ folder.name }</strong></a> </div> </div> </div> </li> </ul> </div> <div class="uk-margin-top" if="{data.files.length}"> <strong class="uk-text-small uk-text-muted" if="{ !(this.typefilter || this.filter.value) }"><i class="uk-icon-file-o uk-margin-small-right"></i> { data.files.length } Files</strong> <ul class="uk-grid uk-grid-small uk-grid-match uk-grid-width-1-2 uk-grid-width-medium-1-4"> <li class="uk-grid-margin" each="{file, idx in data.files}" onclick="{ parent.select }" if="{ parent.infilter(file) }"> <div class="uk-panel uk-panel-box { file.selected ? \'uk-selected\':\'\' }"> <div class="uk-flex"> <div> <span class="uk-margin-small-right" data-uk-dropdown="\\{mode:\'click\'\\}"> <i class="uk-icon-{ parent.getIconCls(file) } uk-text-muted js-no-item-select"></i> <div class="uk-dropdown"> <ul class="uk-nav uk-nav-dropdown"> <li class="uk-nav-header uk-text-truncate">{ file.name }</li> <li><a onclick="{ parent.rename }">Rename</a></li> <li if="{ file.ext == \'zip\' }"><a onclick="{ parent.unzip }">Unzip</a></li> <li class="uk-nav-divider"></li> <li><a onclick="{ parent.remove }">Delete</a></li> </ul> </div> </span> </div> <div class="uk-flex-item-1 uk-text-truncate"> <a class="uk-link-muted js-no-item-select" onclick="{ parent.open }">{ file.name }</a> <div class="uk-margin-small-top uk-text-small uk-text-muted"> { file.size } </div> </div> </div> </div> </li> </ul> </div> </div> </div> </div> <div name="editor" class="uk-offcanvas"> <div class="uk-offcanvas-bar uk-width-3-4"> <picoedit></picoedit> </div> </div> </div>', '.uk-offcanvas[name=editor] .CodeMirror { height: auto; }', function(opts) {

        var $this = this,
            typefilters = {
                'images'    : /\.(jpg|jpeg|png|gif|svg)$/i,
                'video'     : /\.(mp4|mov|ogv|webv|flv|avi)$/i,
                'audio'     : /\.(mp3|weba|ogg|wav|flac)$/i,
                'archive'   : /\.(zip|rar|7zip|gz)$/i,
                'documents' : /\.(htm|html|pdf)$/i,
                'text'      : /\.(txt|htm|html|php|css|less|js|json|md|markdown|yaml|xml)$/i
            };

        this.currentpath = '/';

        this.data;
        this.breadcrumbs = [];
        this.selected    = {count:0, paths:{}};
        this.bookmarks   = {"folders":[], "files":[]};

        this.viewfilter = 'all';
        this.namefilter = '';

        this.mode       = 'table';
        this.dirlist    = false;
        this.selected   = {};


        App.$(this.editor).on('click', function(e){

            if (e.target.classList.contains('uk-offcanvas-bar')) {
                $this.tags.picoedit.codemirror.editor.focus();
            }
        });

        this.on('mount', function(){

            this.loadPath()

            App.assets.require(['/assets/lib/uikit/js/components/upload.js'], function() {

                var uploadSettings = {

                        action: App.route('/media/api'),
                        params: {"cmd":"upload"},
                        type: 'json',
                        before: function(options) {
                            options.params.path = $this.currentpath;
                        },
                        loadstart: function() {
                            $this.uploadprogress.classList.remove('uk-hidden');
                        },
                        progress: function(percent) {

                            percent = Math.ceil(percent) + '%';

                            $this.progressbar.innerHTML   = '<span>'+percent+'</span>';
                            $this.progressbar.style.width = percent;
                        },
                        allcomplete: function(response) {

                            $this.uploadprogress.classList.add('uk-hidden');

                            if (response && response.failed && response.failed.length) {
                                App.ui.notify("File(s) failed to uploaded.", "danger");
                            }

                            if (response && response.uploaded && response.uploaded.length) {
                                App.ui.notify("File(s) uploaded.", "success");
                                $this.loadPath();
                            }

                            if (!response) {
                                App.ui.notify("Soething went wrong.", "danger");
                            }

                        }
                },

                uploadselect = UIkit.uploadSelect(App.$('.js-upload-select', $this.root)[0], uploadSettings),
                uploaddrop   = UIkit.uploadDrop($this.root, uploadSettings);

                UIkit.init(this.root);
            });
        });


        this.changedir = function(e, path) {

            if (e && e.item) {
                e.stopPropagation();
                path = e.item.folder.path;
            } else {
                path = '/';
            }

            this.loadPath(path);
        }.bind(this);

        this.open = function(evt) {

            if (opts.previewfiles === false) {
                this.select(evt, true);
                return;
            }

            var file = evt.item.file,
                name = file.name.toLowerCase();

            if (name.match(typefilters.images)) {

                UIkit.lightbox.create([
                    {'source': file.url, 'type':'image'}
                ]).show();

            } else if(name.match(typefilters.video)) {

                UIkit.lightbox.create([
                    {'source': file.url, 'type':'video'}
                ]).show();

            } else if(name.match(typefilters.text)) {

                UIkit.offcanvas.show(this.editor);
                this.tags.picoedit.open(file.path);

            } else {
                App.ui.notify("Filetype nor supported");
            }
        }.bind(this);

        this.refresh = function() {
            this.loadPath().then(function(){
                App.ui.notify('Folder reloaded');
            });
        }.bind(this);

        this.select = function(e, force) {

            if (e && e.item && force || !e.target.classList.contains('js-no-item-select') && !App.$(e.target).parents('.js-no-item-select').length) {

                try {
                    window.getSelection().empty()
                } catch(err) {
                    try {
                        window.getSelection().removeAllRanges()
                    } catch(err){}
                }

                var item = e.item.folder || e.item.file, idx = e.item.idx;

                if (e.shiftKey) {

                    var prev, items = this.data[item.is_file ? 'files' : 'folders'];

                    for (var i=idx;i>=0;i--) {
                        if (items[i].selected) break;

                        items[i].selected = true;
                        this.selected.paths[items[i].path] = items[i];
                    }

                    this.selected.count = Object.keys(this.selected.paths).length;

                    return;
                }

                if (!(e.metaKey || e.ctrlKey)) {

                    Object.keys(this.selected.paths).forEach(function(path) {
                        if (path != item.path) {
                            $this.selected.paths[path].selected = false;
                            delete $this.selected.paths[path];
                        }
                    });
                }

                item.selected = !item.selected;

                if (!item.selected && this.selected.paths[item.path]) {
                    delete this.selected.paths[item.path];
                }

                if (item.selected && !this.selected.paths[item.path]) {
                    this.selected.paths[item.path] = item;
                }

                this.selected.count = Object.keys(this.selected.paths).length;

                if (opts.onChangeSelect) {
                    opts.onChangeSelect(this.selected);
                }
            }
        }.bind(this);

        this.rename = function(e, item) {

            e.stopPropagation();

            item = e.item.folder || e.item.file;

            App.ui.prompt("Please enter a name:", item.name, function(name){


                if (name!=item.name && name.trim()) {

                    requestapi({"cmd":"rename", "path": item.path, "name":name});
                    item.path = item.path.replace(item.name, name);
                    item.name = name;

                    $this.update();
                }

            });
        }.bind(this);

        this.unzip = function(e, item) {

            e.stopPropagation();

            item = e.item.file;

            requestapi({"cmd": "unzip", "path": $this.currentpath, "zip": item.path}, function(resp){

                if (resp) {

                    if (resp.success) {
                        App.ui.notify("Archive extracted!", "success");
                    } else {
                        App.ui.notify("Extracting archive failed!", "error");
                    }
                }

                $this.loadPath();

            });
        }.bind(this);

        this.remove = function(e, item, index) {

            e.stopPropagation();

            item = e.item.folder || e.item.file;

            App.ui.confirm("Are you sure?", function() {

                requestapi({"cmd":"removefiles", "paths": item.path}, function(){

                    index = $this.data[item.is_file ? "files":"folders"].indexOf(item);

                    $this.data[item.is_file ? "files":"folders"].splice(index, 1);

                    App.ui.notify("Item(s) deleted", "success");

                    $this.update();
                });
            });
        }.bind(this);

        this.removeSelected = function() {

            var paths = Object.keys(this.selected.paths);

            if (paths.length) {

                App.ui.confirm("Are you sure?", function() {

                    requestapi({"cmd":"removefiles", "paths": paths}, function(){
                        $this.loadPath();
                        App.ui.notify("File(s) deleted", "success");
                    });
                });
            }
        }.bind(this);

        this.createfolder = function() {

            App.ui.prompt("Please enter a folder name:", "", function(name){

                if (name.trim()) {
                    requestapi({"cmd":"createfolder", "path": $this.currentpath, "name":name}, function(){
                        $this.loadPath();
                    });
                }
            });
        }.bind(this);

        this.createfile = function() {

            App.ui.prompt("Please enter a file name:", "", function(name){

                if (name.trim()) {
                    requestapi({"cmd":"createfile", "path": $this.currentpath, "name":name}, function(){
                        $this.loadPath();
                    });
                }
            });
        }.bind(this);

        this.loadPath = function(path, defer) {

            path  = path || $this.currentpath;
            defer = App.deferred();

            requestapi({"cmd":"ls", "path": path}, function(data){

                $this.currentpath = path;
                $this.breadcrumbs = [];
                $this.selected    = {};
                $this.selectAll   = false;

                if ($this.currentpath && $this.currentpath != '/' && $this.currentpath != '.'){
                    var parts   = $this.currentpath.split('/'),
                        tmppath = [],
                        crumbs  = [];

                    for(var i=0;i<parts.length;i++){
                        tmppath.push(parts[i]);
                        crumbs.push({'name':parts[i],'path':tmppath.join("/")});
                    }

                    $this.breadcrumbs = crumbs;
                }

                defer.resolve(data);

                $this.data = data;

                $this.resetselected();
                $this.update();

            });

            return defer;
        }.bind(this);

        this.settypefilter = function(evt) {
            this.typefilter = evt.target.dataset.type;
            this.resetselected();
        }.bind(this);

        this.updatefilter = function(evt) {
            this.resetselected();
        }.bind(this);

        this.infilter = function(item) {

            var name = item.name.toLowerCase();

            if (this.typefilter && item.is_file && typefilters[this.typefilter]) {

                if (!name.match(typefilters[this.typefilter])) {
                    return false;
                }
            }

            return (!this.filter.value || (name && name.indexOf(this.filter.value.toLowerCase()) !== -1));
        }.bind(this);

        this.resetselected = function() {

            if (this.selected.paths) {
                Object.keys(this.selected.paths).forEach(function(path) {
                    $this.selected.paths[path].selected = false;
                });
            }

            this.selected  = {count:0, paths:{}};

            if (opts.onChangeSelect) {
                opts.onChangeSelect(this.selected);
            }
        }.bind(this);

        this.getIconCls = function(file) {

            var name = file.name.toLowerCase();

            if (name.match(typefilters.images)) {

                return 'image';

            } else if(name.match(typefilters.video)) {

                return 'video';

            } else if(name.match(typefilters.text)) {

                return 'pencil';

            } else if(name.match(typefilters.archive)) {

                return 'archive';

            } else {
                return 'file-o';
            }
        }.bind(this);


        function requestapi(data, fn, type) {

            data = Object.assign({"cmd":""}, data);

            App.request('/media/api', data).then(fn);
        }


    
});

riot.tag('cockpit-search', '<div name="autocomplete" class="uk-autocomplete uk-form-icon uk-form app-search"> <i class="uk-icon-search"></i> <input class="uk-width-1-1 uk-form-blank" type="text" placeholder="{ App.i18n.get(\'Search...\') }"> </div>', 'cockpit-search .uk-dropdown { min-width: 25vw; }', function(opts) {

        this.on('mount', function(){

            UIkit.autocomplete(this.autocomplete, {
                source: App.route('/cockpit/search'),
                template: '<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="" data-url="{{$item.url}}"><a><i class="uk-icon-{{ ($item.icon || "cube") }}"></i> {{$item.title}}</a></li>{{/items}}</ul>'
            });
        });

        App.$(this.root).on("selectitem.uk.autocomplete", function(e, data) {

            if (data.url) {
                location.href = data.url;
            }
        });

    
});

riot.tag('codemirror', '', function(opts) {

        var $this = this,
            root  = this.root,
            $root = App.$(root),
            $textarea, editor, options;

        this.on('mount', function(){

            App.assets.require([
                '/assets/lib/codemirror/lib/codemirror.js'
            ], function() {

                $textarea = App.$('<textarea style="visibility:hidden;"></textarea>');

                $root.append($textarea);

                editor = CodeMirror.fromTextArea($textarea[0], App.$.extend({
                    lineNumbers: true,
                    theme: 'light',
                    indentUnit: 2,
                    indentWithTabs: false,
                    smartIndent: false,
                    tabSize: 2,
                    autoCloseBrackets: true,
                    extraKeys: {
                        Tab: function(cm) {
                            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                            cm.replaceSelection(spaces);
                        }
                    }
                }, opts || {}));

                root.editor = editor;
                this.editor = editor;

                init();

                this.trigger('ready');

            }.bind(this));

        });

        function init() {

            CodeMirror.modeInfo = [
                {name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"]},
                {name: "PGP", mimes: ["application/pgp", "application/pgp-keys", "application/pgp-signature"], mode: "asciiarmor", ext: ["pgp"]},
                {name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk", file: /^extensions\.conf$/i},
                {name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"]},
                {name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"]},
                {name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"]},
                {name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp"]},
                {name: "Clojure", mime: "text/x-clojure", mode: "clojure", ext: ["clj"]},
                {name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists.txt$/},
                {name: "CoffeeScript", mime: "text/x-coffeescript", mode: "coffeescript", ext: ["coffee"], alias: ["coffee", "coffee-script"]},
                {name: "Common Lisp", mime: "text/x-common-lisp", mode: "commonlisp", ext: ["cl", "lisp", "el"], alias: ["lisp"]},
                {name: "Cypher", mime: "application/x-cypher-query", mode: "cypher", ext: ["cyp", "cypher"]},
                {name: "Cython", mime: "text/x-cython", mode: "python", ext: ["pyx", "pxd", "pxi"]},
                {name: "CSS", mime: "text/css", mode: "css", ext: ["css"]},
                {name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"]},
                {name: "D", mime: "text/x-d", mode: "d", ext: ["d"]},
                {name: "Dart", mimes: ["application/dart", "text/x-dart"], mode: "dart", ext: ["dart"]},
                {name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"]},
                {name: "Django", mime: "text/x-django", mode: "django"},
                {name: "Dockerfile", mime: "text/x-dockerfile", mode: "dockerfile", file: /^Dockerfile$/},
                {name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"]},
                {name: "Dylan", mime: "text/x-dylan", mode: "dylan", ext: ["dylan", "dyl", "intr"]},
                {name: "EBNF", mime: "text/x-ebnf", mode: "ebnf"},
                {name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"]},
                {name: "Eiffel", mime: "text/x-eiffel", mode: "eiffel", ext: ["e"]},
                {name: "Embedded Javascript", mime: "application/x-ejs", mode: "htmlembedded", ext: ["ejs"]},
                {name: "Embedded Ruby", mime: "application/x-erb", mode: "htmlembedded", ext: ["erb"]},
                {name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"]},
                {name: "Forth", mime: "text/x-forth", mode: "forth", ext: ["forth", "fth", "4th"]},
                {name: "Fortran", mime: "text/x-fortran", mode: "fortran", ext: ["f", "for", "f77", "f90"]},
                {name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"]},
                {name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"]},
                {name: "Gherkin", mime: "text/x-feature", mode: "gherkin", ext: ["feature"]},
                {name: "GitHub Flavored Markdown", mime: "text/x-gfm", mode: "gfm", file: /^(readme|contributing|history).md$/i},
                {name: "Go", mime: "text/x-go", mode: "go", ext: ["go"]},
                {name: "Groovy", mime: "text/x-groovy", mode: "groovy", ext: ["groovy"]},
                {name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"]},
                {name: "Haskell", mime: "text/x-haskell", mode: "haskell", ext: ["hs"]},
                {name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"]},
                {name: "HXML", mime: "text/x-hxml", mode: "haxe", ext: ["hxml"]},
                {name: "ASP.NET", mime: "application/x-aspx", mode: "htmlembedded", ext: ["aspx"], alias: ["asp", "aspx"]},
                {name: "HTML", mime: "text/html", mode: "htmlmixed", ext: ["html", "htm"], alias: ["xhtml"]},
                {name: "HTTP", mime: "message/http", mode: "http"},
                {name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"]},
                {name: "Jade", mime: "text/x-jade", mode: "jade", ext: ["jade"]},
                {name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"]},
                {name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"]},
                {name: "JavaScript", mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
                 mode: "javascript", ext: ["js"], alias: ["ecmascript", "js", "node"]},
                {name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"]},
                {name: "JSON-LD", mime: "application/ld+json", mode: "javascript", ext: ["jsonld"], alias: ["jsonld"]},
                {name: "Jinja2", mime: "null", mode: "jinja2"},
                {name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"]},
                {name: "Kotlin", mime: "text/x-kotlin", mode: "kotlin", ext: ["kt"]},
                {name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"]},
                {name: "LiveScript", mime: "text/x-livescript", mode: "livescript", ext: ["ls"], alias: ["ls"]},
                {name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"]},
                {name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"]},
                {name: "mIRC", mime: "text/mirc", mode: "mirc"},
                {name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql"},
                {name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"]},
                {name: "MUMPS", mime: "text/x-mumps", mode: "mumps"},
                {name: "MS SQL", mime: "text/x-mssql", mode: "sql"},
                {name: "MySQL", mime: "text/x-mysql", mode: "sql"},
                {name: "Nginx", mime: "text/x-nginx-conf", mode: "nginx", file: /nginx.*\.conf$/i},
                {name: "NTriples", mime: "text/n-triples", mode: "ntriples", ext: ["nt"]},
                {name: "Objective C", mime: "text/x-objectivec", mode: "clike", ext: ["m", "mm"]},
                {name: "OCaml", mime: "text/x-ocaml", mode: "mllike", ext: ["ml", "mli", "mll", "mly"]},
                {name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"]},
                {name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"]},
                {name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"]},
                {name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"]},
                {name: "PHP", mime: "application/x-httpd-php", mode: "php", ext: ["php", "php3", "php4", "php5", "phtml"]},
                {name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"]},
                {name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"]},
                {name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"]},
                {name: "Properties files", mime: "text/x-properties", mode: "properties", ext: ["properties", "ini", "in"], alias: ["ini", "properties"]},
                {name: "Python", mime: "text/x-python", mode: "python", ext: ["py", "pyw"]},
                {name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"]},
                {name: "Q", mime: "text/x-q", mode: "q", ext: ["q"]},
                {name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r"], alias: ["rscript"]},
                {name: "reStructuredText", mime: "text/x-rst", mode: "rst", ext: ["rst"], alias: ["rst"]},
                {name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm"},
                {name: "RPM Spec", mime: "text/x-rpm-spec", mode: "rpm", ext: ["spec"]},
                {name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"]},
                {name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"]},
                {name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"]},
                {name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"]},
                {name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"]},
                {name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"]},
                {name: "Shell", mime: "text/x-sh", mode: "shell", ext: ["sh", "ksh", "bash"], alias: ["bash", "sh", "zsh"]},
                {name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"]},
                {name: "Slim", mimes: ["text/x-slim", "application/x-slim"], mode: "slim", ext: ["slim"]},
                {name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"]},
                {name: "Smarty", mime: "text/x-smarty", mode: "smarty", ext: ["tpl"]},
                {name: "Solr", mime: "text/x-solr", mode: "solr"},
                {name: "Soy", mime: "text/x-soy", mode: "soy", ext: ["soy"], alias: ["closure template"]},
                {name: "SPARQL", mime: "application/sparql-query", mode: "sparql", ext: ["rq", "sparql"], alias: ["sparul"]},
                {name: "Spreadsheet", mime: "text/x-spreadsheet", mode: "spreadsheet", alias: ["excel", "formula"]},
                {name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"]},
                {name: "MariaDB", mime: "text/x-mariadb", mode: "sql"},
                {name: "sTeX", mime: "text/x-stex", mode: "stex"},
                {name: "LaTeX", mime: "text/x-latex", mode: "stex", ext: ["text", "ltx"], alias: ["tex"]},
                {name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v"]},
                {name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"]},
                {name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"]},
                {name: "TiddlyWiki ", mime: "text/x-tiddlywiki", mode: "tiddlywiki"},
                {name: "Tiki wiki", mime: "text/tiki", mode: "tiki"},
                {name: "TOML", mime: "text/x-toml", mode: "toml", ext: ["toml"]},
                {name: "Tornado", mime: "text/x-tornado", mode: "tornado"},
                {name: "troff", mime: "troff", mode: "troff", ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]},
                {name: "Turtle", mime: "text/turtle", mode: "turtle", ext: ["ttl"]},
                {name: "TypeScript", mime: "application/typescript", mode: "javascript", ext: ["ts"], alias: ["ts"]},
                {name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"]},
                {name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"]},
                {name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"]},
                {name: "Verilog", mime: "text/x-verilog", mode: "verilog", ext: ["v"]},
                {name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd"], alias: ["rss", "wsdl", "xsd"]},
                {name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"]},
                {name: "YAML", mime: "text/x-yaml", mode: "yaml", ext: ["yaml", "yml"], alias: ["yml"]},
                {name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"]}
              ];

              for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
                var info = CodeMirror.modeInfo[i];
                if (info.mimes) info.mime = info.mimes[0];
              }

              CodeMirror.findModeByMIME = function(mime) {
                mime = mime.toLowerCase();
                for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
                  var info = CodeMirror.modeInfo[i];
                  if (info.mime == mime) return info;
                  if (info.mimes) for (var j = 0; j < info.mimes.length; j++)
                    if (info.mimes[j] == mime) return info;
                }
              };

              CodeMirror.findModeByExtension = function(ext) {
                for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
                  var info = CodeMirror.modeInfo[i];
                  if (info.ext) for (var j = 0; j < info.ext.length; j++)
                    if (info.ext[j] == ext) return info;
                }
              };

              CodeMirror.findModeByFileName = function(filename) {
                for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
                  var info = CodeMirror.modeInfo[i];
                  if (info.file && info.file.test(filename)) return info;
                }
                var dot = filename.lastIndexOf(".");
                var ext = dot > -1 && filename.substring(dot + 1, filename.length);
                if (ext) return CodeMirror.findModeByExtension(ext);
              };

              CodeMirror.findModeByName = function(name) {
                name = name.toLowerCase();
                for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
                  var info = CodeMirror.modeInfo[i];
                  if (info.name.toLowerCase() == name) return info;
                  if (info.alias) for (var j = 0; j < info.alias.length; j++)
                    if (info.alias[j].toLowerCase() == name) return info;
                }
              };
        }


    
});

riot.tag('field-boolean', '<button type="button" name="button" class="uk-button uk-button-{ checked ? \'success\':\'default\'}" onclick="{ toggle }"> <i if="{parent.checked}" class="uk-icon-check"></i> <i if="{!parent.checked}" class="uk-icon-times"></i> </button>', function(opts) {

        if (opts.cls) {
            App.$(this.button).addClass(opts.cls.replace(/uk\-form\-/g, 'uk-button-'));
        }

        this.button.innerHTML = opts.label || '<i class="uk-icon-check"></i>';

        this.$updateValue = function(value) {

            if (this.checked != value) {

                this.checked = value;
                this.update();
            }

        }.bind(this);

        this.toggle = function() {
            this.$setValue(!this.checked);
        }.bind(this);

    
});

riot.tag('field-date', '<input name="input" class="uk-width-1-1" type="text">', function(opts) {

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        if (opts.required) {
            this.input.setAttribute('required', 'required');
        }

        this.on('mount', function(){

            App.assets.require(['/assets/lib/uikit/js/components/datepicker.js'], function() {

                UIkit.datepicker(this.input, opts);

            }.bind(this));
        });

    
});

riot.tag('field-file', '<div class="uk-flex"> <input class="uk-flex-item-1 uk-margin-small-right" type="text" name="input"> <button type="button" class="uk-button" name="picker"><i class="uk-icon-hand-o-up"></i></button> </div>', function(opts) {

        var $this = this, $input = App.$(this.input);

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
            App.$(this.picker).addClass(opts.cls);
        }

        App.$([this.picker, this.input]).on('click', function() {

            App.media.select(function(selected) {
                $input.val(selected[0]).trigger('change');
            });
        });

    
});

riot.tag('field-gallery', '<div class="uk-panel uk-panel-box"> <div name="imagescontainer" class="uk-grid uk-grid-match uk-grid-small uk-grid-gutter uk-grid-width-medium-1-4" show="{ data.images && data.images.length }"> <div class="uk-grid-margin" data-idx="{ idx }" each="{ img,idx in data.images }"> <div class="uk-panel uk-panel-card"> <figure class="uk-display-block uk-overlay uk-overlay-hover"> <img riot-src="{ (SITE_URL+img.path) }"> <figcaption class="uk-overlay-panel uk-overlay-background"> <ul class="uk-subnav"> <li><a onclick="{ parent.title }"><i class="uk-icon-tag"></i></a></li> <li><a onclick="{ parent.remove }"><i class="uk-icon-trash-o"></i></a></li> </ul> <p class="uk-text-small uk-text-truncate">{ img.title }</p> </figcaption> </figure> </div> </div> </div> <div class="{data.images && data.images.length ? \'uk-margin-top\':\'\' }"> <span if="{ data.images && !data.images.length }">{ App.i18n.get(\'Gallery is empty\') }.</span> <a class="uk-button uk-button-link" onclick="{ selectimages }"> <i class="uk-icon-plus-circle"></i> { App.i18n.get(\'Add images\') } </a> </div> </div>', function(opts) {

        var $this = this;

        this.data = { images: [] };

        this.on('mount', function() {

            UIkit.sortable(this.imagescontainer, {

                animation: false,
                dragCustomClass:'uk-form'

            }).element.on("change.uk.sortable", function(e, sortable, ele) {

                ele = App.$(ele);

                var images = $this.data.images,
                    cidx   = ele.index(),
                    oidx   = ele.data('idx');

                images.splice(cidx, 0, images.splice(oidx, 1)[0]);

                $this.data.images = [];
                $this.update();

                setTimeout(function() {
                    $this.data.images = images;
                    $this.update();
                }, 0);

            });

        });

        this.$updateValue = function(value) {

            if (this.data.images !== value && Array.isArray(value)) {
                this.data.images = value;
                this.update();
            }

        }.bind(this);


        this.selectimages = function() {

            App.media.select(function(selected) {

                var images = [];

                selected.forEach(function(path){
                    images.push({title:'', path:path});
                });

                $this.$setValue($this.data.images.concat(images));

            }, { pattern: '*.jpg|*.png|*.gif|*.svg' });
        }.bind(this);

        this.remove = function(e) {
            this.data.images.splice(e.item.idx, 1);
            this.$setValue(this.data.images);
        }.bind(this);

        this.title = function(e) {

            App.ui.prompt('Title', this.data.images[e.item.idx].title, function(value) {
                $this.data.images[e.item.idx].title = value;
                $this.$setValue($this.data.images);
                $this.update();
            });
        }.bind(this);

    
});

riot.tag('field-html', '<textarea name="input" class="uk-visibility-hidden"></textarea>', function(opts) {

        var $this = this;

        this.value = null;

        this.$updateValue = function(value) {

            if (this.value != value) {

                this.value = value;
            }

        }.bind(this);


        this.on('mount', function(){

            App.assets.require([

                '/assets/lib/marked.js',
                '/assets/lib/codemirror/lib/codemirror.js',
                '/assets/lib/uikit/js/components/htmleditor.js'

            ], function() {

                $this.input.value = $this.value;

                var editor = UIkit.htmleditor(this.input, opts);

                editor.on('input', function() {
                    $this.$setValue(editor.editor.getValue());
                });

            }.bind(this));
        });

    
});

riot.tag('field-location', '<div> <div class="uk-form uk-form-icon uk-margin-small-bottom uk-width-1-1"> <i class="uk-icon-search"></i><input name="autocomplete" class="uk-width-1-1"> </div> <div name="map" style="min-height:300px;"> Loading map... </div> <div class="uk-text-small uk-margin-small-top"> LAT: <span class="uk-text-muted">{ latlng.lat }</span> LNG: <span class="uk-text-muted">{ latlng.lng }</span> </div> </div>', function(opts) {

        var loadApi = (function(){

            var p, fn = function(){

                if (!p) {

                    p = new Promise(function(resolve){

                        var script = document.createElement('script');

                        script.async = true;

                        script.onload = function() {

                            google.load("maps", "3", {other_params:'sensor=false&libraries=places', callback: function(){
                              if (google && google.maps.places) resolve();
                            }});
                        };

                        script.onerror = function() {
                            alert('Failed loading google maps api.');
                        };

                        script.src = 'https://www.google.com/jsapi';

                        document.getElementsByTagName('head')[0].appendChild(script);
                    });
                }

                return p;
            };

            return fn;
        })();

        var $this = this;

        this.latlng = {lat:53.55909862554551, lng:9.998652343749995};

        this.$updateValue = function(value) {

            if (value && this.latlng != value) {
                this.latlng = value;
                this.update();
            }

        }.bind(this);

        this.on('mount', function(){

            loadApi().then(function(){

                var map, marker, point = new google.maps.LatLng($this.latlng.lat, $this.latlng.lng), input, autocomplete;

                map = new google.maps.Map($this.map, {
                    zoom   : 6,
                    center : point
                });

                marker = new google.maps.Marker({
                    position  : point,
                    map       : map,
                    draggable : true
                });

                google.maps.event.addListener(marker, 'dragend', function() {
                    var point = marker.getPosition();
                    $this.$setValue({lat: point.lat(), lng:point.lng()} );
                    input.value = "";
                });

                App.$(window).on('resize', function(){
                    google.maps.event.trigger(map,'resize');
                    map.setCenter(marker.getPosition());
                });


                input = $this.autocomplete;

                autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', map);

                google.maps.event.addListener(autocomplete, 'place_changed', function(e) {

                    var place = autocomplete.getPlace();

                    if (!place.geometry) {
                      return;
                    }

                    if (place.geometry.viewport) {
                      map.fitBounds(place.geometry.viewport);
                    } else {
                      map.setCenter(place.geometry.location);
                    }

                    marker.setPosition(place.geometry.location);
                    input.value = "";

                    var point = marker.getPosition();
                    $this.$setValue({lat: point.lat(), lng:point.lng()} );
                });

                google.maps.event.addDomListener(input, 'keydown', function(e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                    }
                });


            });

        });


    
});
riot.tag('field-longtext', '<textarea name="input" class="uk-width-1-1"></textarea>', function(opts) {

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        if (opts.rows) {
            this.input.setAttribute('rows', opts.rows);
        }

        if (opts.required) {
            this.input.setAttribute('required', 'required');
        }

        if (opts.allowtabs) {

            this.input.onkeydown = function(e) {
                if (e.keyCode === 9) {
                    var val = this.value, start = this.selectionStart, end = this.selectionEnd;
                    this.value = val.substring(0, start) + '\t' + val.substring(end);
                    this.selectionStart = this.selectionEnd = start + 1;
                    return false;
                }
            };

            this.input.style.tabSize = opts.allowtabs;
        }

    
});

riot.tag('field-markdown', '<field-html name="input" markdown="true"></field-html>', function(opts) {

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

    
});

riot.tag('field-object', '<textarea name="input" class="uk-width-1-1" onchange="{ change }"></textarea>', function(opts) {

        this.value = {};

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        this.input.setAttribute('rows', opts.rows || 5);
        this.input.setAttribute('style', 'font-family: monospace;tab-size:2;');

        if (opts.required) {
            this.input.setAttribute('required', 'required');
        }

        this.input.onkeydown = function(e) {

            if (e.keyCode === 9) {
                var val = this.value, start = this.selectionStart, end = this.selectionEnd;
                this.value = val.substring(0, start) + '\t' + val.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;
                return false;
            }
        };

        this.$updateValue = function(value) {

            if (JSON.stringify(this.value) != JSON.stringify(value)) {

                this.value = value;
                this.input.value = JSON.stringify(this.value, null, 2);
            }

        }.bind(this);

        this.change = function() {
            this.$setValue(App.Utils.str2json(this.input.value) || this.value);
        }.bind(this);

    
});

riot.tag('field-password', '<div class="uk-form-password uk-width-1-1"> <input name="input" class="uk-width-1-1" type="password"> <a href="" class="uk-form-password-toggle" data-uk-form-password>Show</a> </div>', function(opts) {

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        this.on('mount', function(){

            App.assets.require(['/assets/lib/uikit/js/components/form-password.js'], function() {

                UIkit.init(this.root);

            }.bind(this));
        });

    
});

riot.tag('field-select', '<select name="input" class="uk-width-1-1"> <option value=""></option> <option each="{ option,idx in options }" value="{ option }">{ option }</option> </select>', function(opts) {

        this.options = opts.options || []

        if (typeof(this.options) === 'string') {

            var options = [];

            this.options.split(',').forEach(function(option) {
                options.push(option.trim());
            });

            this.options = options;
        }

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        if (opts.required) {
            this.fieldcontainer.setAttribute('required', 'required');
        }

    
});

riot.tag('field-tags', '<div> <div name="autocomplete" class="uk-autocomplete uk-form-icon uk-form"> <i class="uk-icon-tag"></i> <input name="input" class="uk-width-1-1 uk-form-blank" type="text" placeholder="{ App.i18n.get(\'Add Tag...\') }"> </div> <div class="uk-margin uk-panel uk-panel-box" if="{ tags && tags.length }"> <span class="uk-margin-small-right uk-margin-small-top" each="{tag,idx in tags}"> <a onclick="{ parent.remove }"><i class="uk-icon-close"></i></a> {{ tag }} </span> </div> </div>', function(opts) {

        var $this = this;

        this.tags = [];

        this.on('mount', function(){

            App.$(this.input).on('keydown', function(e) {

                if (e.keyCode == 13 && $this.input.value.trim()) {

                    e.stopImmediatePropagation();
                    e.stopPropagation();

                    $this.tags.push($this.input.value);
                    $this.input.value = "";
                    $this.$setValue($this.tags)
                    $this.update();

                    return false;
                }
            });
        });

        this.$updateValue = function(value) {

            if (this.tags !== value && Array.isArray(value)) {
                this.tags = value;
                this.update();
            }

        }.bind(this);

        this.remove = function(e) {
            this.tags.splice(e.item.idx, 1);
            this.$setValue(this.tags);
        }.bind(this);

    
});

riot.tag('field-text', '<input name="input" class="uk-width-1-1" type="{ opts.type || \'text\' }">', function(opts) {

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        if (opts.required) {
            this.input.setAttribute('required', 'required');
        }

    
});

riot.tag('field-time', '<input name="input" class="uk-width-1-1" type="text">', function(opts) {

        if (opts.bind) {
            this.input.setAttribute('bind', opts.bind);
            this.root.removeAttribute('bind');
        }

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        if (opts.required) {
            this.input.setAttribute('required', 'required');
        }

        this.on('mount', function(){

            App.assets.require(['/assets/lib/uikit/js/components/timepicker.js'], function() {

                UIkit.timepicker(this.input, opts);

            }.bind(this));
        });

    
});

riot.tag('field-wysiwyg', '<textarea name="input" style="visibility:hidden;" class="uk-width-1-1" rows="5"></textarea>', function(opts) {

        var $this = this,
            lang  = document.documentElement.getAttribute('lang') || 'en';

        if (opts.cls) {
            App.$(this.input).addClass(opts.cls);
        }

        if (opts.rows) {
            this.input.setAttribute('rows', opts.rows);
        }

        this.value = null;

        this.$updateValue = function(value) {

            if (this.value != value) {
                this.value = value;
                this.update();
            }

        }.bind(this);


        this.on('mount', function(){

            var assets = [
                '/assets/lib/redactor/redactor.min.js',
                '/assets/lib/redactor/redactor.css',

                '/assets/lib/redactor/plugins/fullscreen/fullscreen.js',
                '/assets/lib/redactor/plugins/fontcolor/fontcolor.js',
                '/assets/lib/redactor/plugins/fontsize/fontsize.js',
                '/assets/lib/redactor/plugins/textdirection/textdirection.js',
                '/assets/lib/redactor/plugins/table/table.js',
                '/assets/lib/redactor/plugins/video/video.js'
            ];

            if (lang != 'en') {
                assets.push('/assets/lib/redactor/lang/'+lang+'.js');
            }


            App.assets.require(assets, function() {

                this.input.value = this.value;


                App.$($this.input).redactor({
                    lang: lang,
                    plugins: ['table','textdirection','fontcolor','fontsize','video','fullscreen'],
                    changeCallback: function() {
                        $this.$setValue(this.code.get());
                    }
                });

            }.bind(this)).catch(function(){


                this.input.value = this.value;

                App.$(this.input).css('visibility','').on('change', function() {
                    $this.$setValue(this.value);
                });

            }.bind(this));
        });

    
});

riot.tag('picoedit', '<div class="picoedit"> <div class="picoedit-toolbar uk-flex" if="{path}"> <div class="uk-flex-item-1 uk-text-truncate"> <strong class="uk-text-small"><i class="uk-icon-pencil uk-margin-small-right"></i> { path }</strong> </div> <div> <button type="button" class="uk-button uk-button-primary" onclick="{ save }"><i class="uk-icon-save"></i></button> </div> </div> <codemirror name="codemirror"></codemirror> </div>', '.picoedit-toolbar { padding: 15px; }', function(opts) {

        var root  = this.root,
            $this = this,
            editor;

        this.isReady = false;

        this.ready = new Promise(function(resolve){

            $this.tags.codemirror.on('ready', function(){
                editor = $this.codemirror.editor;

                editor.addKeyMap({
                    'Ctrl-S': function(){ $this.save(); },
                    'Cmd-S': function(){ $this.save(); }
                });

                $this.isReady = true;

                resolve();
            });
        });

        root.picoedit = this;

        this.path = null;

        this.open = function(path) {

            this.ready.then(function(){

                this.path = path;

                editor.setValue('');
                editor.clearHistory();

                requestapi({"cmd":"readfile", "path":path}, function(content){

                    editor.setOption("mode", CodeMirror.findModeByFileName(path).mode || 'text');
                    editor.setValue(content);
                    editor.focus();
                    editor.refresh();

                    this.update();

                }.bind(this), "text");

            }.bind(this));
        }.bind(this);

        this.save = function() {

            if (!this.path) return;

            requestapi({"cmd":"writefile", "path": this.path, "content":editor.getValue()}, function(status){

                App.ui.notify("File saved", "success");

            }, "text");
        }.bind(this);

        function requestapi(data, fn, type) {

            data = Object.assign({"cmd":""}, data);

            return App.request('/media/api', data, type).then(fn);
        }

    
});