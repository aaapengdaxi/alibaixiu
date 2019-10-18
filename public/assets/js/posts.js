//向服务器发送请求 获取文章数据
$.ajax({
  type: "get",
  url: "/posts",
  success: function(result) {
    //返回的是一个对象
    console.log(result);
    let html = template("postsTpl", result);
    $("#postsBox").html(html);
    let page = template("pageTpl", result);
    $("#page").html(page);
  }
});
//获取并处理分类数据
$.ajax({
  type: "get",
  url: "/categories",
  success: function(result) {
    console.log(result);
    let html = template("categoryTpl", { data: result });
    $("#categoryBox").html(html);
  }
});
//筛选表单提交事件
$("#filterForm").on("submit", function() {
  let formData = $(this).serialize();
  //向服务器发送请求 获取筛选出来的文章数据
  $.ajax({
    type: "get",
    url: "/posts",
    data:formData,
    success: function(result) {
      //返回的是一个对象
      console.log(result);
      let html = template("postsTpl", result);
      $("#postsBox").html(html);
    }
  });
  //阻止默认提交行为
  return false;
});

function dateForMat(date) {
  date = new Date(date);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}
//方式一
// template.defaults.imports.dateForMat = dateForMat;
//方式二 在模板中 直接使用 $imports.dateForMat()  就可以了
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/posts",
    data: {
      page: page
    },
    success: function(result) {
      //返回的是一个对象
      console.log(result);
      let html = template("postsTpl", result);
      $("#postsBox").html(html);
      let page = template("pageTpl", result);
      $("#page").html(page);
    }
  });
}
