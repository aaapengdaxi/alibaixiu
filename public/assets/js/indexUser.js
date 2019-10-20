//向服务器索要 轮播团数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(response){
        //返回的是个数组
        // console.log(response)
        let html = template('slidesTpl',{data:response});
        $('#slidesBox').html(html);
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination'
            },
          });    
    }
})