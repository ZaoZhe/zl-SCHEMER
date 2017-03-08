$(document).ready(function() {
    //背景时差
    (function() {
        $('[data-type="background"]').each(function() {
            parall($(this));
        });
        parall($('.palong'));
        parall($('.bubbles'));
        var oVide=$('.video video');

        function parall(obj) {
            $(window).scroll(function() {
                oVide[0].pause();
                var bian = $(window).scrollTop();
                if (bian > 1) {
                    $("#header").addClass('mini');
                    $("#nav").fadeIn(400);
                } else if (bian == 0) {
                    $("#header").removeClass('mini');
                    $("#nav").fadeOut(400);
                } else if (bian >= 1700) {
                    $(".line_bt").addClass('p1-1');
                };

                var y = -$(window).scrollTop() / obj.data('sudu');
                var v = '50% ' + y + 'px';
                obj.css({
                    'backgroundPosition': v
                });
            });
        }

        var ow=$(window).width();
        if(ow<1200){
            setTimeout(function  () {
                $('#canv').fadeOut();
            },2000)
            $('.slider-video').hide();
            $('#banner,#banner .palong').css('height','auto')
        }

        

        $('.video').click(function  () {
            oVide[0].play();
        })

    })();

    $(window).scroll(function() {
        var bian = $(window).scrollTop();
        if (bian >= 1000) {
            $(".line_bt").addClass('p1-1');
        };
        console.log(bian)
        $('#canv').fadeOut();
        if (bian >= 1100) {
            $('.p3_center').show();
            $('.p3_center').addClass('animate');
        }
    });

    $('.w_not').click(function() {
        $.scrollTo('#wor_line', 500);
    })
    $('.w_work').click(function() {
        $.scrollTo('#md_div', 500);
    })
    $('.a_top').click(function() {
        $.scrollTo('#banner', 500);
    });

    //滚动
    (function() {
        var g_bMoveLeft = true;
        var g_oTimer = null;
        var g_oTimerOut = null;

        var g_bPause = false; //控制是否连续运动还是每个图片停顿
        var g_iPauseTime = 4000; //默认运动间隔
        var g_iSpeed = 1; //每次移动像素 控制速度
        var g_distance = parseInt($(".lb_index").outerWidth(true)); //滚动距离
        var g_imageDsitance = parseInt($(".lb_index").first().outerWidth(true)); //单个图片div宽度

        $(window).resize(function() {
            g_imageDsitance = parseInt($(".lb_index").first().outerWidth(true)); //单个图片div宽度
        });

        //初始化--图片翻倍 相对定位 增加最外层宽度
        var allImages = $(".lb_cont02").children().clone(true); //图片复制
        $(".lb_cont02").append(allImages);
        var length = $(".lb_cont02").children().length; //图片总长度
        $(".lb_cont02").css({
            "position": "absolute",
            "left": "0px",
            "width": length * g_distance
        });
        $(window).resize(function() {
            $(".lb_cont02").css({
                "position": "absolute",
                "left": "0px",
                "width": length * g_distance
            });
        });

        //开始运动函数

        function startMove(bLeft) {
            g_bMoveLeft = bLeft;

            if (g_oTimer) {
                clearInterval(g_oTimer);
            }
            if (g_oTimerOut) {
                clearTimeout(g_oTimerOut);
            }
            g_oTimer = setInterval(doMove, 5);
        }

        //停止运动函数

        function stopMove() {
            clearInterval(g_oTimer);
            g_oTimer = null;
        }

        $(".next").hide();
        $(".prev").hide();

        $(".lb_cont02").hover(function() {
            stopMove();
        }, function() {
            startMove(g_bMoveLeft);
        });
        $(".next").show();
        $(".prev").show();

        $(".next").click(function() {
            startMove(false);
        });
        $(".prev").click(function() {
            startMove(true);
        });

        startMove(false);

        //运动函数执行一次left改变g_iSpeed

        function doMove() {
            var scrollElement = $(".lb_cont02");
            var left = parseInt($(".lb_cont02").css("left"));

            if (g_bMoveLeft) {

                left += g_iSpeed;
                if (left >= 0) {
                    left -= length * g_distance / 2;
                }

            } else {
                left -= g_iSpeed;
                if (left <= -length * g_distance / 2) {

                    left += length * g_distance / 2;
                }
            }

            if (g_bPause) {
                if (Math.abs(left - Math.round(left / g_imageDsitance) * g_imageDsitance) < Math.ceil(g_iSpeed / 2)) {
                    stopMove();
                    g_oTimerOut = setTimeout(
                        function() {
                            startMove(g_bMoveLeft);
                        }, g_iPauseTime
                    );

                    left = Math.round(left / g_imageDsitance) * g_imageDsitance;
                }
            };
            $(".lb_cont02").css("left", left);
        }

    }());

    //滚动图片加载

    function show() {
        var imgs = $('#work img');
        var st = $(document).scrollTop();
        var cl = $(window).height();
        var imgs = $('#work img');
        //按序加载
        var st = $(document).scrollTop();

        var cl = $(window).height();

        //$("img")[0].attr("src");
        for (var i = 0; i < imgs.length; i++) {
            if (imgs.eq(i).offset().top + 150 < st + cl) {
                // imgs[i].attr('data-src')
                imgs[i].src = imgs.eq(i).attr("_src");
            };
        };
    }
    show();
    window.onscroll = function() {
        show();
        LayerProperty();
    }


    window.onresize = function() {
        LayerProperty();
    }

    var mb = myBrowser();
    if ("IE" == mb) {
        alert("您正在使用IE相同的内核浏览器，为达到更好的浏览效果请确保为高版本浏览器");
    }
    if ("FF" == mb) {
        alert("您正在使用Firefox浏览器浏览，为达到更好的浏览效果请确保为高版本浏览器");
    }
    if ("Chrome" == mb) {
        alert("您正在使用Chrome浏览器浏览，为达到更好的浏览效果请确保为此版本为高版本的浏览器");
    }
    if ("Opera" == mb) {
        alert("您正在使用Opera浏览器浏览，为达到更好的浏览效果请确保为此版本为高版本的浏览器");
    }
    if ("Safari" == mb) {
        alert("您正在使用Safari浏览器浏览，为达到更好的浏览效果请确保为此版本为高版本的浏览器");
    }



})
var body = document.documentElement;
function layerOpen(index) {
    LayerProperty();
    $("#layerBg").show();
    $("#layerBg").animate({
        opacity: 0.7,filter:'alpha(opacity=70)'
    }, 200);
    if (index == 1) {
        $("#layerBg").css('height', '5067px');
        $('#layercon_2').css('width', '1100px');
    }
}

function layerClose(index) {
    $("#layercon_" + index).css({
        width: '0px'
    });
    $("#layercon2_" + index).css({
        width: '0px',
        height: '0px'
    });
    $("#layerBg").animate({
        opacity: 0,filter:'alpha(opacity=0)'
    }, 200, function() {
        $("#layerBg").hide();
    });
}

function LayerProperty() {
    $("#layerBg").css("width", body.scrollWidth + "px").css("height", body.scrollHeight + "px");

    $("#layercon_2").stop();
    $("#layercon_2").animate({
        left: (body.clientWidth - 1100) / 2,
        top: parseInt($(window).scrollTop()) + ((body.clientHeight - 2421) / 2)
    }, 400)

}

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}