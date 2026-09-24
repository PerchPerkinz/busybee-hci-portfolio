(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const wall = $("#wall"), stage = $("#stage"), drawer = $("#drawer");
  const zval = $("#zval");

  /* ---------- build the wall ---------- */
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const pdot = (p) => '<i style="background:' + PARTICIPANTS[p].color + '"></i>';

  let noteCount = 0, groupCount = 0;
  const noteEls = [];

  THEMES.forEach((theme, ti) => {
    const block = el("div", "theme");
    const tn = theme.groups.reduce((a, g) => a + g.notes.length, 0);
    groupCount += theme.groups.length;

    const lab = el("div", "tlabel");
    lab.appendChild(el("span", "tnum", theme.id));
    lab.appendChild(el("div", null,
      "<h2>" + theme.label + "</h2>" +
      '<span class="tmeta">' + theme.groups.length + " groups &middot; " + tn + " notes</span>"));
    block.appendChild(lab);

    const groups = el("div", "groups");
    theme.groups.forEach((g) => {
      const gEl = el("div", "group");
      gEl.appendChild(el("div", "glabel",
        "<p>&ldquo;" + g.label + "&rdquo;" +
        '<span class="gmeta">' + g.notes.length + " note" + (g.notes.length === 1 ? "" : "s") + "</span></p>"));
      const list = el("div", "notes");
      g.notes.forEach((note, i) => {
        noteCount++;
        const b = el("button", "note");
        b.type = "button";
        b.dataset.p = note.p;
        b.dataset.src = note.src;
        b.style.transform = "rotate(" + (((ti * 7 + i * 13) % 5) - 2) * 0.22 + "deg)";
        b.innerHTML =
          '<p class="ntext">' + note.t + "</p>" +
          '<span class="nfoot"><span class="pid">' + pdot(note.p) + PARTICIPANTS[note.p].id + "</span>" +
          '<span class="qid">Q' + note.q + (note.src === "r" ? " &middot; recorded" : "") + "</span></span>";
        b.addEventListener("click", () => openNote(note, theme, g, b));
        b._note = note;
        noteEls.push(b);
        list.appendChild(b);
      });
      gEl.appendChild(list);
      groups.appendChild(gEl);
    });
    block.appendChild(groups);
    block.appendChild(el("div", "impl",
      "<h3>Design implication &rarr; BusyBee</h3><p>" + theme.impl + "</p>"));
    wall.appendChild(block);
  });

  /* ---------- participant filter chips ---------- */
  const pbar = $("#pbar");
  const counts = {};
  noteEls.forEach((b) => { counts[b.dataset.p] = (counts[b.dataset.p] || 0) + 1; });
  Object.keys(PARTICIPANTS).forEach((k) => {
    const p = PARTICIPANTS[k];
    const c = el("button", "pchip",
      '<span class="dot" style="background:' + p.color + '"></span>' + p.id +
      " <small>" + counts[k] + "</small>");
    c.type = "button";
    c.dataset.p = k;
    c.title = p.role + " · interviewed by " + p.by;
    c.setAttribute("aria-pressed", "false");
    pbar.appendChild(c);
  });
  const sep = el("span", "lab", "Jump to theme");
  sep.style.marginLeft = "10px";
  pbar.appendChild(sep);
  THEMES.forEach((t) => {
    const b = el("button", "tjump", t.id);
    b.type = "button";
    b.dataset.theme = t.id;
    b.title = t.label;
    pbar.appendChild(b);
  });

  let activeP = "all";
  pbar.addEventListener("click", (e) => {
    const jump = e.target.closest(".tjump");
    if (jump) { focusTheme(jump.dataset.theme); return; }
    const chip = e.target.closest(".pchip");
    if (!chip) return;
    activeP = chip.dataset.p === activeP ? "all" : chip.dataset.p;
    [...pbar.querySelectorAll(".pchip")].forEach((c) =>
      c.setAttribute("aria-pressed", String(c.dataset.p === activeP)));
    if (activeP === "all") {
      delete wall.dataset.pfilter;
    } else {
      wall.dataset.pfilter = activeP;
      noteEls.forEach((b) => b.classList.toggle("pmatch", b.dataset.p === activeP));
    }
  });

  /* ---------- search ---------- */
  const q = $("#q");
  q.addEventListener("input", () => {
    const term = q.value.trim().toLowerCase();
    if (!term) { wall.classList.remove("searching"); return; }
    wall.classList.add("searching");
    noteEls.forEach((b) => {
      const n = b._note;
      const hay = (n.t + " " + n.v + " " + PARTICIPANTS[n.p].id).toLowerCase();
      b.classList.toggle("hit", hay.indexOf(term) > -1);
    });
  });

  /* ---------- detail drawer ---------- */
  let selected = null;
  function openNote(note, theme, group, btn) {
    if (selected) selected.classList.remove("sel");
    selected = btn; btn.classList.add("sel");
    const p = PARTICIPANTS[note.p];
    $("#dpid").innerHTML = '<i style="background:' + p.color + '"></i>' + p.id;
    $("#dwho").textContent = p.role + " · interviewed by " + p.by;
    $("#dbody").innerHTML =
      '<div class="dblock"><p class="dlab">Question ' + note.q + '</p><p class="q">' + QUESTIONS[note.q] + "</p></div>" +
      '<div class="dblock"><p class="dlab">Affinity note</p><p class="n">' + note.t + "</p></div>" +
      '<div class="dblock"><p class="dlab">' +
        (note.src === "v" ? "Verbatim response" : "Interviewer&rsquo;s recorded response") +
      '</p><p class="v' + (note.src === "r" ? " rec" : "") + '">' +
        (note.src === "v" ? "&ldquo;" + note.v + "&rdquo;" : note.v) + "</p></div>" +
      '<div class="dpath">Placed under<br><b>' + theme.id + ": " + theme.label + "</b><br>&#8627; &ldquo;" + group.label + "&rdquo;</div>";
    drawer.classList.add("open");
  }
  $("#dclose").addEventListener("click", closeDrawer);
  function closeDrawer() {
    drawer.classList.remove("open");
    if (selected) { selected.classList.remove("sel"); selected = null; }
  }

  /* ---------- zoom + pan ---------- */
  let scale = 1, tx = 0, ty = 0;
  const MIN = 0.12, MAX = 2.4;
  const clamp = (v) => Math.min(MAX, Math.max(MIN, v));
  function apply() {
    wall.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    zval.textContent = Math.round(scale * 100) + "%";
  }
  function zoomAt(px, py, factor) {
    const ns = clamp(scale * factor);
    if (ns === scale) return;
    tx = px - (px - tx) * (ns / scale);
    ty = py - (py - ty) * (ns / scale);
    scale = ns; apply();
  }
  function fit() {
    const w = wall.offsetWidth, h = wall.offsetHeight;
    const vw = stage.clientWidth, vh = stage.clientHeight;
    scale = clamp(Math.min(vw / w, vh / h) * 0.97);
    tx = (vw - w * scale) / 2;
    ty = (vh - h * scale) / 2;
    apply();
  }
  function readSize() {
    const vw = stage.clientWidth, vh = stage.clientHeight;
    const cx = (vw / 2 - tx) / scale, cy = (vh / 2 - ty) / scale;
    scale = 0.85;
    tx = vw / 2 - cx * scale; ty = vh / 2 - cy * scale;
    apply();
  }
  $("#zin").addEventListener("click", () => zoomAt(stage.clientWidth / 2, stage.clientHeight / 2, 1.25));
  $("#zout").addEventListener("click", () => zoomAt(stage.clientWidth / 2, stage.clientHeight / 2, 0.8));
  $("#zfit").addEventListener("click", fit);
  $("#z100").addEventListener("click", readSize);

  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey || !e.shiftKey) {
      zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.11 : 0.9);
    } else {
      tx -= e.deltaY; apply();
    }
  }, { passive: false });

  const pts = new Map();
  let last = null, pinch = null, moved = 0;
  stage.addEventListener("pointerdown", (e) => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) {
      last = { x: e.clientX, y: e.clientY }; moved = 0;
      stage.classList.add("grabbing");
      stage.setPointerCapture(e.pointerId);
    } else if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) };
    }
  });
  stage.addEventListener("pointermove", (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && pinch) {
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = stage.getBoundingClientRect();
      zoomAt((a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top, d / pinch.d);
      pinch.d = d; moved = 99;
      return;
    }
    if (!last) return;
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    moved += Math.abs(dx) + Math.abs(dy);
    tx += dx; ty += dy; last = { x: e.clientX, y: e.clientY };
    apply();
  });
  const up = (e) => {
    pts.delete(e.pointerId);
    if (pts.size < 2) pinch = null;
    if (pts.size === 0) { last = null; stage.classList.remove("grabbing"); }
  };
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);
  wall.addEventListener("click", (e) => { if (moved > 8) e.stopPropagation(); }, true);

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") {
      if (e.key === "Escape") { q.value = ""; wall.classList.remove("searching"); q.blur(); }
      return;
    }
    if (e.key === "0") fit();
    else if (e.key === "+" || e.key === "=") zoomAt(stage.clientWidth / 2, stage.clientHeight / 2, 1.25);
    else if (e.key === "-") zoomAt(stage.clientWidth / 2, stage.clientHeight / 2, 0.8);
    else if (e.key === "Escape") { closeDrawer(); q.value = ""; wall.classList.remove("searching"); }
  });

  /* ---------- chrome height ---------- */
  function chromeH() {
    const h = $(".bar").offsetHeight + $(".pbar").offsetHeight;
    document.documentElement.style.setProperty("--chrome-h", h + "px");
  }
  chromeH();
  window.addEventListener("resize", chromeH);

  /* ---------- document view ---------- */
  const stats = [
    [7, "Participants"], [3, "Interviewers"], [70, "Responses coded"],
    [noteCount, "Affinity notes"], [groupCount, "Group labels"], [THEMES.length, "Themes"]
  ];
  let html =
    "<h1>BusyBee Affinity Wall</h1>" +
    '<p class="sub">CSC 310 Human-Computer Interaction &middot; Phase 2 contextual inquiry &middot; Omar Naguib, Nolan Jarvinen, Evan Wilkin</p>' +
    '<div class="stats">' + stats.map((s) =>
      "<div><b>" + s[0] + "</b><span>" + s[1] + "</span></div>").join("") + "</div>" +
    '<p class="lede">Seven structured interviews, ten questions each, were broken into single-observation notes and grouped bottom-up. ' +
    "Group labels are written in the participants&rsquo; own voice, as Contextual Design prescribes; each note names the participant and the question it came from. " +
    "Responses from P1, P2, P6 and P7 were captured verbatim; P3, P4 and P5 were recorded as interviewer summaries and are marked <em>recorded</em>.</p>" +
    '<div class="stats" style="border:0;padding:0;margin-bottom:30px">' +
      Object.keys(PARTICIPANTS).map((k) => {
        const p = PARTICIPANTS[k];
        return '<div><b style="font-size:14px;color:' + p.color + '">' + p.id + "</b><span>" + p.role + "</span></div>";
      }).join("") + "</div>";

  THEMES.forEach((t) => {
    html += "<section><h2>" + t.id + ": " + t.label + "</h2>" +
      '<p class="tm">' + t.groups.length + " groups &middot; " +
      t.groups.reduce((a, g) => a + g.notes.length, 0) + " notes</p>";
    t.groups.forEach((g) => {
      html += "<h3>&ldquo;" + g.label + "&rdquo;</h3><ul>" +
        g.notes.map((x) => "<li>" + x.t + " <em>" + PARTICIPANTS[x.p].id + ", Q" + x.q +
          (x.src === "r" ? ", recorded" : "") + "</em></li>").join("") + "</ul>";
    });
    html += '<div class="impl"><h3>Design implication &rarr; BusyBee</h3><p>' + t.impl + "</p></div></section>";
  });
  html += '<p class="sub" style="margin:34px 0 0;border-top:1px solid var(--paper-edge);padding-top:18px">' +
    "Method: Beyer &amp; Holtzblatt contextual design. Interviews conducted " +
    "September 2026 by Omar Naguib (P1 and P2), Evan Wilkin (P3 through P5) and Nolan Jarvinen (P6 and P7). " +
    "Notes grouped bottom-up; group labels phrased in participants&rsquo; own voice.</p>";
  $("#readinner").innerHTML = html;

  /* ---------- personas view ---------- */
  const li = (a) => a.map((x) => "<li>" + x + "</li>").join("");
  $("#persinner").innerHTML =
    '<div class="phead"><h1>Three personas, derived from the wall</h1>' +
    "<p>Each persona below is built from the affinity themes, not from assumption. The rail on the left names the " +
    "participants it was grounded in and the themes it draws on. Click any theme chip to jump to that cluster on the wall. " +
    "Names are carried over from the team&rsquo;s earlier research pass so the master deliverable stays consistent.</p></div>" +
    PERSONAS.map((p) =>
      '<article class="pcard">' +
        '<div class="prail">' +
          '<div class="pmono" style="background:' + p.accent + '">' + p.name.charAt(0) + "</div>" +
          "<h2>" + p.name + "</h2>" +
          '<p class="arch" style="color:' + p.accent + '">' + p.archetype + "</p>" +
          '<p class="rlab">Derived from</p><div class="pfrom">' +
            p.from.map((k) => '<span><i style="background:' + PARTICIPANTS[k].color + '"></i>' +
              PARTICIPANTS[k].id + "</span>").join("") + "</div>" +
          '<p class="rlab">Traces to themes</p><div class="tchips">' +
            p.themes.map((t) => '<button type="button" class="tchip" data-theme="' + t + '">' + t + "</button>").join("") +
          "</div>" +
        "</div>" +
        '<div class="pbody">' +
          '<p class="psnap">' + p.snapshot + "</p>" +
          '<p class="pprin" style="color:' + p.accent + '"><span style="color:#1E2229">' + p.principle + "</span></p>" +
          '<div class="pgrid">' +
            "<div><h3>Goals</h3><ul>" + li(p.goals) + "</ul></div>" +
            "<div><h3>Frustrations</h3><ul>" + li(p.frustrations) + "</ul></div>" +
            '<div style="grid-column:1/-1"><h3>What they do today</h3><ul>' + li(p.behavior) + "</ul></div>" +
          "</div>" +
          '<blockquote class="pquote"><p>&ldquo;' + p.quote + "&rdquo;</p>" +
            "<cite>" + PARTICIPANTS[p.quoteBy].id + ", " + PARTICIPANTS[p.quoteBy].role + "</cite></blockquote>" +
          '<div class="pmeta">' +
            "<div><h3>Walk-away threshold</h3><p>" + p.threshold + "</p></div>" +
            "<div><h3>Conditions for trusting BusyBee</h3><p>" + p.trust + "</p></div>" +
          "</div>" +
          '<div class="pserves"><h3 style="font-family:var(--mono);font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-soft);margin:0 0 7px;font-weight:600">How BusyBee serves them</h3>' +
            '<p style="margin:0;font-size:13px;line-height:1.55">' + p.serves + "</p></div>" +
          (p.revision ? '<div class="prev"><h3>Revised by the Phase 2 data</h3><p>' + p.revision + "</p></div>" : "") +
        "</div>" +
      "</article>").join("");

  function focusTheme(id) {
    const idx = THEMES.findIndex((t) => t.id === id);
    if (idx < 0) return;
    const block = wall.children[idx];
    setView("wall");
    requestAnimationFrame(() => {
      scale = 0.5;
      tx = stage.clientWidth / 2 - (block.offsetLeft + block.offsetWidth / 2) * scale;
      ty = 40 - block.offsetTop * scale;
      apply();
    });
  }
  $("#persinner").addEventListener("click", (e) => {
    const chip = e.target.closest(".tchip");
    if (chip) focusTheme(chip.dataset.theme);
  });

  const vwall = $("#vwall"), vpers = $("#vpers"), vread = $("#vread");
  function setView(v) {
    document.body.classList.toggle("reading", v === "read");
    document.body.classList.toggle("personas", v === "personas");
    vwall.setAttribute("aria-pressed", String(v === "wall"));
    vpers.setAttribute("aria-pressed", String(v === "personas"));
    vread.setAttribute("aria-pressed", String(v === "read"));
    if (v === "wall") requestAnimationFrame(fit);
  }
  vwall.addEventListener("click", () => setView("wall"));
  vpers.addEventListener("click", () => setView("personas"));
  vread.addEventListener("click", () => setView("read"));

  /* ---------- boot ---------- */
  var embedded = false;
  try { embedded = window.top !== window.self; } catch (e) { embedded = true; }
  if (embedded) document.body.classList.add("embedded");

  function boot() {
    fit();
    if (stage.clientWidth < 620) setView("read");
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else boot();
  boot();
  window.addEventListener("resize", () => {
    const b = document.body.classList;
    if (!b.contains("reading") && !b.contains("personas")) fit();
  });
})();
