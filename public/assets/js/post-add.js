//请求分类列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(result){
        //返回文章类别的数组
        console.log(result)
        let html = template('categoryTpl',{data:result});
        $('#category').html(html);
    }
});
//更改图片触发 实现上传图片 
$("#feature").on('change',function(){
    //获取选择到的文件
   let file =  this.files[0];
   //创建formData 对象  实现二进制文件上传
    let formData = new FormData();
    //将文件追加到 formData 对象中
    formData.append('cover',file);
    //实现图片上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //jq 默认会把数据变成键值对的形式, 这里是阻止改变
        processData:false,
        contentType:false,
        success:function(result){
            console.log(result)
            $('#thumbnail').val(result[0].cover);
            //实现图片预览
            $('.thumbnail').attr('src',result[0].cover).show()
        }
    })
});
//实现创建文章  退出再登录  cookie 失效了
$("#addForm").on('submit',function(){
    //获取表单数据
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(){
            //文章添加成功跳转到文章列表页面
            location.href = '/admin/posts.html';
        }
    })
    //阻止默认提交行为
    return false;
});