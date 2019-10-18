//获取轮播图列表
$.ajax({
    type:'get',
    url:'/slides',
    success:function(result){
        //返回的是个数组
        console.log(result)
        let html = template('slidesTpl',{data:result});
        $('#slidesBox').html(html);
    }
});
//图片添加功能
$('#file').on('change',function(){
    //获取选择到的文件
    let file = this.files[0];
    //创建 fromData 对象 提交文件
    let formData = new FormData();
    formData.append('cover',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(result){
            //返回数组
            console.log(result)
            //图片预览功能
            $('.thumbnail').prop('src',result[0].cover).show();
            $('#image').val(result[0].cover)
        }
    })
});
//实现添加轮播图功能 
$('#slidesForm').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    //阻止默认行为
    return false;
}); 
//实现轮播图删除功能
$('#slidesBox').on('click','.delete',function(){
    let id = $(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:`/slides/${id}`,
        success:function(){
            location.reload();
        }
    })
});