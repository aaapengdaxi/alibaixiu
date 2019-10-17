//添加表单提交事件
$('#modifyForm').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success:function(){
            location.href='login.html'
        }
    })
    //阻止默认行为
    return false;

});