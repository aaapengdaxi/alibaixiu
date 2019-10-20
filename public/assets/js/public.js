//向服务器 请求 随机推荐数据
$.ajax({
    type:'get',
    url:"/posts/random",
    success:function(response){
        // console.log(response);
        let tpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li> 
      {{/each}}
        `;
        let html = template.render(tpl,{data:response});
        $('#randomBox').html(html);
    }
});
//向服务器请求 最新评论数据
$.ajax({
    type:'get',
    url:'/comments/lasted',
    success:function(response){
        //返回 最新评论数据的数组
        // console.log(response);
        let tpl = `
        {{each data}}
        <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
      {{/each}}
        `;
        let html = template.render(tpl,{data:response});
        $('.discuz').html(html);
    }
});
//向服务器 索要 分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        //返回分类数据  数组
        console.log(response)
        let tpl = `
            {{each data}}
            <li>
            <a href="list.html?categoryId={{$value._id}}">
            <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a>
            </li>
            {{/each}}
        `;
        let html = template.render(tpl,{data:response});
        $('.nav').html(html);

    }
});
//获取地址栏中 id的函数
function getUrlParams(key){
  let str = location.search.substr(1);
  let arr = str.split('&');
  for (var i = 0 ; i<arr.length;i++){
      var arr1 = arr[i].split('=');
      if(arr1[0] == key) {
          return arr1[1]
      }
  }
};
//实现搜索功能  获取搜索表单添加提交表单事件
$('.search form').on('submit',function(){
   var keys = $(this).find('.keys').val().trim();
    //跳转到搜索结果页面 并把用户输入的搜索关键字传递
    location.href = 'search.html?key='+keys;
  //阻止表单默认提交行为
  return false;
});