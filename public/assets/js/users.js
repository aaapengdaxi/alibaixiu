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
$('#modifyBox').on('change','#avatar',function(){
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
            //实现头像预览功能
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
//通过事件委托给编辑按钮添加点击事件 编辑功能
$('#userBox').on('click','.edit',function(){
    let id   = $(this).attr('data-id');
    //向服务器发送请求,通过id查询用户
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(result){
            //返回对应用户的数据
            console.log(result);
            let html = template('modifyTpl',result);
            $('#modifyBox').html(html)
        }
    })
});
//通过事件委托给修改表单添加表单提交事件 修改功能
$('#modifyBox').on('submit','#modifyForm',function(){
    let id = $(this).attr('data-id');
    let formData = $(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:formData,
        success:function(result){
            location.reload();
        }

    })
    return false;
});
//通过事件委托给删除按钮添加点击事件
$('#userBox').on('click','.delete',function(){
    let isConfirm = confirm('是否真的要删除此用户？')
    if(isConfirm){
        let id =$(this).attr('data-id');
        //向服务器发送删除请求
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(result){
                location.reload();
            }
        })
    }   
});

//批量删除功能的实现
//给全选按钮添加改变事件
$('#checkAll').on('change',function(){
    // $(this).prop('checked') 全选按钮的状态 
    //找到tbody下面所有的checkbox  与全选按钮的状态相同   全选全不选
    $('#userBox .userStatus').prop('checked', $(this).prop('checked'));
    if($(this).prop('checked')){
        $('#deleteMany').show()
    }else {
        $('#deleteMany').hide()

    }
});
//给tbody中的每个按钮添加改变事件
$('#userBox').on('change','.userStatus',function(){
    let inputs = $('#userBox').find('input');
    //选中复选框的长度与 复选框长度一致时  全选
    if(inputs.length == $('#userBox .userStatus:checked').length){
        $('#checkAll').prop('checked',true)
    }else {
        $('#checkAll').prop('checked',false)
    };
    if($('#userBox .userStatus:checked').length>=2){
        $('#deleteMany').show()

    }else {
        $('#deleteMany').hide()

    }
});
//给批量删除按钮添加点击事件
$('#deleteMany').on('click',function(){
    let arr = [];
    //返回的是被选中的input 的数组
    let checkedUser = $('#userBox .userStatus').filter(':checked');
    // console.log(checkedUser)
    //循环复选框 得到选中复选框 data-id的值
    checkedUser.each(function(index,element){
        arr.push($(element).attr('data-id'));
    });
    /* 第二种方式
        let checkedUser = $('#userBox .userStatus:checked');
        let str = '';
        checkedUser.each(function(index,item){
            //最后面会多一个'-'
            str += $(item).attr('data-id') + '-';
        })
        str = str.substring(0,str.length);
    */
    // console.log(arr)
    //向服务器发送请求 批量删除
    if(confirm('你真的要批量删除吗?')){
        $.ajax({
            type:'delete',
            url:'/users/'+arr.join('-'),
            success:function(){
                location.reload();
            }
        })
    };
});