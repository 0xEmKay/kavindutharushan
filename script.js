(function () {
    var PALETTES = [{"name":"clay","light":{"bg":"#f8f7f7","fg":"#1e1b1a","muted":"#736b68","rule":"#e0dddc","link":"#a5461d"},"dark":{"bg":"#201e1d","fg":"#e2e0df","muted":"#918a88","rule":"#383533","link":"#e98b63"}},{"name":"mustard","light":{"bg":"#f8f8f7","fg":"#1e1d1a","muted":"#706d66","rule":"#e0dfdc","link":"#825e17"},"dark":{"bg":"#201f1d","fg":"#e2e1df","muted":"#918e88","rule":"#383633","link":"#e7b655"}},{"name":"moss","light":{"bg":"#f7f8f7","fg":"#1a1e1b","muted":"#667068","rule":"#dce0dd","link":"#4a6b2a"},"dark":{"bg":"#1d201e","fg":"#dfe2e0","muted":"#88918a","rule":"#333834","link":"#a9c47f"}},{"name":"teal","light":{"bg":"#f7f8f8","fg":"#1a1e1e","muted":"#636e6d","rule":"#dce0e0","link":"#136c69"},"dark":{"bg":"#1d2020","fg":"#dfe2e2","muted":"#889191","rule":"#333838","link":"#55e7e2"}},{"name":"ink","light":{"bg":"#f7f7f8","fg":"#1a1c1e","muted":"#686d73","rule":"#dcdee0","link":"#205fb6"},"dark":{"bg":"#1d1e20","fg":"#dfe0e2","muted":"#888b91","rule":"#333538","link":"#75a6eb"}},{"name":"plum","light":{"bg":"#f8f7f8","fg":"#1d1a1e","muted":"#736b76","rule":"#dfdce0","link":"#9120b6"},"dark":{"bg":"#1f1d20","fg":"#e1dfe2","muted":"#8f8891","rule":"#373338","link":"#d487ee"}},{"name":"rose","light":{"bg":"#f8f7f7","fg":"#1e1a1b","muted":"#766b6c","rule":"#e0dcdd","link":"#b62039"},"dark":{"bg":"#201d1e","fg":"#e2dfdf","muted":"#918889","rule":"#383334","link":"#ed8294"}}];
    var root = document.documentElement;
    var mq = window.matchMedia("(prefers-color-scheme: dark)");

    var idx = 0;
    var isReload = false;
    try {
        var nav = performance.getEntriesByType("navigation")[0];
        isReload = !!nav && nav.type === "reload";
    } catch (e) {}
    try {
        var current = sessionStorage.getItem("palette");
        if (!isReload && current !== null && PALETTES[+current]) {
            idx = +current;
        } else {
            var last = parseInt(localStorage.getItem("lastPalette"), 10);
            idx = isNaN(last) ? Math.floor(Math.random() * PALETTES.length) : (last + 1) % PALETTES.length;
            sessionStorage.setItem("palette", String(idx));
            localStorage.setItem("lastPalette", String(idx));
        }
    } catch (e) {
        idx = Math.floor(Math.random() * PALETTES.length);
    }

    function apply() {
        var c = PALETTES[idx][mq.matches ? "dark" : "light"];
        var s = root.style;
        s.setProperty("--bg", c.bg);
        s.setProperty("--fg", c.fg);
        s.setProperty("--muted", c.muted);
        s.setProperty("--rule", c.rule);
        s.setProperty("--link", c.link);
        s.setProperty("--select", c.link + "40");
        root.style.colorScheme = mq.matches ? "dark" : "light";
    }
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else if (mq.addListener) mq.addListener(apply);
})();

document.addEventListener("DOMContentLoaded", function () {
    // last visitor
    var el = document.getElementById("lastVisit");
    var URL_ = "https://last-visitor.kvndu-762.workers.dev";
    if (el) {
        fetch(URL_)
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (d) {
                if (!d) return;
                var parts = [d.city, d.region, d.country].filter(Boolean);
                if (parts.length) el.textContent = "Last visit from " + parts.join(", ");
            })
            .catch(function () {});
    }
});
