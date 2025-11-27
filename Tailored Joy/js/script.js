 // ハンバーガーメニュー
        $(function () {
            $(".hamburger").click(function () {
                $(".hamburger").toggleClass("open");
                // $(".header_nav").fadeToggle();
            })
        })

        $(function () {
            $(".hamburger-sp").click(function () {
                $(".hamburger-sp").toggleClass("open-sp");
                $(".header_nav-sp").fadeToggle();
            })
        });

         // slick

        // worksのスライド
        $('.works_image').slick({
            pauseOnHover: false,    // ホバーで止めない
            centerMode: true,       // **中央の画像を強調 両サイドを表示**
            centerPadding: "20%",   // **中央の画像の両端の表示領域を設定 (重要)**
            lazyLoad: 'ondemand',
            autoplay: true, //自動再生
            autoplaySpeed: 4000,// 0秒間隔で動く
            slidesToShow: 3,        // 一度に表示するスライドの数
            slidesToScroll: 1,
            dots: true,             // ドットナビゲーション
            arrows: true,            // 矢印ナビゲーション
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '10%',
                }
            }]
        });


        // イラストスライド
        $(".illust_image").slick({
            arrows: true,// 横スクロールが消える
            dots: false,
            autoplay: true, //自動再生
            autoplaySpeed: 0,// 0秒間隔で動く
            slidesToShow: 10, //1度に10つのスライド表示
            Infinity: true,//ループ
            cssEase: 'linear', //動きを滑らかに
            speed: 5000, // スライド速度を調整
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 7
                }
            }]
        });
