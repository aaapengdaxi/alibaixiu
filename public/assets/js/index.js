//查询文章数量
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(result){
        console.log(result);
        let html = template('articleTpl',result);
        $('#articleCount').html(html)
    }
});
//查询分类
$.ajax({
    type:'get',
    url:"/categories/count",
    success:function(result){
        let html = template('categoryTpl',result);
        $('#categoryCount').html(html);
    }
});
//查询评论数量
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(result){
        console.log(result);

        let html = template('commentTpl',result);
        $('#commentCount').html(html);
    }
})