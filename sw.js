// CSG offline cache. Bump VERSION whenever game files change so players get the update.
const VERSION = "csg-v3-1";
const FILES = ["./", "index.html", "css/style.css", "manifest.webmanifest",
  "data/tuning.js", "data/characters.js", "data/content_core.js", "data/threads_gender.js", "data/threads_politics.js",
  "data/threads_crew.js", "data/threads_more.js", "data/end_states.js",
  "js/avatars.js", "js/game_state.js", "js/audio.js", "js/ui.js", "js/main.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// Network first so updates show up right away; fall back to the cache when offline.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
