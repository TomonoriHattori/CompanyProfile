function isMobile(){
    var ua = navigator.userAgent;
    if(ua.match(/iPhone|Android.+Mobile|iPad/)){
        return true;
    }else{
        return false;
    }
}

$(function(){

    var nav = $("nav");
    var navHeight = nav.outerHeight();
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var caption = $(".scroll__contents_caption");
    var captionChild =  $(".scroll__contents_caption > div");
    var navTitle = $(".nav__title");

    var explanation = $(".explanation");
    var fixTitle = $(".fix__title");
    var entry_fixArea = $(".entry__fix_area");
    var butefly_bottom = $(".scroll__contents_butefly_bottom");

    var outline = $(".outline");
    
    var explanation_fixArea = $(".explanation__fix_area");
    var canvas = $('#canvas');
    var scaleMax = 4.2;
    var scaleMin = 1;

    var vMiddle = $(window).height() / 2;

    
    var butterfly = $(".butterfly");
    var butterflyMasked = $(".butterfly_masked");
    var butterflyImg = $(".butterfly_img");
    var butterflyMaskedImg = $(".butterfly_masked_img");
    var butterflyMasked = $(".butterfly_masked");

    var butterflyBottomCenter = 0;
    //navのドロップダウン
    $("#dropdownMenu").click(function(e){
        $(".dropdown-content").slideToggle("fast");
        
        e.stopPropagation(); 
    });

    $(document).click(function(){
        $(".dropdown-content").slideUp("fast");
    });

    //もしMacのSafariだったら
    if(!isMobile() && navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
        $(".blur").css("mix-blend-mode","multiply");
        $(".blur").css("opacity",0.5);
    }


    //カーソルに追従
    if(!isMobile()){
        $('.top').mousemove(function(e) {
            if(!showLight) return;
            var offsetX = e.clientX - $(this).offset().left - 566/2; // カーソルのX位置 - 親要素の左端からの距離 - 画像の幅の半分
            var offsetY = e.clientY - $(this).offset().top - 566/2 +  $(window).scrollTop(); // カーソルのY位置 - 親要素の上端からの距離 - 画像の高さの半分
        
            $('#circle').css({
                'left': offsetX + 'px',
                'top': offsetY + 'px',
                'display': 'block'
            });
        }).mouseleave(function() {
            $('#circle').hide(); // マウスがdiv.topから離れたら画像を非表示にする
        });
    }
    var butterflyAlt = $(".butterfly_alt");
    
    var mobileInited = false;

    var blurWrapper = $(".blur_wrapper");

    var rainbowBar = $(".rainbow-bar");

    var butterFlyDiff = 0;
    var canvasStopedY = 0

    var captionScaleLimit = 0;
    var explanationTopLimit = 0;
    var explationFixAreaLimit = 0
    var outLineLimit = 0;
    var butterflyBottomCenter = 0;
    var showLight = true;

    $('.promise_list').each(function(index,element){
        $(element).append(`<div class=""></div>`);
    });

    function scrollEvents(){
        windowHeight = $(window).height();
        scrollTop = $(window).scrollTop();
        //header
        if(scrollTop >=33){
            if(showLight){
                showLight = false;
                $('#circle').hide();
            }
            rainbowBar.css("opacity",0)
        }else{
            rainbowBar.css("opacity",1)
            showLight = true;
        }



        //butterfly
        let batterflyHeight = windowHeight - (-window.innerWidth * 0.35);
        if((!isMobile() && scrollTop==0) || !mobileInited){

            mobileInited = true;
            vMiddle = $(window).height() / 2;
            butterfly.css("height",batterflyHeight);
            butterflyMasked.css("height",batterflyHeight * (1539/2143));
            butterflyImg.css("height",batterflyHeight);

            butterflyAlt.css("height",batterflyHeight* (1539/2143));
            let bMaskImgHalf = butterflyMaskedImg[0].getBoundingClientRect().height/2
            butterflyMasked.css("top",window.innerHeight/2 -bMaskImgHalf);

            let butterflyDiff = batterflyHeight /2143 * 432;
            let butterflyTop = butterflyMasked[0].getBoundingClientRect().top - butterflyDiff;
            butterfly.css("top",butterflyTop);

            captionScaleLimit = Math.floor(caption[0].getBoundingClientRect().top) - vMiddle;
            explanationTopLimit = Math.floor(explanation[0].getBoundingClientRect().top) - vMiddle;

            explationFixAreaLimit = Math.floor(explanation_fixArea[0].getBoundingClientRect().top) - vMiddle/2;
            outLineLimit = Math.floor(outline[0].getBoundingClientRect().top) - vMiddle;

            if(isMobile()){
                fixTitle.css("top",vMiddle);
            }

            butterflyBottomCenter = vMiddle - Math.floor(butefly_bottom[0].getBoundingClientRect().height/2);
            butefly_bottom.css("top",butterflyBottomCenter);   
        }



        let butterflyScale = 1-scrollTop*0.001 
        butterflyImgOpacity= 1-scrollTop*0.002
        butterflyMaskedImgOpacity= scrollTop*0.01
        if(butterflyScale < 0.25){
            butterflyScale = 0.25
            butterflyImgOpacity = 0
            butterflyMaskedImgOpacity = 1
        }

        butterflyImg.css("transform",`scale(${butterflyScale},${butterflyScale})`)
        butterflyMaskedImg.css("transform",`scale(${butterflyScale},${butterflyScale})`)
        butterflyImg.css("opacity",butterflyImgOpacity);
        butterflyMaskedImg.css("opacity",butterflyMaskedImgOpacity);

        if(butterflyImgOpacity <= 0){
            navTitle.addClass("nav__title_active");
            butterfly.css("display","none");
        }else{
            navTitle.removeClass("nav__title_active");
            butterfly.css("display","block");
        }


        
        //caption
        if(scrollTop > captionScaleLimit){
            if(caption.css('position') != "fixed"){
                caption.css('position',"fixed");
                caption.css('top',`${vMiddle}px`);
            }
            let scale = 1 - (scrollTop - captionScaleLimit) * 0.0005;
            //scaleの最大値は1
            if(scale > 1){
                scale = 1;
            }
            captionChild.css('transform',`scale(${scale},${scale})`)
            caption.css('opacity',1 - (scrollTop - captionScaleLimit) * 0.001)

            if(scrollTop >= captionScaleLimit + vMiddle*2) {
                canvas.css({ 'visibility': 'visible'});
            } else {
                canvas.css({ 'visibility': 'hidden'});
            }
        }else{
            //動く
            if(caption.css('position') != "absolute"){
                caption.css('position',"absolute");
                caption.css('top',"");
            }
        }

        //2.explanation
        if(butterflyAlt.offset().top <= butterflyMaskedImg.offset().top){
            butterflyAlt.css({"opacity":1,"z-index":1});
            butterflyMasked.css("opacity",0);
            //Canvas固定

            let canvasTop = canvas[0].getBoundingClientRect().top;
            
            if(canvasStopedY != 0 && butterflyAlt[0].getBoundingClientRect().top > canvasStopedY){
                canvas.css({ 'position': 'absolute', 'top': '110vh'});
            } else if(canvasTop <=-9){
                if(canvasStopedY == 0){
                    canvasStopedY = butterflyAlt[0].getBoundingClientRect().top
                    console.log('set')
                }
                canvas.css({ 'position': 'fixed', 'top': "-9px"});
            }
        }else{
            butterflyAlt.css({"opacity":0,"z-index":1});
            butterflyMasked.css("opacity",1);
        }
        

        var fixTitleTop = explanation_fixArea[0].getBoundingClientRect().top;
        var fixTitleBottom = fixTitleTop + explanation_fixArea.outerHeight() - fixTitle.outerHeight();

        // centerのタイトル
        if(vMiddle+vMiddle > fixTitleBottom) {
            let y = (fixTitleBottom-vMiddle/2)/vMiddle
            fixTitle.css("opacity",y);  

        }else if(vMiddle > fixTitleTop ) {
            let _y = (fixTitleTop-vMiddle/2)/vMiddle
            let y = (fixTitleTop>0)?fixTitleTop:0;
            fixTitle.css("opacity",((vMiddle-fixTitleTop)*0.1)/100);            
        }else{
            fixTitle.css("opacity",0); 
        }

        //下部の蝶
        var butefly_bottomArea = entry_fixArea.offset().top;
        var scale_bottom_buterfly
        if(isMobile()){
            scale_bottom_buterfly = 1 + (scrollTop - butefly_bottomArea) / 900;
        }else{
            scale_bottom_buterfly = 1 + (scrollTop - butefly_bottomArea) / 180;
        }

        scaleMax = 5.5; 
        scaleMin = 1;
        if(scale_bottom_buterfly > scaleMax) { 
            scale_bottom_buterfly = scaleMax;
        }

        if(scrollTop > butefly_bottomArea) {
            canvas.css({ 'display': 'none'});
            butefly_bottom.css({
                position: 'fixed',
                transform: 'translateX(-50%) ' + 'scale(' + scale_bottom_buterfly +')',

            });
        } else { 
            canvas.css({ 'display': 'block'});
            butefly_bottom.css({
                position: 'absolute',
                transform: 'translateX(-50%) scale(' + scaleMin + ')',
            });
        }



    }
    scrollEvents();
    $("body").css("opacity",1);

    var divHeight = $('.explanation_contents').outerHeight();
    $(".explanation_contents").parent().height(divHeight);

    $(window).on('resize load scroll',(function () {

        scrollEvents();
        //document.querySelectorAll('*').forEach(el => el.clientWidth > document.body.clientWidth ? console.log(el) : null);

        fadeinOutline($('.fadein_outline').get()) ;
        fadein($('.fadein').get()) ;

        centerActive();     

        if(scrollTop >= navHeight) {
            canvas.css({ 'visibility': 'visible'});
        } else {
            canvas.css({ 'visibility': 'hidden'});
        }


    }));

    function centerActive() {
        var windowHeight = $(window).height();
        var windowTop = $(window).scrollTop();
        var windowBottom = windowTop + windowHeight / 2;
        
        $('.promise_list').each(function(){
            var $this = $(this);
            var elementTop = $this.offset().top;
            var elementHeight = $this.outerHeight();
            var elementBottom = elementTop + elementHeight;
            var margin = 32;
            var elementCenter = elementTop + (elementHeight / 2) - margin;
            /*if (window.matchMedia('(max-width: 768px)').matches) {
                //スマホ処理
                elementCenter = elementTop + (elementHeight / 2);
            } */
            //if (elementCenter >= windowTop && elementCenter <= windowBottom && (elementBottom + elementHeight / 2) >= windowBottom) {
            if($this[0].getBoundingClientRect().top < vMiddle && $this[0].getBoundingClientRect().bottom > vMiddle){
                $this.children().first().addClass('active-gl');
            } else {
                $this.children().first().removeClass('active-gl');
            }
        });
    }

    async function awaitSecond(sec){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, sec);
        });

    }

    function fadeinOutline(elements) {

        const windowHeight = $(window).height();

        for (const element of elements) {
          const $element = $(element);
          const rect = $element[0].getBoundingClientRect()
          const halfFromTop = rect.top + rect.height / 2;
          if(halfFromTop < windowHeight && rect.top > -halfFromTop){
            $element.removeClass('hide')
            $element.addClass('active');
          }else{   
            $element.removeClass('active');
            $element.addClass('hide');
          }
        }
    }

    async function fadein(elements) {
        for (const element of elements) {
          const $element = $(element);
          const position = $element.offset().top;
          const scroll = $(window).scrollTop();
          const windowHeight = $(window).height();
          
          if (scroll > position - windowHeight + 200) {
            $element.addClass('active');
            await awaitSecond(100); 
          }
        }
      }

});