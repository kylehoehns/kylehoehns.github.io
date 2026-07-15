/* ============================================================
   list.js — shared prompt for the /talks, /videos, /blog pages
   The cards on the page are the source of truth: each carries a
   data-slug + href, and (if external) target="_blank".
   ============================================================ */
(function () {
  'use strict';

  var term = document.querySelector('.term.list');
  if (!term) return;

  var cwd = term.getAttribute('data-cwd') || '~';
  var section = (term.getAttribute('data-section') || '').toLowerCase();
  var promptStr = 'kyle@kylehoehns:' + cwd + '$';

  var log = document.getElementById('tlog');
  var form = document.getElementById('tform');
  var input = document.getElementById('tcmd');
  var mirror = document.getElementById('tmirror');
  var cursor = document.getElementById('tcursor');
  var screen = document.querySelector('.screen');

  var cards = [].slice.call(document.querySelectorAll('.card[data-slug]')).map(function (a) {
    var h2 = a.querySelector('h2');
    return {
      slug: a.getAttribute('data-slug'),
      title: h2 ? h2.textContent : a.getAttribute('data-slug'),
      href: a.getAttribute('href'),
      ext: a.getAttribute('target') === '_blank'
    };
  });

  function print(html, cls) {
    var d = document.createElement('div');
    d.className = 'line' + (cls ? ' ' + cls : '');
    d.innerHTML = html;
    log.appendChild(d);
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function go(href, ext) { setTimeout(function () { ext ? window.open(href, '_blank', 'noopener') : (window.location.href = href); }, 260); }

  // exact match, else unique prefix match
  function resolve(arg) {
    if (!arg) return null;
    var exact = cards.filter(function (c) { return c.slug === arg; });
    if (exact.length) return exact[0];
    var pre = cards.filter(function (c) { return c.slug.indexOf(arg) === 0; });
    return pre.length === 1 ? pre[0] : null;
  }
  function openCard(c) {
    print('opening <span style="color:var(--fg-bright)">' + c.slug + '</span> &hellip;', 'accent');
    go(c.href, c.ext);
  }

  // the other rooms you can cd into from here
  var SECTIONS = { talks: '/talks/', videos: '/videos/', blog: '/blog/' };
  // strip ../  ~/  and leading / so "cd ../talks", "cd ~/blog", "cd /videos" all work
  function bareName(a) { return a.replace(/^(\.\.\/|~\/|\/)+/, '').replace(/\/+$/, ''); }

  function run(raw) {
    var line = raw.trim();
    print('<span class="lbl">' + promptStr + '</span> ' + esc(line));
    if (!line) return;
    var parts = line.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var arg = (parts[1] || '').toLowerCase().replace(/\/$/, '');

    if (cmd === 'cd') {
      if (arg === '' || arg === '~' || arg === '/' || arg === '..') { print('going home &hellip;', 'accent'); return go('/'); }
      var name = bareName(arg);
      if (name === '') { print('going home &hellip;', 'accent'); return go('/'); }        // "cd ../"
      if (SECTIONS[name]) { print('cd <span style="color:var(--fg-bright)">/' + name + '</span> &hellip;', 'accent'); return go(SECTIONS[name]); }
      var s = resolve(name);
      if (s) return openCard(s);
      return print('cd: no such directory: ' + esc(arg), 'err');
    }
    if (cmd === 'home' || cmd === 'back' || cmd === '..' || cmd === '~') { print('going home &hellip;', 'accent'); return go('/'); }
    if (cmd === 'ls' || cmd === section) {
      cards.forEach(function (c) { print('  <span class="lbl">' + c.slug + '</span>  ' + esc(c.title)); });
      return;
    }
    // bare section names jump between rooms: type "talks" while in /videos
    if (SECTIONS[cmd]) { print('cd <span style="color:var(--fg-bright)">/' + cmd + '</span> &hellip;', 'accent'); return go(SECTIONS[cmd]); }
    if (cmd === 'open' || cmd === 'run' || cmd === 'watch' || cmd === 'read') {
      var so = resolve(arg);
      if (so) return openCard(so);
      return print(cmd + ': not found: ' + esc(arg || '(none)') + '  —  try <span class="lbl">ls</span>', 'err');
    }
    var sc = resolve(cmd);
    if (sc) return openCard(sc);
    if (cmd === 'sessionize') { print('opening sessionize &hellip;', 'accent'); return go('https://sessionize.com/kyle-hoehns', true); }
    if (cmd === 'clear' || cmd === 'cls') { log.innerHTML = ''; return; }
    if (cmd === 'help' || cmd === 'man' || cmd === '?') {
      [['cd ~ / home', 'back to the homepage'],
       ['cd <room>', 'jump to talks · videos · blog'],
       ['ls', "list what's on this page"],
       ['open <name>', 'open it (or just type its name)'],
       ['clear', 'wipe this log']].forEach(function (r) {
        print('  <span class="lbl">' + (r[0] + '                ').slice(0, 16) + '</span>' + r[1]);
      });
      return;
    }
    print('command not found: ' + esc(cmd) + '  —  try <span class="lbl">help</span>', 'err');
  }

  /* ---------- tab completion ---------- */
  var SLUGS = cards.map(function (c) { return c.slug; });
  var CMDS = ['cd', 'ls', 'open', 'clear', 'help', 'home', 'back', 'sessionize']
    .concat(Object.keys(SECTIONS));
  function commonPrefix(arr) {
    if (!arr.length) return '';
    var p = arr[0];
    for (var i = 1; i < arr.length; i++) {
      while (arr[i].toLowerCase().indexOf(p.toLowerCase()) !== 0) { p = p.slice(0, -1); if (!p) return ''; }
    }
    return p;
  }
  function complete() {
    var parts = input.value.split(/\s+/);
    var i = parts.length - 1;
    var candidates;
    if (i === 0) candidates = CMDS.concat(SLUGS);
    else if (parts[0].toLowerCase() === 'cd') candidates = Object.keys(SECTIONS).concat(SLUGS);
    else if (parts[0].toLowerCase() === 'open' || parts[0].toLowerCase() === 'run') candidates = SLUGS;
    else return;
    var token = parts[i].toLowerCase();
    var matches = candidates.filter(function (c) { return c.indexOf(token) === 0; });
    if (!matches.length) return;
    if (matches.length === 1) {
      parts[i] = matches[0];
    } else {
      var common = commonPrefix(matches);
      if (common.length > parts[i].length) parts[i] = common;
      print('<span class="lbl">' + matches.join('&nbsp;&nbsp;&nbsp;') + '</span>', 'dim');
    }
    input.value = parts.join(' ');
    sync();
  }

  function sync() { mirror.textContent = input.value; }
  input.addEventListener('input', function () {
    cursor.classList.add('typing'); sync();
    clearTimeout(input._t); input._t = setTimeout(function () { cursor.classList.remove('typing'); }, 400);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || input.value.trim() === '') return; // empty prompt Tabs away normally
    e.preventDefault();
    complete();
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; sync(); run(v); });
  screen.addEventListener('mousedown', function (e) {
    if (e.target.closest('a, button, input')) return;
    if (window.getSelection().toString()) return;
    input.focus();
  });

  sync();
  // put the cursor in the prompt on arrival so you can keep typing after
  // navigating here — but not on touch, so mobile doesn't pop a keyboard
  var isTouch = window.matchMedia &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (!isTouch) input.focus();
})();
