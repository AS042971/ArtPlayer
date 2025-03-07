(function () {
    var userAgent = window.navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    var isIE = /MSIE|Trident/.test(userAgent);

    if (isMobile || isIE) {
        window.location.href = './mobile.html';
        return;
    }

    var $codeMirror = document.querySelector('.codeMirrorWrap');
    var $lib = document.querySelector('.libsInput');
    var $run = document.querySelector('.run');
    var $popups = document.querySelector('.popups');
    var $console = document.querySelector('.console');
    var loaddLib = [];

    window.consoleLog($console);

    var editor = null;
    require.config({ paths: { vs: './assets/js/vs' } });
    require(['vs/editor/editor.main'], function () {
        var libUri = './assets/ts/artplayer.d.ts';
        fetch(libUri)
            .then((res) => res.text())
            .then((libSource) => {
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: true,
                    noSyntaxValidation: false,
                });

                monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ES6,
                    allowNonTsExtensions: true,
                });

                monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
                monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

                var disposable = monaco.editor.onDidCreateEditor(function () {
                    disposable.dispose();
                    setTimeout(initApp, 1000);
                });

                editor = monaco.editor.create($codeMirror, {
                    theme: 'vs-dark',
                    automaticLayout: true,
                    model: monaco.editor.createModel(
                        [
                            'var art = new Artplayer({',
                            "\tcontainer: '.artplayer-app',",
                            "\turl: 'https://artplayer.org/assets/sample/video.mp4',",
                            '});',
                        ].join('\n'),
                        'javascript',
                    ),
                });
            });
    });

    function initArt(art) {
        Artplayer.config.events.forEach(function (item) {
            art &&
                art.on('video:' + item, function (event) {
                    console.log('video: ' + event.type);
                });
        });
    }

    function getURLParameters(url) {
        return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function (a, v) {
            return (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a;
        }, {});
    }

    function getExt(url) {
        if (url.includes('?')) {
            return getExt(url.split('?')[0]);
        }

        if (url.includes('#')) {
            return getExt(url.split('#')[0]);
        }

        return url.trim().toLowerCase().split('.').pop();
    }

    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            var define2 = window.define;
            window.define = undefined;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = function () {
                window.define = define2;
                resolve(url);
            };
            script.onerror = function () {
                reject(new Error('Loading script failed:' + url));
            };
            document.querySelector('head').appendChild(script);
        });
    }

    function loadStyle(url) {
        return new Promise(function (resolve, reject) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = function () {
                resolve(url);
            };
            link.onerror = function () {
                reject(new Error('Loading style failed:' + url));
            };
            document.querySelector('head').appendChild(link);
        });
    }

    function loadLib(libs) {
        var libPromise = [];
        var libsDecode = decodeURIComponent(libs || '');
        libsDecode
            .split(/\r?\n/)
            .filter(function (url) {
                return !loaddLib.includes(url);
            })
            .forEach(function (url) {
                var ext = getExt(url);
                if (ext === 'js') {
                    libPromise.push(loadScript(url));
                } else if (ext === 'css') {
                    libPromise.push(loadStyle(url));
                }
            });
        $lib.value = libsDecode;
        return Promise.all(libPromise);
    }

    function runExample(name) {
        fetch('./assets/example/' + name + '.js')
            .then(function (response) {
                return response.text();
            })
            .then(function (text) {
                editor.setValue(text);
                runCode();
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    function loadCode(code, example) {
        if (example) {
            runExample(example);
        } else if (code) {
            editor.setValue(decodeURIComponent(code).trim());
            runCode();
        } else {
            runExample('index');
        }
    }

    function formatDate(date) {
        var date = new Date(Number(date));
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return YY + MM + DD + ' ' + hh + mm + ss;
    }

    function runCode() {
        Artplayer.instances.forEach(function (art) {
            art.destroy(true);
        });
        var code = editor.getValue();
        eval(code);
        initArt(Artplayer.instances[0]);
        console.debug('Artplayer@' + Artplayer.version);
        console.debug('Env@' + Artplayer.env);
        console.debug('Build@' + formatDate(Artplayer.build));
    }

    function initApp() {
        var _getURLParameters = getURLParameters(window.location.href),
            code = _getURLParameters.code,
            libs = _getURLParameters.libs;
        example = _getURLParameters.example;

        loadLib(libs)
            .then(function (result) {
                loaddLib = loaddLib.concat(result);
                loadCode(code, example);
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    function restart() {
        var libs = encodeURIComponent($lib.value);
        var code = encodeURIComponent(editor.getValue());
        var url = window.location.origin + window.location.pathname + '?libs=' + libs + '&code=' + code;
        history.pushState(null, null, url);
        initApp();
    }

    $run.addEventListener('click', function () {
        restart();
    });

    $popups.addEventListener('click', function (event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });

    window.addEventListener('error', function (err) {
        console.error(err);
    });

    window.addEventListener('unhandledrejection', function (err) {
        console.error(err);
    });

    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            restart();
        }
    });
})();
