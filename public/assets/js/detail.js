//获取ID值
let id = getUrlParams('id');
//根据id获取文章
$.ajax({
    type:'get',
    url:'/posts/'+id,
    success:function(response){
        //返回对应文章  是对象 
        console.log(response)
        let html = template('articleTpl',response);
        $('.article').html(html);
    }
});
//实现点赞功能
$('.article').on('click','#like',function(){
    //向服务器发送 点赞操作
    $.ajax({
        type:'post',
        url:'/posts/fabulous/'+id,
        success:function(){
            alert('点赞成功,感谢您的支持')
        }
    })
});
//获取网站的配置信息
let review = null;
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        console.log(response);
        review = response.review;
        let html = template('commentTpl',response);
        $('#comment').html(html);
    }
});
//添加评论功能
$('#comment').on('submit','form',function(){
    let content = $(this).find('textarea').val();
    var state;
    if(review){
        //要经过人工审核 
        state = 0;
    }else {
        //不需要经过人工审核
        state = 1;
    }
    //发送添加评论 
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            content:content,
            post:id,
            state:state
        },
        success:function(response){
            
            $(this).find('textarea').val('');

        }
    })
    //阻止默认行为跳转
    return false;
});