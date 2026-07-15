/* ============================================================
   kylehoehns.com — terminal
   A tiny, dependency-free fake shell. Type or tap commands.
   ============================================================ */
(function () {
  'use strict';

  var output   = document.getElementById('output');
  var form     = document.getElementById('promptForm');
  var input    = document.getElementById('cmd');
  var mirror   = document.getElementById('mirror');
  var cursor   = document.getElementById('cursor');
  var term     = document.getElementById('term');
  var crt      = document.querySelector('.crt');
  var keys     = document.querySelector('.keys');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- data ---------- */
  var LINKS = {
    github:      'https://github.com/kylehoehns',
    linkedin:    'https://www.linkedin.com/in/kylehoehns/',
    sessionize:  'https://sessionize.com/kyle-hoehns',
    cijug:       'https://www.cijug.net',
    sourceallies:'https://www.sourceallies.com',
    x:           'https://twitter.com/kylehoehns',
    strava:      'https://www.strava.com/athletes/14172547',
    email:       'mailto:kyhoehns@gmail.com'
  };

  var TALKS = [
    {
      slug: 'sidebar-to-subagents',
      title: 'From Sidebar to Sub-Agents',
      sub:   'A live, hands-on intro to building with AI agents · CIJUG 2026'
    }
  ];

  /* ---------- output helpers ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function print(html, cls) {
    output.appendChild(el('div', 'line' + (cls ? ' ' + cls : ''), html));
    scroll();
  }

  function printBlank() { output.appendChild(el('div', 'line', '&nbsp;')); }

  function scroll() { term.scrollTop = term.scrollHeight; }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function extLink(url, text) {
    return '<a href="' + url + '" target="_blank" rel="noopener">' + (text || url) + '</a>';
  }

  /* ---------- commands ---------- */
  var COMMANDS = {
    help: function () {
      print('available commands:', 'dim');
      var rows = [
        ['about / whoami', 'who is this guy'],
        ['cd <dir>',       'navigate: talks · videos · blog · about'],
        ['talks',          'slides from my conference talks'],
        ['videos',         'recorded talks & technical videos'],
        ['blog',           'posts on the Source Allies blog'],
        ['links',          'everywhere you can find me'],
        ['github',         'code + side projects'],
        ['cijug',          'Central Iowa Java Users Group'],
        ['sessionize',     'full speaking history'],
        ['theme',          'cycle phosphor (green/amber/cyan/paper/synthwave)'],
        ['clear',          'wipe the screen'],
        ['help',           'you are here']
      ];
      rows.forEach(function (r) {
        print('  <span class="lbl">' + pad(r[0], 16) + '</span>' + r[1]);
      });
      print('&nbsp;');
      print('tip: type a command and hit enter, or tap one below.', 'dim');
    },

    about: function () {
      print(ASCII_KYLE, 'figure');
      printBlank();
      // kept short so it fits a phone screen; text reflows at any width
      print('<span class="bright">Kyle Hoehns</span> &mdash; Staff Software Engineer, speaker, community leader. ' +
            'Central Iowa. Mostly <span class="bright">Java</span> &amp; <span class="bright">Go</span>.');
      printBlank();
      print('I work at ' + extLink(LINKS.sourceallies, 'Source Allies') +
            ', building systems that handle millions of requests without waking anyone at 3am. ' +
            'I run the ' + extLink(LINKS.cijug, 'Central Iowa Java Users Group') +
            ' and speak at conferences &mdash; taking the work seriously, never myself.');
    },

    talks: function () {
      print('opening <span class="bright">/talks</span> &hellip;', 'accent');
      go('/talks/');
    },

    videos: function () {
      print('opening <span class="bright">/videos</span> &hellip;', 'accent');
      go('/videos/');
    },

    blog: function () {
      print('opening <span class="bright">/blog</span> &hellip;', 'accent');
      go('/blog/');
    },

    links: function () {
      print('find me here:', 'dim');
      var row = function (label, link) {
        print('  <span class="lbl">' + (label + '           ').slice(0, 11) + '</span>' + link);
      };
      row('github',     extLink(LINKS.github));
      row('linkedin',   extLink(LINKS.linkedin));
      row('x',          extLink(LINKS.x, 'twitter.com/kylehoehns'));
      row('strava',     extLink(LINKS.strava, 'strava.com/athletes/14172547'));
      row('email',      '<a href="' + LINKS.email + '">kyhoehns@gmail.com</a>');
      row('talks',      extLink('/talks/', 'kylehoehns.com/talks'));
      row('videos',     extLink('/videos/', 'kylehoehns.com/videos'));
      row('blog',       extLink('/blog/', 'kylehoehns.com/blog'));
      row('cijug',      extLink(LINKS.cijug));
      row('sessionize', extLink(LINKS.sessionize));
    },

    cd: function (arg) {
      var a = (arg || '').toLowerCase().replace(/^(\.\.\/|~\/|\/)+/, '').replace(/\/+$/, '');
      if (a === '' || a === '~' || a === '.') { print("you're already home &mdash; <span class=\"lbl\">~</span>", 'dim'); return; }
      var pages = { talks: '/talks/', videos: '/videos/', blog: '/blog/' };
      if (pages[a]) { print('cd <span class="bright">/' + a + '</span> &hellip;', 'accent'); return go(pages[a]); }
      // cd into the other "directories" ls lists — just runs that command
      var dirs = ['about', 'links', 'github', 'linkedin', 'cijug', 'sessionize'];
      if (dirs.indexOf(a) !== -1 && COMMANDS[a]) { return COMMANDS[a](); }
      print('cd: no such directory: ' + esc(a), 'err');
    },

    theme: function (arg) {
      var THEMES = ['green', 'amber', 'cyan', 'paper', 'synthwave'];
      var a = (arg || '').trim().toLowerCase();
      var cur = document.documentElement.getAttribute('data-phosphor') || 'green';
      if (a === 'list' || a === '?') {
        print('themes: ' + THEMES.map(function (t) {
          return t === cur ? '<span class="bright">' + t + '</span>' : t;
        }).join('   '), 'dim');
        return;
      }
      var next = THEMES.indexOf(a) !== -1
        ? a
        : THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length]; // bare `theme` cycles
      document.documentElement.setAttribute('data-phosphor', next);
      try { localStorage.setItem('phosphor', next); } catch (e) {}
      print('phosphor set to <span class="bright">' + next + '</span>. <span class="lbl">(theme list)</span>', 'accent');
    },

    clear: function () { output.innerHTML = ''; },

    /* easter eggs — take the work seriously, never yourself */
    sudo: function () {
      print("nice try. you're not on the sudoers list. this incident will be reported.", 'err');
    },
    coffee: function () {
      print('brewing&hellip; &#9749;  (this is a Java shop, after all)', 'accent');
    },
    java: function () {
      print('AbstractSingletonProxyFactoryBeanFactoryBean instantiated successfully.', 'dim');
      print('...just kidding. no enterprise beans were harmed.', 'dim');
    },
    ls: function () {
      print('about/   talks/   videos/   blog/   links/   github/   linkedin/   cijug/', 'bright');
    },
    exit: function () {
      print("there's no escape. (also, thanks for stopping by.)", 'dim');
    }
  };

  /* aliases */
  COMMANDS.whoami = COMMANDS.about;
  COMMANDS.who    = COMMANDS.about;
  COMMANDS.cls    = COMMANDS.clear;
  COMMANDS.man    = COMMANDS.help;
  COMMANDS['?']   = COMMANDS.help;
  COMMANDS.writing = COMMANDS.blog;
  ['github', 'linkedin', 'sessionize', 'cijug', 'sourceallies', 'x', 'strava'].forEach(function (k) {
    COMMANDS[k] = function () {
      print('opening <span class="bright">' + k + '</span> &hellip;', 'accent');
      go(LINKS[k], true);
    };
  });
  COMMANDS.twitter = COMMANDS.x;
  COMMANDS.email = function () {
    print('opening your mail client &hellip; <span class="lbl">kyhoehns@gmail.com</span>', 'accent');
    go(LINKS.email, false); // mailto: — hands off to the mail client, no navigation
  };

  var ASCII_KYLE = [
    '██╗  ██╗██╗   ██╗██╗     ███████╗',
    '██║ ██╔╝╚██╗ ██╔╝██║     ██╔════╝',
    '█████╔╝  ╚████╔╝ ██║     █████╗  ',
    '██╔═██╗   ╚██╔╝  ██║     ██╔══╝  ',
    '██║  ██╗   ██║   ███████╗███████╗',
    '╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝'
  ].join('\n');

  function pad(s, n) { while (s.length < n) s += ' '; return s; }

  function go(url, external) {
    setTimeout(function () {
      if (external) window.open(url, '_blank', 'noopener');
      else window.location.href = url;
    }, reduceMotion ? 0 : 420);
  }

  /* ---------- command runner ---------- */
  var history = [];
  var histIdx = -1;

  function run(raw) {
    var line = raw.trim();
    // echo the command
    output.appendChild(el('div', 'line cmd',
      '<span class="prompt-echo">kyle@kylehoehns:~$</span> ' +
      '<span class="cmd-text">' + esc(line || '') + '</span>'));

    if (line) { history.push(line); histIdx = history.length; }

    var parts = line.split(/\s+/);
    var name = (parts[0] || '').toLowerCase();
    var arg = parts.slice(1).join(' ');

    if (!name) { scroll(); return; }

    if (COMMANDS[name]) {
      COMMANDS[name](arg);
    } else {
      print('command not found: <span class="bright">' + esc(name) + '</span>', 'err');
      print("type <span class=\"lbl\">help</span> for the list of what actually works.", 'dim');
    }
    scroll();
  }

  /* ---------- input mirror + cursor ---------- */
  function syncMirror() {
    mirror.textContent = input.value;
    scroll();
  }
  input.addEventListener('input', function () {
    cursor.classList.add('typing');
    syncMirror();
    clearTimeout(input._t);
    input._t = setTimeout(function () { cursor.classList.remove('typing'); }, 400);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    syncMirror();
    run(v);
  });

  /* command history via up/down arrows */
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
      if (histIdx > 0) { histIdx--; input.value = history[histIdx]; syncMirror(); e.preventDefault(); }
    } else if (e.key === 'ArrowDown') {
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; syncMirror(); }
      else { histIdx = history.length; input.value = ''; syncMirror(); }
      e.preventDefault();
    } else if (e.key === 'l' && e.ctrlKey) {
      COMMANDS.clear(); e.preventDefault();
    }
  });

  /* quick-key buttons — tap just runs the command. only refocus the input on
     devices with a real keyboard, so mobile doesn't pop a keyboard and jump. */
  keys.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-cmd]');
    if (!btn) return;
    run(btn.getAttribute('data-cmd'));
    if (!isTouch) input.focus();
  });

  /* keep focus in the input — tapping the screen refocuses (kept synchronous
     so mobile keyboards still open), but don't steal focus from links/keys */
  var isTouch = window.matchMedia &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  document.querySelector('.screen').addEventListener('mousedown', function (e) {
    if (e.target.closest('a, button, input')) return;
    if (window.getSelection().toString()) return; // allow text selection
    input.focus();
  });

  /* ---------- initial render ---------- */
  // no boot theatrics — just show who I am and drop to a prompt
  run('about');
  printBlank();
  print('type <span class="lbl">help</span>, <span class="lbl">talks</span>, <span class="lbl">videos</span>, <span class="lbl">blog</span> — or tap below.', 'dim');
  syncMirror();
  // start at the top so the KYLE banner + intro are visible; the prompt is
  // pinned (sticky) so it stays reachable without scrolling the intro away
  term.scrollTop = 0;
  // auto-focus only on devices with a real keyboard, so mobile doesn't pop one on load
  if (!isTouch) input.focus();
})();
