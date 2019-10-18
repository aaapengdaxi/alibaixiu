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