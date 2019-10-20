//获取地址栏中的 id 值
   let id = getUrlParams('categoryId');
//根据分类获取文章列表
$.ajax({
    type:'get',
    url:'/posts/category/'+id,
    success:function(response){
        //返回对应文章数组
        // console.log(response);
        let html = template('categoryTpl',{data:response});
        $("#listBox").html(html);
    }
});
//根本id 查询分类
$.ajax({
    type:'get',
    url:'/categories/'+id,
    success:function(response){
        //返回分类对象
        // console.log(response)
        $('#categoryTitle').html(response.title);
    }
});



