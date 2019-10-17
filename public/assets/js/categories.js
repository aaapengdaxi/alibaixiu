//向服务器发送请求 得到文章数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(result){
        //返回的是文章数据的数组
        console.log(result)
        let html = template('categoryListTpl',{data:result});
        $('#categoryBox').html(html);
    }
});
//实现添加分类
$('#addCategory').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(result){

            location.reload();
        }
    });
    return false;
});
//通过事件委托 给 编辑按钮添加单击事件  实现编辑功能
$('#categoryBox').on('click','.edit',function(){
    let id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(result){
            // console.log(result)  返回的是对应的对象
            let html = template('modifyCategoryTpl',result);
            $('#modifyBox').html(html);
        }
    })
});
//通过事件委托给 修改表单添加 提交事件  保存修改信息功能
$('#modifyBox').on('submit','#addCategoryModify',function(){
    let id = $(this).attr('data-id');
    let formData = $(this).serialize();
    //向服务器发送请求 修改数据
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        success:function(result){
            location.reload();
        }
    })
    return false;
});