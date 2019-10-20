
//获取地址栏中的关键字
let keys = getUrlParams('key');
//发送请求获取文章
$.ajax({
    type:'get',
    url:`/posts/search/${keys}`,
    success:function(response){
        if(response.length !=0){
            let html = template('categoryTpl',{data:response});
        $("#listBox").html(html);
        }else {
            alert('不存在搜索内容')
        }
    }
})

