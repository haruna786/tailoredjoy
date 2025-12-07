// ====================
// ⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎topページ⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎⭐︎
// ====================

// ハンバーガーメニュー
$(function () {
  const $hamburger = $(".hamburger");
  const $nav = $(".header_nav");

  $hamburger.on("click",function(e){
  e.stopPropagation();
  $hamburger.toggleClass("open");
  $nav.toggleClass("is-open");
});

$nav.on("click","a",function(){
  $hamburger.removeClass("open");
  $nav.removeClass("is-open");
});
});

// =================================================

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


function clear() {
    $('#website').css('display','none');
    $('#lp').css('display','none');
    $('#banner').css('display','none');
    $('#illust').css('display','none');
    $('#gif').css('display','none');
}


// ボタン表示
$("#all-btn,#all-btn2").on("click", function () {
    $('#website').css('display','grid');
    $('#lp').css('display','grid');
    $('#banner').css('display','grid');
    $('#illust').css('display','grid');
    $('#gif').css('display','grid');
});

$("#website-btn, #website-btn2").on("click", function () {
    clear();
    $('#website').css('display','grid');
});

$("#lp-btn, #lp-btn2").on("click", function () {
    clear();
    $('#lp').css('display','grid');
});

$("#banner-btn, #banner-btn2").on("click", function () {
    clear();
    $('#banner').css('display','grid');
});

$("#illust-btn, #illust-btn2").on("click", function () {
    clear();
    $('#illust').css('display','grid');
});

$("#gif-btn, #gif-btn2").on("click", function () {
    clear();
    $('#gif').css('display','grid');
});