$(window).resize(function(){
	$(".toolbar").css("height",$(window).height());
})
$(".toolbar").css("height",$(window).height());
//$(this).find('span').css({right:-$(this).find('span').outerWidth()+"px"});
//鼠标移入工具栏，出现文字提示
$(".toolbar li").hover(function(){
	console.log($(this).find('span').outerWidth());
	$(this).find('span').show(true,true).stop(true).animate({width:"50px"},300);
},function(){
	$(this).find('span').stop().animate({width:"0px"},300,function(){
		$(this).hide();
	});
});

//点击顶部的li，滚动条回到最顶部
$(".toolbar .toTop").click(function(){
	$('html,body').scrollTop(0);
});

$(".toolbar .toolbar_main :contains(购物车)").click(function(){
	open("car.html","_self");
});