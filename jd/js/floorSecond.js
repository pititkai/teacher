//ajax加载，标题栏
$.ajax({
	type:"get",
	url:"JSON/floorSecond.json",
	async:true,
	error:function(res){
		console.log(res.status);
	},
	success:function(res){
		//遍历res，给楼层标题栏，添加内容
		$(res).each(function(index){
			//将内容添加到li中，li追加到ul.list中
			var mLi=$('<li>'+res[index]["first-title"]+'</li>');
			$(".floorSecond_title .list").append(mLi);
		});
		
		
		//鼠标移入标题栏
		$(".floorSecond_title .list li").hover(function(){
			//获取标题的名字
			var txt=$(this).text();
			//对应的标题，改变样式
			$(this).addClass("change").siblings().removeClass("change");
			//隐藏，原本的内容
			$(".floorSecond_banner").hide();
			$(".floorSecond_right").hide();
			//显示和加载对应内容
			$(".floorSecond_main").show();
			//清除主体部分内容，便于加载刷新
			$(".floorSecond_main").children().remove();
			//加载内容
			$.ajax({
				type:"get",
				url:"JSON/floorSecond.json",
				async:true,
				error:function(res){
					console.log(res.status);
				},
				success:function(res){
					
					$(res).each(function(index){
						//遍历["first-content"]的内容
						if (res[index]["first-title"]==txt) {
							var mUl=$('<ul></ul>');
							$(res[index]["first-content"]).each(function(inde){
								//创建li
								var mLi=$('<li></li>');
								//创建超链接，添加图片内容
								var mA=$('<a href="#"><img src="img/floorSecond/main/'+res[index]["first-content"][inde].img+'" /></a>');
								//创建p标签，存放商品名字、小标题、内容
								var mP=$('<p title="name"><a>'+res[index]["first-content"][inde]["second-title"]+'</a></p>');
								//创建span标签，存放商品价格
								var mSpan=$('<span title="price">'+res[index]["first-content"][inde].price+'</span>')
								//把以上标签，追加到li中;li追加到ul中
								$(mLi).append(mA);
								$(mLi).append(mP);
								$(mLi).append(mSpan);
								$(mUl).append(mLi);
							});
							$(".floorSecond_main").append(mUl);
						}
					});
				}
			});
		});
		
		//鼠标移入，热门的标题
		$(".floorSecond_title .list li:contains(热门)").hover(function(){
			//显示热门内容
			$(".floorSecond_banner").show();
			$(".floorSecond_right").show();
			//隐藏主体内容
			$(".floorSecond_main").hide();
		})
		
	}
});


//遍历，.floorSecond_left .list1 li
//让每个li都有不同的背景
$(".floorSecond_left .list1 li").each(function(index){
	$(this).find('i').css("background-position-index",-$(this).find('i').height()*index+"px");
});

//楼层中间的轮播图
//设置索引,这里是li的索引
//克隆第一张图片，追加到ul中，便于无缝轮播
$(".floorSecond_banner .list").append($(".floorSecond_banner .list li").first().clone());
//设置图片索引
var y=0;
//设置计时器，让轮播图自动播放
var floorSecond_timer=setInterval(secondToNext,2000);
//翻转下一页的函数
function secondToNext(){
	if (y>=$(".floorSecond_banner .list li").size()-1) {
		y=0;
		$(".floorSecond_banner .list").css({left:"0px"});
	}else if (y<-1) {
		//如果图片在索引为0，即第一张图片的位置
		y=$(".floorSecond_banner .list li").size()-1;
		var _left=-y*$(".floorSecond_banner").width();
		$(".floorSecond_banner .list").css({left:_left+"px"});
		y-=2;
	}
	y++;
	var _left=-y*$(".floorSecond_banner").width();
	$(".floorSecond_banner .list").stop().animate({left:_left+"px"},500);
	//对应的小圆点，改变背景颜色;其他小圆点样式恢复正常
	//如果索引值，指向的是最后一张图片，让第一个圆点变红
	if (y>=$(".floorSecond_banner .list li").size()-1) {
		$(".floorSecond_banner .num li").eq(0).addClass("active").siblings().removeClass("active");
	}else {
		$(".floorSecond_banner .num li").eq(y).addClass("active").siblings().removeClass("active");
	}	
}

//鼠标移入，轮播图
$(".floorSecond_banner").hover(function(){
	$(".floorSecond_banner span").show();
	clearInterval(floorSecond_timer);
},function(){
	$(".floorSecond_banner span").hide();
	floorSecond_timer=setInterval(secondToNext,2000);
});
//点击上一张
$(".floorSecond_banner .pre").click(function(){
	y-=2;
	secondToNext();
});
//点击下一张
$(".floorSecond_banner .next").click(function(){
	secondToNext();
});

$(".floorSecond_banner .num li").mouseenter(function(){
	$(this).addClass("active");
	y=$(this).index()-1;
	secondToNext();
});