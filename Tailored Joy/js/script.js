// ローディング
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    let progress = 0;

    function updateProgress() {
        if (progress < 100) {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;

            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;

            if (progress < 100) {
                setTimeout(updateProgress, 200);
            } else {
                setTimeout(() => {
                    loading.style.display = 'none';
                    content.classList.add('show');
                }, 500);
            }
        }
    }

    updateProgress();
});


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
    $(".hamburger-sp").click(function () {
    $(".hamburger-sp").toggleClass("open-sp");
    $(".header_nav-sp").fadeToggle();
    });
});


// クリックすると犬の画像+背景が変わる
// 定義
const barking = document.getElementById("dog-click-image");
const changing = document.getElementById("back-change");
const changing2 = document.getElementById("works-back");
const coloring = document.getElementById("back-color");
// 動作
function changeColor(){
coloring.classList.toggle("on_back-color");
}
function changeImg(){
barking.classList.toggle("on_dog-click");
changing.classList.toggle("on_back-change");
changing2.classList.toggle("on_works-back");
}
barking.addEventListener("click",changeImg);


// ２つ目のナビゲーション
$(function () {
// コンセプトセクションの上端のY座標を取得
// offset().top→ページの一番上からコンセプトセクションまでの距離
    const conceptPos = $('#works').offset().top;
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        // スクロールがworksを過ぎたとき
        if (scrollTop > conceptPos) {
        // header_nav2 を表示
            $('.header_nav2').addClass('active');
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
    });

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

// // 犬がスクロールに合わせて大きくなる

$(function () {
    /* スクロール量　代入用 */
    var scroll;
    var sum;
    $(window).scroll(function () {
        /* スクロール量を取得 */
        scroll = $(this).scrollTop();
        /* コンソールログで確認  */
        console.log(scroll);
        /* 円の大きさ+スクロール量 / 60*/
        sum = 1 + scroll / 80;
        console.log(sum);
        /* 円の大きさにスクロール量を足す */
        $(".image-item-dog").css({
            "transform": "scale(" + sum + ")"
        })
    })
})




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


