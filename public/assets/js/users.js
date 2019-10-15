//表单提交事件
$('#userForm').on('submit',function(){
    //获取到表单内容 并把内容 格式化成参数字符串
    let formData = $(this).serialize();
    //向服务器端发送添加用户的请求
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(result){
            location.reload();
        },
        error:function(){
            alert('用户添加失败')
        }
    });
    //阻止表单默认提交行为 兼容性最强
    return false;
});
//上传用户头像  给头像添加 onchange事件
$('#avatar').on('change',function(){
    let formData = new FormData();
    formData.append('avatar',this.files[0]);
    
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //告诉$.ajax 方法不要解析请求参数
        processData:false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType:false,
        success:function(result){
            //返回的是一个数组  每个值为对象
            console.log(result);
            $('#preview').attr('src',result[0].avatar);
            //这一行的作用是提交表单时,保证上传头像的地址也能作为一项提交给服务器
            $('#hiddenAvatar').val(result[0].avatar);
        }
    })
});

//获取用户列表
$.ajax({
    type:'get',
    url:'/users',
    success:function(result){
        //返回的是数据库中用户集合的数据  返回的是数组
        console.log(result)
        let html = template('userTpl',{data:result});
        $('#userBox').html(html);
    }
});