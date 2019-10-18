//获取评论列表
$.ajax({
    type:'get',
    url:'/comments',
    success:function(result){
        //返回的是一个对象
        console.log(result)
        let html = template('commentTpl',result);
        $('#commentsBox').html(html);
        let page = template('pageTpl',result);
        $('#pageBox').html(page)
    }
})
//实现改变文章状态功能 
$('#commentsBox').on('click','.status',function(){
    let id = $(this).attr('data-id');
    let status = $(this).attr('data-status');
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state: status ==0 ? 1 : 0
        },
        success:function(){
            location.reload();
        }
    })
});
//实现删除评论功能 
$('#commentsBox').on('click','.delete',function(){
    let id = $(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:'/comments/'+id,
        success:function(){
            location.reload();
        }
    })
});




function dateForMat(date) {
    date = new Date(date);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
};

function changePage(pageNum){
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            page:pageNum
        },
        success:function(result){
            console.log(result)
            let html = template('commentTpl',result);
            $('#commentsBox').html(html);
            let page = template('pageTpl',result);
            $('#pageBox').html(page)
        }
    })
};