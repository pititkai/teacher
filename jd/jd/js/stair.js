$(".stair .list li").hover(function(){
	$(this).addClass("change").siblings().removeClass("change");
	$(this).find('span').hide().siblings().show();
},function(){
	$(this).find('span').show().siblings().hide();
})

$(".stair .list li").click(function(){
	$(this).find('span').hide().siblings().show();
});