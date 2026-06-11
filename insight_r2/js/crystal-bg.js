/**
 * crystal-bg.js
 * hero-wrapper の背景に、クリスタル（結晶）のような線のメッシュを
 * ゆっくり・おとなしめにアニメーションさせる。
 *
 * - 薄い灰色／青の線でノードどうしを結び、メッシュ（結晶格子）に見せる
 * - 近接する3点には、ごく薄い面（ファセット）を描いてクリスタルの面に見せる
 * - prefers-reduced-motion / タブ非表示時は描画を抑制
 */
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var host = document.querySelector(".hero-wrapper");
        if (!host) return;

        // --- canvas を背景として挿入（コンテンツは z-index:10 以上なので前面のまま） ---
        var canvas = document.createElement("canvas");
        canvas.className = "crystal-bg";
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "1";
        canvas.style.pointerEvents = "none";
        host.insertBefore(canvas, host.firstChild);

        var ctx = canvas.getContext("2d");

        // --- 配色（薄い灰色〜青） ---
        var LINE_COLOR = "0, 187, 224";   // 薄い青 (#00bbe0)
        var LINK_DIST = 170;               // この距離以内のノードを線で結ぶ
        var MAX_LINE_ALPHA = 0.16;         // 線の最大不透明度（おとなしめ）
        var FACET_ALPHA = 0.025;           // 面（クリスタルのファセット）の不透明度

        var prefersReduced = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        var dpr = Math.max(1, window.devicePixelRatio || 1);
        var W = 0, H = 0;
        var nodes = [];

        function rand(min, max) { return min + Math.random() * (max - min); }

        function buildNodes() {
            // 面積に応じてノード数を決定（上限つきで負荷を抑える）
            var count = Math.round((W * H) / 26000);
            count = Math.max(28, Math.min(70, count));

            nodes = [];
            for (var i = 0; i < count; i++) {
                nodes.push({
                    x: rand(0, W),
                    y: rand(0, H),
                    // ゆっくりした動き
                    vx: rand(-0.18, 0.18),
                    vy: rand(-0.18, 0.18)
                });
            }
        }

        function resize() {
            var rect = host.getBoundingClientRect();
            W = rect.width;
            H = rect.height;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildNodes();
        }

        function step() {
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                n.x += n.vx;
                n.y += n.vy;
                // 端で跳ね返す
                if (n.x < 0) { n.x = 0; n.vx *= -1; }
                else if (n.x > W) { n.x = W; n.vx *= -1; }
                if (n.y < 0) { n.y = 0; n.vy *= -1; }
                else if (n.y > H) { n.y = H; n.vy *= -1; }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);

            var n = nodes.length;
            var i, j, k;

            // --- クリスタルの面：近接する3点をごく薄く塗る ---
            ctx.lineJoin = "round";
            for (i = 0; i < n; i++) {
                for (j = i + 1; j < n; j++) {
                    var dxij = nodes[i].x - nodes[j].x;
                    var dyij = nodes[i].y - nodes[j].y;
                    if (dxij * dxij + dyij * dyij > LINK_DIST * LINK_DIST) continue;
                    for (k = j + 1; k < n; k++) {
                        var dxjk = nodes[j].x - nodes[k].x;
                        var dyjk = nodes[j].y - nodes[k].y;
                        if (dxjk * dxjk + dyjk * dyjk > LINK_DIST * LINK_DIST) continue;
                        var dxik = nodes[i].x - nodes[k].x;
                        var dyik = nodes[i].y - nodes[k].y;
                        if (dxik * dxik + dyik * dyik > LINK_DIST * LINK_DIST) continue;

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.lineTo(nodes[k].x, nodes[k].y);
                        ctx.closePath();
                        ctx.fillStyle = "rgba(" + LINE_COLOR + "," + FACET_ALPHA + ")";
                        ctx.fill();
                    }
                }
            }

            // --- メッシュの線：近接する2点を結ぶ（距離が近いほど濃く） ---
            ctx.lineWidth = 1;
            for (i = 0; i < n; i++) {
                for (j = i + 1; j < n; j++) {
                    var dx = nodes[i].x - nodes[j].x;
                    var dy = nodes[i].y - nodes[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > LINK_DIST) continue;

                    var alpha = (1 - dist / LINK_DIST) * MAX_LINE_ALPHA;
                    ctx.strokeStyle = "rgba(" + LINE_COLOR + "," + alpha.toFixed(3) + ")";
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        var rafId = null;
        function loop() {
            step();
            draw();
            rafId = window.requestAnimationFrame(loop);
        }

        function start() {
            if (rafId === null) loop();
        }
        function stop() {
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
        }

        // 初期化
        resize();

        if (prefersReduced) {
            // モーション抑制設定時は静止した1フレームのみ描画
            draw();
        } else {
            start();
        }

        // リサイズ対応（過剰発火を抑える）
        var resizeTimer = null;
        window.addEventListener("resize", function () {
            if (resizeTimer) window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () {
                resize();
                if (prefersReduced) draw();
            }, 200);
        });

        // タブが非表示の間は停止して負荷を抑える
        document.addEventListener("visibilitychange", function () {
            if (prefersReduced) return;
            if (document.hidden) stop();
            else start();
        });
    });
})();
