// ====================
// ⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎topページ⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎
// ====================

// ハンバーガーメニュー
$(function () {
  $(".hamburger").click(function () {
    $(".hamburger").toggleClass("open");
    // $(".header_nav").fadeToggle();
  });
});

$(function () {
  $(".hamburger").click(function () {
    if (window.innerWidth <= 768) {
      $(".hamburger").toggleClass("open-sp");
      $(".header_nav-sp").fadeToggle();
    }
  });
});
$(function () {
  $(".hamburger-sp").click(function () {
    if (window.innerWidth <= 768) {
      $(".hamburger-sp").toggleClass("open-sp");
      $(".header_nav-sp").fadeToggle();
    }
  });
});



// クリックすると犬の画像+背景が変わる
$(function () {
  // URLに "index.html" が含まれていたら実行
  if (location.pathname.endsWith("index.html") || location.pathname === "/") {
    const barking = $("#dog-click-image");
    const changing = $("#back-change");
    const changing2 = $("#works-back");
    const coloring = $("#back-color");

    function changeColor() {
      coloring.toggleClass("on_back-color");
    }

    function changeImg() {
      barking.toggleClass("on_dog-click");
      changing.toggleClass("on_back-change");
      changing2.toggleClass("on_works-back");
    }

    // クリックイベント
    barking.on("click", changeImg);
  }
});


// ２つ目のナビゲーション
$(function () {
  function navScrollControl() {
    // 画面幅が768px未満なら処理しない
    if ($(window).width() < 768) return;

// コンセプトセクションの上端のY座標を取得
// offset().top→ページの一番上からコンセプトセクションまでの距離
    const conceptPos = $("#concept").offset()?.top || 0;
    const scrollTop = $(window).scrollTop();

    // スクロールがworksを過ぎたとき
    if (scrollTop > conceptPos) {
    // header_nav2 を表示
      $(".header_nav2").addClass("active");
    // ハンバーガーメニューのボタン自体を非表示
      $('.hamburger').hide(); // .hide()で要素を非表示

    // PCハンバーガーメニューが開いていたら自動で閉じる
      if ($('.hamburger').hasClass('open')) {
      // 開いていたメニュー（.header_nav）を閉じる
      $('.header_nav').fadeOut(300);
      // ボタンの開閉状態クラスを削除
      $('.hamburger').removeClass('open');
     }

  } else {
    // TOPに戻ったら header_nav2 を非表示
      $('.header_nav2').removeClass('active');
    // ★ ハンバーガーメニューのボタンを再表示する
      $('.hamburger').show(); // .show()で要素を再表示
    }
  }
  // 初回＆スクロール時＆リサイズ時にも評価
  navScrollControl();
  $(window).on("scroll resize", navScrollControl);
});


// 横スライド部分
// HTMLドキュメント全体 の中から、セレクター(.sticky_wrap)に一致するすべての要素を
// stickySections という名前の定数（再代入できない変数）として宣言
// （height: 400vhを持つ要素）
const stickySections = [...document.querySelectorAll('.sticky_wrap')]


window.addEventListener('scroll', (e) => {
    for(let i = 0; i < stickySections.length; i++){
    transform(stickySections[i])
    }
})

function transform(section) {

    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.horizontal_scroll')

  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;

    percentage = percentage < 0 ? 0 : percentage > 100 ? 100 : percentage;
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`
}




// slick
// worksのスライド
$(".works_image").slick({
  pauseOnHover: false, // ホバーで止めない
  centerMode: true, // **中央の画像を強調 両サイドを表示**
  centerPadding: "20%", // **中央の画像の両端の表示領域を設定 (重要)**
    lazyLoad: "ondemand",
  autoplay: true, //自動再生
  autoplaySpeed: 4000, // 0秒間隔で動く
  dots: true, // ドットナビゲーション
  arrows: true, // 矢印ナビゲーション
    responsive: [{
        breakpoint: 768,
        settings: {
        centerPadding: "10%"
        }
    }]
});

// イラストスライド
$(".illust_image").slick({
  arrows: true, // 横スクロールが消える
    dots: false,
  autoplay: true, //自動再生
  autoplaySpeed: 0, // 0秒間隔で動く
  slidesToShow: 10, //1度に10つのスライド表示
  Infinity: true, //ループ
  cssEase: "linear", //動きを滑らかに
  speed: 5000, // スライド速度を調整
    responsive: [{
        breakpoint: 768,
        settings: {
        slidesToShow: 7
        }
    }]
});



// ====================
// アバウトページ　popup表示
// ====================

$(".icon-circle").on("click", function () {
    var targetPopup = $(this).closest(".icon-item").find(".popup");
    targetPopup.fadeIn().addClass("show");
});

$(".close").on("click", function (event) {
    event.stopPropagation();
    $(this).closest(".popup").fadeOut().removeClass("show");
});

$(".popup").on("click", function (event) {
    if ($(event.target).hasClass("popup")) {
    $(this).fadeOut().removeClass("show");
    }
});


// ====================
// ワークスページ　SPの横に出てくる表示
// ====================
// 「作品一覧」の動作
$(".works-right-push").on("click", function () {
$(".works-right-push-menu").toggleClass("is-open");
});

// メニュー内のリンクをクリックした時も閉じる処理
$(".works-menu-list a").on("click", function () {
$(".works-right-push-menu").removeClass("is-open");
$(".works-right-push").removeClass("open");
});


