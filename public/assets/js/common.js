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