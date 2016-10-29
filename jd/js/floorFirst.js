
$(".floorFirst_left_list li").each(function(index){
	var hei=$(".floorFirst_left_list li i").height();
	$(this).find('i').css("background-position-y",-index*hei+"px");
});

$.ajax({
	type:"get",
	url:"JSON/floorFirst_left.json",
	async:true,
	error:function(res){
		console.log(res.status);
	},
	success:function(res){
		//遍历JSON
		$(res).each(function(index){
			var mUl=$('<ul></ul>');
			//遍历res[index].content的内容
			$(res[index].content).each(function(inde){
				var mLi=$('<li><a href="">'+res[index].content[inde]+'</a></li>');
				$(mUl).append(mLi);
			});
			$(".floorFirst_left_bottom").append(mUl);
		});
		
		//给热门词汇，红色字体
		$(".floorFirst_left_bottom :contains(潮流女装)").css("color","#C81623");
		$(".floorFirst_left_bottom :contains(精品男装)").css("color","#C81623");
		$(".floorFirst_left_bottom :contains(水晶手链)").css("color","#C81623");
		$(".floorFirst_left_bottom :contains(奢品名表)").css("color","#C81623");
	}
});

$(".floorFirst_title ul li").eq(0).addClass("change");
var temp=0;
//鼠标移入标题栏
$(".floorFirst_title ul li").hover(function(){

	$(this).addClass("change").siblings().removeClass("change");
	$(".floorFirst .floorFirst_top").show();
	$(".floorFirst .floorFirst_center").hide();
	$(".floorFirst .floorFirst_right").hide();
	if ($(this).text()=="男装") {
		temp="male";
	}else if($(this).text()=="女装"){
		temp="female";
	}else if($(this).text()=="大牌"){
		$(".floorFirst .floorFirst_top").hide();
		$(".floorFirst .floorFirst_center").show();
		$(".floorFirst .floorFirst_right").show();
		return;
	}else {
		return;
	}
	//加载 第一楼层的主要信息.floorFirst_main
	$.ajax({
		type:"get",
		url:"JSON/floorFirst_main_male.json",
		async:true,
		error:function(res){
			console.log(res.status);
		},
		success:function(res){
			//加载成功，把之前加载的内容删除
			//即，删除ul
			$(".floorFirst_top").children().remove();
			var mUl=$('<ul></ul>');
			$(res).each(function(index){
				if (res[index].title) {
					var mLi=$('<li><a href="#"><img src="img/floorFirst/'+temp+'/'+res[index].img+'"></a><p><a href="#">'+res[index].title+'</a></p><span>'+res[index].price+'</span></li>');
					
				}else {
					var mLi=$('<li><a href="#"><img src="img/floorFirst/'+temp+'/'+res[index].img+'"></a></li>');
				}
				$(mUl).append(mLi);
			});
			$(".floorFirst_top").append(mUl);
			//设置有价钱的样式
			$(".floorFirst_top li").has('span').css({"height":"236px"}).find('img').css({"margin-top":"15px"});
		}
	});
});
//第一楼层中间的轮播图
//克隆第一张图片，追加到ul中，便于无缝轮播
$(".floorFirst_center_banner .list").append($(".floorFirst_center_banner .list li").first().clone());
//设置图片索引
var x=0;
//设置计时器，让轮播图自动播放
var floorFirst_timer=setInterval(toNext,2000);
//翻转下一页的函数
function toNext(){
	if (x>=$(".floorFirst_center_banner .list li").size()-1) {
		x=0;
		$(".floorFirst_center_banner .list").css({left:"0px"});
	}else if (x<-1) {
		//如果图片在索引为0，即第一张图片的位置
		x=$(".floorFirst_center_banner .list li").size()-1;
		var _left=-x*$(".floorFirst_center_banner").width();
		$(".floorFirst_center_banner .list").css({left:_left+"px"});
		x-=2;
	}
	x++;
	var _left=-x*$(".floorFirst_center_banner").width();
	$(".floorFirst_center_banner .list").stop().animate({left:_left+"px"},500);
	//对应的小圆点，改变背景颜色;其他小圆点样式恢复正常
	//如果索引值，指向的是最后一张图片，让第一个圆点变红
	if (x>=$(".floorFirst_center_banner .list li").size()-1) {
		$(".floorFirst_center_banner .num li").eq(0).addClass("active").siblings().removeClass("active");
	}else {
		$(".floorFirst_center_banner .num li").eq(x).addClass("active").siblings().removeClass("active");
	}

	
}
//鼠标移入时，清除计时器
//显示翻页箭头
$(".floorFirst_center_banner").hover(function(){
	$(".floorFirst_center_banner span").show().css("color","#fff");
	clearInterval(floorFirst_timer);
//鼠标移出时，重启计时器
//隐藏翻页箭头
},function(){
	$(".floorFirst_center_banner span").hide();
	floorFirst_timer=setInterval(toNext,2000);
});

//点击上一张
$(".floorFirst_center_banner .pre").click(function(){
	x-=2;
	toNext();
});
//点击下一张
$(".floorFirst_center_banner .next").click(function(){
	toNext();
});

$(".floorFirst_center_banner .num li").mouseenter(function(){
	$(this).addClass("active");
	x=$(this).index()-1;
	toNext();
});
