//实现上传图片 
$('#logo').on('change',function(){
    //获取上传的图片
    let file = this.files[0];
    //创建formData 对象  实现二进制文件上传
    let formData = new FormData();
    formData.append('avatar',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(result){
            console.log(result)
            //图片预览
            $('#preview').prop('src',result[0].avatar)
            $('#hiddenLogo').val(result[0].avatar)
        }
    })
});
//实现添加设置功能
$('#settingsForm').on('submit',function(){
    let formData = $(this).serialize();
    console.log(formData)
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(){
            location.reload();
        }
    })

    //阻止默认行为
    return false;
});
// 向服务区 请求网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(result){
        console.log(result)
        //如果有设置 显示在页面中
        if(result){
            //将logo 地址存在隐藏域中
            $('#hiddenLogo').val(result.logo);
            //将logo显示出来
            $('#preview').attr('src',result.logo);
            //站点名称 
            $('input[name="title"]').val(result.title);
            //是否开启评论功能
            $('input[name="comment"]').prop('checked',result.comment);
            //将评论是否经过人工批准
            $('input[name="review"]').prop('checked',result.review)
        }
    }
})