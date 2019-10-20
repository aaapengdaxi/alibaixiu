$('#logout').on('click',function(){
    let isConfirm = confirm('你真的要退出吗');
    if(isConfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(result){
          location.href="login.html";
        },
        error:function(err){
          alert('退出失败')
        }
      })
    };
});
//向服务器请求对应的用户信息
$.ajax({
  type:'get',
  url:`/users/${userId}`,
  success:function(result){
    console.log(result)
    $('.profile .avatar').attr('src',result.avatar);
    $('.profile .name').html(result.nickName);
    
  }
})