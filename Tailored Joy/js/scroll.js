// ====================
//犬がスクロールに合わせて大きくなる
// ====================
window.addEventListener("load", function () {
  const scrollSection = document.querySelector(".scroll_container");
  const dogItem = document.querySelector(".image-item-dog");
  const dogImg = dogItem ? dogItem.querySelector("img") : null;
  const otherItems = document.querySelectorAll(
    ".image-grid-container .image-item"
  );

  // 横スクロールエリア側の背景
  const bgImg = document.querySelector(".image-section-wrap .background-img");

  // 犬フェーズのあとに続くコンテンツ（実際のクラス名に合わせて変更してね）
  const nextSection = document.querySelector(".next-section");

  if (!scrollSection || !dogItem || !dogImg) return;

  let start = 0; // scroll_container をスクロールしきった位置
  let end = 0; // 犬フェーズが終わる位置
  const maxScale = 2.5;

  let bgClone = null; // 固定背景クローン
  let dogClone = null; // 画面中央で動かす犬クローン
  let spacer = null; // scroll_container の高さを維持するダミー

  // 犬の元位置 → 画面中央までのズレ量
  let dogOffsetX = 0;
  let dogOffsetY = 0;
  let dogOffsetsInitialized = false;

  function updateBounds() {
    // fixed 状態だと高さ計算が狂うので一時的に外して計算
    const wasFixed = scrollSection.classList.contains("fixed");
    if (wasFixed) scrollSection.classList.remove("fixed");

    const sectionRect = scrollSection.getBoundingClientRect();
    const sectionTop = window.pageYOffset + sectionRect.top;

    // scroll_container の「底」が画面の底に来る位置
    start = sectionTop + sectionRect.height - window.innerHeight;

    if (nextSection) {
      const nextRect = nextSection.getBoundingClientRect();
      const nextTop = window.pageYOffset + nextRect.top;
      end = nextTop - window.innerHeight * 0.3;
    } else {
      end = start + window.innerHeight * 2;
    }

    if (wasFixed) scrollSection.classList.add("fixed");
  }

  function ensureSpacer() {
    if (spacer) return;
    spacer = document.createElement("div");
    spacer.style.height = scrollSection.offsetHeight + "px";
    scrollSection.parentNode.insertBefore(spacer, scrollSection.nextSibling);
  }

  function removeSpacer() {
    if (spacer) {
      spacer.remove();
      spacer = null;
    }
  }

  // 背景を body にクローンして固定
  function createFixedBg() {
    if (!bgImg || bgClone) return;
    bgClone = bgImg.cloneNode();
    bgClone.classList.add("bg-fixed-clone");
    document.body.appendChild(bgClone);
    bgImg.style.opacity = "0"; // 横スクロール内の背景は消す
  }

  function removeFixedBg() {
    if (bgClone) {
      bgClone.remove();
      bgClone = null;
    }
    if (bgImg) bgImg.style.opacity = "";
  }

  // 犬クローンを body に出す（元位置→中央までゆったり移動させる）
  function createDogClone() {
    if (dogClone) return;

    // フェーズ2に入るタイミングで、元の犬の位置を測る
    if (!dogOffsetsInitialized) {
      const rect = dogItem.getBoundingClientRect();
      const dogCenterX = rect.left + rect.width / 2;
      const dogCenterY = rect.top + rect.height / 2;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      dogOffsetX = dogCenterX - viewportCenterX; // 中心との差（X）
      dogOffsetY = dogCenterY - viewportCenterY; // 中心との差（Y）
      dogOffsetsInitialized = true;
    }

    dogClone = document.createElement("div");
    dogClone.className = "dog-fixed-clone";

    const img = dogImg.cloneNode();
    dogClone.appendChild(img);
    document.body.appendChild(dogClone);

    // 横スクロール内の犬は消す
    dogItem.style.opacity = "0";
  }

  function removeDogClone() {
    if (dogClone) {
      dogClone.remove();
      dogClone = null;
    }
    dogItem.style.opacity = ""; // 元の犬を戻す
  }

  function resetOthers() {
    otherItems.forEach(function (el) {
      el.style.opacity = "";
      el.style.transform = "";
    });
  }

  function resetSectionVisual() {
    scrollSection.style.opacity = "";
    scrollSection.style.pointerEvents = "";
  }

  function resetOffsets() {
    dogOffsetsInitialized = false;
    dogOffsetX = 0;
    dogOffsetY = 0;
  }

  function onScroll() {
    const y = window.pageYOffset;

    // 1) まだ scroll_container をスクロールしきってない → 通常状態
    if (y <= start) {
      scrollSection.classList.remove("fixed");
      removeSpacer();
      removeFixedBg();
      removeDogClone();
      resetOffsets();
      resetOthers();
      resetSectionVisual();
      return;
    }

    // 2) 犬フェーズも終わったあと → 全部解除して下のコンテンツへ
    if (y > end) {
      scrollSection.classList.remove("fixed");
      removeSpacer();
      removeFixedBg();
      removeDogClone();
      resetOffsets();
      resetOthers();
      resetSectionVisual();
      return;
    }

    // 3) 演出中（start〜end の間）

    // 高さを維持するための spacer を入れてから fixed 化
    ensureSpacer();
    scrollSection.classList.add("fixed");
    scrollSection.style.opacity = "1";
    scrollSection.style.pointerEvents = "none";

    createFixedBg();

    // 全体進行度：start〜end を 0〜1 に正規化
    const clampedY = Math.min(Math.max(y, start), end);
    const t0 = (clampedY - start) / (end - start); // 0〜1

    // ===== フェーズ1：その場で image-item が薄くなる（画面は止まって見える） =====
    const fadeDuration = 0.4; // 0〜0.4 を他アイテムのフェードに使う
    let tFade = t0 / fadeDuration;
    tFade = Math.max(0, Math.min(1, tFade)); // 0〜1にクランプ

    const othersOpacity = 1 - tFade; // 1→0
    const othersTranslate = 20 * tFade; // 0→20px（下にふわっと）

    otherItems.forEach(function (el) {
      el.style.opacity = othersOpacity;
      el.style.transform = "translateY(" + othersTranslate + "px)";
    });

    // フェーズ1中は犬はまだ元の位置、クローンは出さない
    if (t0 < fadeDuration) {
      removeDogClone();
      resetOffsets();
      dogItem.style.opacity = ""; // 横スクロール内の犬は普通に見せておく
      if (bgClone) bgClone.style.opacity = "1";
      return;
    }

    // ===== フェーズ2：image-item 完了後、犬だけゆったり中央へ移動しつつ拡大＆フェード =====
    createDogClone();

    const dogPhaseT = (t0 - fadeDuration) / (1 - fadeDuration); // 0〜1
    const tDogRaw = Math.max(0, Math.min(1, dogPhaseT));

    // ゆったり寄ってくる easing（ease-out）
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    const tDog = easeOutCubic(tDogRaw); // 0〜1

    if (dogClone) {
      const cloneImg = dogClone.querySelector("img");

      // 大きさ：1 → maxScale
      const scale = 1 + (maxScale - 1) * tDog;
      // 透明度：1 → 0
      const opacity = 1 - tDog;

      // 最初は元の位置（中心から dogOffsetX/Y だけズレた位置）にいて、
      // tDog が 1 になると画面ど真ん中に到着
      const currentOffsetX = dogOffsetX * (1 - tDog);
      const currentOffsetY = dogOffsetY * (1 - tDog);

      dogClone.style.transform =
        "translate(calc(-50% + " +
        currentOffsetX +
        "px), calc(-50% + " +
        currentOffsetY +
        "px))";

      if (cloneImg) {
        cloneImg.style.transform = "scale(" + scale + ")";
        cloneImg.style.opacity = String(opacity);
      }

      // 背景も犬と一緒に薄く
      if (bgClone) {
        bgClone.style.opacity = String(opacity);
      }
    }
  }

  updateBounds();
  window.addEventListener("resize", updateBounds);
  window.addEventListener("scroll", onScroll);
  onScroll();
});
