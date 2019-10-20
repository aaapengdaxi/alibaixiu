//向服务器请求 热门推荐内容
$.ajax({
  type: "get",
  url: "/posts/recommend",
  success: function(response) {
    //返回的为数组
    // console.log(response);
    //复用 避免使用量词模板
    var recommendTpl = `
        {{each data}}
        <li>
        <a href="javascript:;">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}
        `;
        let html = template.render(recommendTpl,{data:response});
        $('#recommendBox').html(html);
  }
});
