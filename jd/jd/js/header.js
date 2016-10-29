//鼠标移入购物车按钮时，显示出购物车的详细信息
$('.shoppingCar > div').hover(function(){
	$(this).css({"background":"#fff"});
	$(this).find('div').show();
	if (document.cookie=="") {
		$(".shoppingCar .carList > ul").hide().siblings().show();
	}else {
		$(".shoppingCar .carList > ul").show().siblings().hide();
	}
},function(){
	$(this).css({"background":"#f4f4f4"});
	$(this).find('div').hide();
	
});

//购物车，加载cookie的内容
carList();

function carList(){
	if (document.cookie==""||document.cookie==null) {
		return;
	}	
	var exp=/goods.{1}\b/g;
	var kai=document.cookie.match(exp);
	//刷新购物车
	$(".header .shoppingCar_count").text(kai.length);
	$(".carList > ul").children().remove();
	$.ajax({
		type:"get",
		url:"JSON/goods.json",
		async:true,
		success:function(res){
			$(res).each(function(index){
				
				for (var i=0;i<kai.length;i++) {
					//根据ID，在JSON中找相关信息
					//根据信息，放进td中
					if (kai[i]==res[index].id) {
						var mLi=$('<li><img src="img/goods/'+res[index].img+'"/><p>'+res[index].title+'</p><span class="price">￥'+res[index].price+'</span><u class="num">x'+getCookie(kai[i])+'</u></li>');
						$(".carList > ul").append(mLi);
					}
				}
			});	
		}
	});
}