//向服务器发送请求 获取文章数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(result){
        //返回的是一个对象 
        console.log(result)
        let html = template('postsTpl',result);
        $('#postsBox').html(html);
    }
});

function dateForMat(date){
    date = new Date(date);
    return  date.getFullYear()+'-'+(date.getMonth() +1) +'-'+date.getDate()
};
//方式一 
// template.defaults.imports.dateForMat = dateForMat;
//方式二 在模板中 直接使用 $imports.dateForMat()  就可以了 