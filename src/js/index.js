var CWL = function($, document, window) {
  return {
    el: {},
    onNav: function () {
      var that = this;
      var header = this.el.header;
      var mb;
      window.addEventListener('scroll', function (e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100;
        if (distanceY > shrinkOn) {
				  jQuery('header').addClass("smaller");
        } else {
          jQuery('header').removeClass("smaller");
        }
      })
      header.on('click', '#menu-btn', function () {
        $('#mainMenu').toggle()
      });
      window.onresize = function(event) {
        var mq = window.matchMedia( "(min-width: 993px)" );
        var mx = window.matchMedia( "(max-width: 992px)" );
        if (mq.matches) {
          $("#mainMenu").show();
        } else {
          $("#mainMenu").hide();
        }
      }
    },
    imgToggle: function () {
      $('body').on('click','.cwl-about-mini', function () {
        var url = $(this).attr('data-url');
        $('.cwl-about-mini').removeClass('active');
        $(this).addClass('active');
        $('#cwl-about')[0].src = url;
      })
    },
    navList: function () {
      $('body').on('click','.cwl-list-item', function (e) {
        $('.cwl-list-item').removeClass('active');
        $(this).addClass('active');
        var hash = this.hash
        $('html,body').animate({scrollTop:$(hash).offset().top - 70 }, {easing: 'swing', duration: 600});
      })
    },
    companyToggel: function () {
      $('body').on('click', '.cwl-tab-item', function () {
        var index = $(this).index();
        var op = $(this).attr('data-op');
        $(this).addClass('active').siblings().removeClass('active');
        $('.cwl-tab-content').eq(index).show().siblings('.cwl-tab-content').hide();
        if (op) {
          if (index == 0) {
            $('#companybg').addClass('cwl-company-bg-1').removeClass('cwl-company-bg-2');
          } else {
            $('#companybg').addClass('cwl-company-bg-2').removeClass('cwl-company-bg-1');
          }
        }
      })
    },
    initAnimation: function () {
      $(window).ready(function () {
        $('.animated').fadeTo(0,0);
      })
      $(window).scroll(function() {
        $('.animated').each(function(){
          var imagePos = $(this).offset().top;//元素距离文档顶部的高度
          var timedelay = $(this).attr('data-delay');//获取延迟时间
          var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+500) {

              //delay() 对队列中的下一项执行延迟	//延迟时间放入队列
              $(this).delay(timedelay).queue(function(){
                //fadeTo(500,1) ???  //速度500ms,opacity：1
                $(this).fadeTo(500,1);

                $anim = $(this).attr('data-animation');//获取动画 名称
                $(this).addClass($anim).clearQueue();//添加动画后清除队列，防止继续执行
              });
            }
        });
      });
    },
    init: function () {
      this.el.header = $('header')
      this.onNav()
      this.imgToggle()
      this.navList()
      this.companyToggel()
      this.initAnimation()
    }
  }
}(jQuery, document, window);
