/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var showPanel = undefined;

/**
 * Debug note: to test this app in a desktop browser, you'll have to set
 * the `dom.mozSettings.enabled' preference to false in order to avoid an
 * `uncaught exception: 2147500033' message (= 0x80004001).
 */

var Settings = {
  get mozSettings() {
    // return navigator.mozSettings when properly supported, null otherwise
    // (e.g. when debugging on a browser...)
    var settings = window.navigator.mozSettings;
    return (settings && typeof(settings.createLock) == 'function') ?
        settings : null;
  },

  // Early initialization of parts of the application that don't
  // depend on the DOM being loaded.
  preInit: function settings_preInit() {
    // nothing to do here
  },

  _initialized: false,

  init: function settings_init() {
    this._initialized = true;

    if (!this.mozSettings || !navigator.mozSetMessageHandler) {
      return;
    }

    // register web activity handler
    navigator.mozSetMessageHandler('activity', this.webActivityHandler);

    // preset all inputs that have a `name' attribute
    this.presetPanel();
  },

  loadPanel: function settings_loadPanel(panel) {
    if (!panel)
      return;

    // apply the HTML markup stored in the first comment node
    for (var i = 0; i < panel.childNodes.length; i++) {
      if (panel.childNodes[i].nodeType == document.COMMENT_NODE) {
        panel.innerHTML = panel.childNodes[i].nodeValue;
        break;
      }
    }

    // translate content
    navigator.mozL10n.translate(panel);

    // activate all scripts
    var scripts = panel.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src');
      if (document.head.querySelector('script[src="' + src + '"]')) {
        continue;
      }
/*
      var script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = src;
      document.head.appendChild(script);
*/
    }

    // activate all stylesheets
    var stylesheets = panel.querySelectorAll('link');
    for (var i = 0; i < stylesheets.length; i++) {
      var href = stylesheets[i].getAttribute('href');
      if (document.head.querySelector('link[href="' + href + '"]'))
        continue;

      var stylesheet = document.createElement('link');
      stylesheet.type = 'text/css';
      stylesheet.rel = 'stylesheet';
      stylesheet.href = href;
      document.head.appendChild(stylesheet);
    }

    // activate all links
    var self = this;
    var rule = 'a[href^="http"], a[href^="tel"], [data-href]';
    var links = panel.querySelectorAll(rule);
    for (i = 0; i < links.length; i++) {
      var link = links[i];
      if (!link.dataset.href) {
        link.dataset.href = link.href;
        link.href = '#';
      }
      if (!link.dataset.href.startsWith('#')) { // external link
        link.onclick = function() {
          openLink(this.dataset.href);
          return false;
        };
      } else if (!link.dataset.href.endsWith('Settings')) { // generic dialog
        link.onclick = function() {
          openDialog(this.dataset.href.substr(1));
          return false;
        };
      } else { // Settings-specific dialog box
        link.onclick = function() {
          self.openDialog(this.dataset.href.substr(1));
          return false;
        };
      }
    }
  },

  // Cache of all current settings values.  There's some large stuff
  // in here, but not much useful can be done with the settings app
  // without these, so we keep this around most of the time.
  _settingsCache: null,

  get settingsCache() {
    return this._settingsCache;
  },

  // True when a request has already been made to fill the settings
  // cache.  When this is true, no further get("*") requests should be
  // made; instead, pending callbacks should be added to
  // _pendingSettingsCallbacks.
  _settingsCacheRequestSent: false,

  // There can be race conditions in which we need settings values,
  // but haven't filled the cache yet.  This array tracks those
  // listeners.
  _pendingSettingsCallbacks: [],

  // Invoke |callback| with a request object for a successful fetch of
  // settings values, when those values are ready.
  getSettings: function(callback) {
    var settings = this.mozSettings;
    if (!settings)
      return;

    if (this._settingsCache && callback) {
      // Fast-path that we hope to always hit: our settings cache is
      // already available, so invoke the callback now.
      callback(this._settingsCache);
      return;
    }

    if (!this._settingsCacheRequestSent && !this._settingsCache) {
      this._settingsCacheRequestSent = true;
      var lock = settings.createLock();
      var request = lock.get('*');
      request.onsuccess = function(e) {
        var result = request.result;
        var cachedResult = {};
        for (var attr in result) {
          cachedResult[attr] = result[attr];
        }
        Settings._settingsCache = cachedResult;
        var cbk;
        while ((cbk = Settings._pendingSettingsCallbacks.pop())) {
          cbk(result);
        }
      };
    }
    if (callback) {
      this._pendingSettingsCallbacks.push(callback);
    }
  },

  presetPanel: function settings_presetPanel(panel) {
    this.getSettings(function(result) {
      panel = panel || document;

      // preset all checkboxes
      var rule = 'input[type="checkbox"]:not([data-ignore])';
      var checkboxes = panel.querySelectorAll(rule);
      for (var i = 0; i < checkboxes.length; i++) {
        var key = checkboxes[i].name;
        if (key && result[key] != undefined) {
          checkboxes[i].checked = !!result[key];
        }
      }

      // remove initial class so the swich animation will apply
      // on these toggles if user interact with it.
      setTimeout(function() {
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].classList.contains('initial')) {
            checkboxes[i].classList.remove('initial');
          }
        }
      }, 0);

      // preset all radio buttons
      rule = 'input[type="radio"]:not([data-ignore])';
      var radios = panel.querySelectorAll(rule);
      for (i = 0; i < radios.length; i++) {
        var key = radios[i].name;
        if (key && result[key] != undefined) {
          radios[i].checked = (result[key] === radios[i].value);
        }
      }

      // preset all text inputs
      rule = 'input[type="text"]:not([data-ignore])';
      var texts = panel.querySelectorAll(rule);
      for (i = 0; i < texts.length; i++) {
        var key = texts[i].name;
        if (key && result[key] != undefined) {
          texts[i].value = result[key];
        }
      }

      // preset all range inputs
      rule = 'input[type="range"]:not([data-ignore])';
      var ranges = panel.querySelectorAll(rule);
      for (i = 0; i < ranges.length; i++) {
        var key = ranges[i].name;
        if (key && result[key] != undefined) {
          ranges[i].value = parseFloat(result[key]);
          if (ranges[i].refresh) {
            ranges[i].refresh(); // XXX to be removed when bug344618 lands
          }
        }
      }

      // use a <button> instead of the <select> element
      var fakeSelector = function(select) {
        var parent = select.parentElement;
        var button = select.previousElementSibling;
        // link the button with the select element
        var index = select.selectedIndex;
        if (index >= 0) {
          var selection = select.options[index];
          button.textContent = selection.textContent;
          button.dataset.l10nId = selection.dataset.l10nId;
        }
        if (parent.classList.contains('fake-select')) {
          select.addEventListener('change', function() {
            var newSelection = this.options[this.selectedIndex];
            button.textContent = newSelection.textContent;
            button.dataset.l10nId = newSelection.dataset.l10nId;
          });
        }
      };

      // preset all select
      var selects = panel.querySelectorAll('select');
      for (var i = 0, count = selects.length; i < count; i++) {
        var select = selects[i];
        var key = select.name;
        if (key && result[key] != undefined) {
          var value = result[key];
          var option = 'option[value="' + value + '"]';
          var selectOption = select.querySelector(option);
          if (selectOption) {
            selectOption.selected = true;
          }
        }
        fakeSelector(select);
      }

      // preset all span with data-name fields
      rule = '[data-name]:not([data-ignore])';
      var spanFields = panel.querySelectorAll(rule);
      for (i = 0; i < spanFields.length; i++) {
        var key = spanFields[i].dataset.name;

        if (key && result[key] != undefined) {
          // check whether this setting comes from a select option
          // (it may be in a different panel, so query the whole document)
          rule = '[data-setting="' + key + '"] ' +
            '[value="' + result[key] + '"]';
          var option = document.querySelector(rule);
          if (option) {
            spanFields[i].dataset.l10nId = option.dataset.l10nId;
            spanFields[i].textContent = option.textContent;
          } else {
            spanFields[i].textContent = result[key];
          }
        }
      }
    });
  },

  webActivityHandler: function settings_handleActivity(activityRequest) {
    var name = activityRequest.source.name;
    switch (name) {
      case 'configure':
        var section = activityRequest.source.data.section || 'root';

        // Validate if the section exists
        var sectionElement = document.getElementById(section);
        if (!sectionElement || sectionElement.tagName !== 'SECTION') {
          var msg = 'Trying to open an unexistent section: ' + section;
          console.warn(msg);
          activityRequest.postError(msg);
          return;
        }

        // Go to that section
        setTimeout(function settings_goToSection() {
          document.location.hash = section;
        }, 1000);
        break;
    }
  },

  handleEvent: function settings_handleEvent(event) {
    var input = event.target;
    var type = input.dataset.type || input.type; // bug344618
    var key = input.name;

    var settings = window.navigator.mozSettings;
    if (!key || !settings || event.type != 'change')
      return;

    // Not touching <input> with data-setting attribute here
    // because they would have to be committed with a explicit "submit"
    // of their own dialog.
    if (input.dataset.setting)
      return;

    var value;
    switch (type) {
      case 'checkbox':
      case 'switch':
        value = input.checked; // boolean
        break;
      case 'range':
        value = parseFloat(input.value).toFixed(1); // float
        break;
      case 'select-one':
      case 'radio':
      case 'text':
      case 'password':
        value = input.value; // default as text
        if (input.dataset.valueType === 'integer') // integer
          value = parseInt(value);
        break;
    }

    var cset = {}; cset[key] = value;
    settings.createLock().set(cset);
  },

  openDialog: function settings_openDialog(dialogID) {
    var settings = this.mozSettings;
    var dialog = document.getElementById(dialogID);
    var fields =
        dialog.querySelectorAll('[data-setting]:not([data-ignore])');

    /**
     * In Settings dialog boxes, we don't want the input fields to be preset
     * by Settings.init() and we don't want them to set the related settings
     * without any user validation.
     *
     * So instead of assigning a `name' attribute to these inputs, a
     * `data-setting' attribute is used and the input values are set
     * explicitely when the dialog is shown.  If the dialog is validated
     * (submit), their values are stored into B2G settings.
     *
     * XXX warning:
     * this only supports text/password/radio/select/radio input types.
     */

    // initialize all setting fields in the dialog box
    // XXX for fields being added by lazily loaded script,
    // it would have to initialize the fields again themselves.
    function reset() {
      if (settings) {
        var lock = settings.createLock();
        for (var i = 0; i < fields.length; i++) {
          (function(input) {
            var key = input.dataset.setting;
            var request = lock.get(key);
            request.onsuccess = function() {
              switch (input.type) {
                case 'radio':
                  input.checked = (input.value == request.result[key]);
                  break;
                case 'checkbox':
                  input.checked = request.result[key] || false;
                  break;
                default:
                  input.value = request.result[key] || '';
                  break;
              }
            };
          })(fields[i]);
        }
      }
    }

    // validate all settings in the dialog box
    function submit() {
      if (settings) {
        // Update the fields node list to include dynamically added fields
        fields = dialog.querySelectorAll('[data-setting]:not([data-ignore])');

        // mozSettings does not support multiple keys in the cset object
        // with one set() call,
        // see https://bugzilla.mozilla.org/show_bug.cgi?id=779381
        var lock = settings.createLock();
        for (var i = 0; i < fields.length; i++) {
          var input = fields[i];
          var cset = {};
          var key = input.dataset.setting;
          switch (input.type) {
            case 'radio':
              if (input.checked)
                cset[key] = input.value;
              break;
            case 'checkbox':
                cset[key] = input.checked;
              break;
            default:
              cset[key] = input.value;
              break;
          }
          lock.set(cset);
        }
      }
    }

    reset(); // preset all fields before opening the dialog
    openDialog(dialogID, submit);
  },

  getSupportedLanguages: function settings_getLanguages(callback) {
    var LANGUAGES = 'shared/resources/languages.json';

    if (this._languages) {
      callback(this._languages);
    } else {
      var self = this;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function loadSupportedLocales() {
        if (xhr.readyState === 4) {
          if (xhr.status === 0 || xhr.status === 200) {
            self._languages = xhr.response;
            callback(self._languages);
          } else {
            console.error('Failed to fetch languages.json: ', xhr.statusText);
          }
        }
      };
      xhr.open('GET', LANGUAGES, true); // async
      xhr.responseType = 'json';
      xhr.send();
    }
  },

  updateLanguagePanel: function settings_updateLanguagePanel() {
    var panel = document.getElementById('languages');
    if (panel) { // update the date and time samples in the 'languages' panel
      var d = new Date();
      var f = new navigator.mozL10n.DateTimeFormat();
      var _ = navigator.mozL10n.get;
      panel.querySelector('#region-date').textContent =
          f.localeFormat(d, _('longDateFormat'));
      panel.querySelector('#region-time').textContent =
          f.localeFormat(d, _('shortTimeFormat'));
    }
  }
};

function selectInput() {
  E_('pass').focus ();
}

// apply user changes to 'Settings' + panel navigation
window.addEventListener('load', function loadSettings() {
  window.removeEventListener('load', loadSettings);
  window.addEventListener('change', Settings);

  Settings.init();

  // panel lazy-loading
  function lazyLoad(panel) {
    if (panel.children.length) // already initialized
      return;

    // load the panel and its sub-panels (dependencies)
    // (load the main panel last because it contains the scripts)
    var selector = 'section[id^="' + panel.id + '-"]';
    var subPanels = document.querySelectorAll(selector);
    for (var i = 0; i < subPanels.length; i++) {
      Settings.loadPanel(subPanels[i]);
    }
    Settings.loadPanel(panel);

    // panel-specific initialization tasks

    // preset all inputs in the panel and subpanels.
    //alert ("presetn all panel");
    for (var i = 0; i < subPanels.length; i++) {
      Settings.presetPanel(subPanels[i]);
    }
    Settings.presetPanel(panel);
  }

  var oldHash = window.location.hash || '#r_root';
  showPanel = function(e) {
try {
var elem = document.activeElement;
if (elem) elem.blur();
} catch(x) {
};
    var hash = (typeof (e)=='string')? e: window.location.hash;
    switch (hash) {
    case '#save': setCookie (); return;
    case '#r_generate': selectInput (); break;
    case '#r_random': generateRandomHash (); break;
    case '': hash = '#r_root'; break;
    }
    var oldPanel = document.querySelector(oldHash);
    var newPanel = document.querySelector(hash);

    if (!oldPanel) oldPanel = {}
    oldPanel.className = newPanel.className ? 'peek' : 'peek previous forward';
    newPanel.className = newPanel.className ?
                           'current peek' : 'peek current forward';
    oldHash = hash;

    clearPass ();
    oldPanel.classList.remove('peek');
    oldPanel.classList.remove('forward');
    newPanel.classList.remove('peek');
    newPanel.classList.remove('forward');
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', showPanel);
  document.getElementById('menuItem-deviceStorage').onclick = function() {
    showPanel ('#r_generate');
    return false;
  };
  document.getElementById('menuItem-showRandom').onclick = function() {
    showPanel ('#r_random');
    return false;
  };
  document.getElementById('menuItem-gps').onclick = function() {
    showPanel ('#r_settings');
    return false;
  };
function eachClass(x,y) {
  var a = document.getElementsByClassName(x);
  for (var i=0;i<a.length;i++) {
    y(a[i]);
  }
}
  eachClass('icon-back', function(e) {
	  e.onclick = function() {
		  showPanel ('#r_root');
		  return false;
	  }
  });
});

// startup & language switching
window.addEventListener('localized', function showLanguages() {
  // set the 'lang' and 'dir' attributes to <html> when the page is translated
  document.documentElement.lang = navigator.mozL10n.language.code;
  document.documentElement.dir = navigator.mozL10n.language.direction;

  // display the current locale in the main panel
/*
Settings.getSupportedLanguages(function displayLang(languages) {
    document.getElementById('language-desc').textContent =
        languages[navigator.mozL10n.language.code];
  });
  */
  Settings.updateLanguagePanel();
});

// Do initialization work that doesn't depend on the DOM, as early as
// possible in startup.
Settings.preInit();

var handleGestures = function() {
    var self = this,
    coords = {
        startX: null,
        startY: null,
        endX: null,
        endY: null
    };

    self.ontouchstart = function(e) {
        coords.startX = e.changedTouches[0].clientX;
        coords.startY = e.changedTouches[0].clientY;
        coords.endX = coords.startX;
        coords.endY = coords.startY;
    }

    self.ontouchmove = function(e) {
        var newX = e.changedTouches[0].clientX;
        var newY = e.changedTouches[0].clientY;
        var absX = Math.abs(coords.endX - newX),
            absY = Math.abs(coords.endY - newY);

        // If we've moved more Y than X, we're scrolling vertically
        if (absX < absY)
            return;

        // Prevents the page from scrolling left/right
        e.preventDefault();

        coords.endX = newX;
        coords.endY = newY;
    }

    self.ontouchend = function(e) {
        var swipe = {},
            deltaX = coords.startX - coords.endX,
            deltaY = coords.startY - coords.endY,
            absX = Math.abs(deltaX),
            absY = Math.abs(deltaY);

        swipe.distance = (absX > absY) ? absX : absY;
        swipe.direction = (absX < absY) ?
            (deltaY < 0 ? 'down' : 'up') :
            (deltaX < 0 ? 'right' : 'left');
        if (swipe.distance > 50) {
//alert("jeje: "+swipe.distance + " : "+swipe.direction);
            if (swipe.direction === 'left') {
		    //document.location.hash = '#r_root'
//alert (swipe.direction);
            } else if (swipe.direction === 'right') {
		    showPanel ('#r_root');
//		    document.location.hash = '#r_root'
	    }
        }
      return true;
    }
  window.addEventListener('ontouchstart', self.ontouchstart);
  window.addEventListener('ontouchmove', self.ontouchmove);
  window.addEventListener('ontouchend', self.ontouchend);
};
