

		//异步获取地址信息(welcome_left )，追加到ul中
		$.ajax({
			type:"get",
			url:"JSON/welcome_left.json",
			async:true,
			success:function(res){
				$(res).each(function(index){
					var mLi=$('<li><a href="#">'+res[index]+'</a></li>');
					$(".welcome_left ul").append(mLi);
				});
			}
		});
		
		//异步获取清单信息(welcome_right),追加到网站导航中
		$.ajax({
			type:"get",
			url:"JSON/welcome_right.json",
			async:true,
			success:function(res){
//				console.log(res);
				//遍历JSON,创建ul
				$(res).each(function(index){
					var mUl=$('<ul></ul>');
					$(".welcome_nav > div").append(mUl);
					var mTitle=$('<h2>'+res[index].title+'</h2>')
					$(".welcome_nav > div > ul").eq(index).append(mTitle);
					$(res[index].content).each(function(ind){
						var mLi=$('<li><a href="#">'+res[index].content[ind]+'</a></li>');
						$(".welcome_nav > div > ul").eq(index).append(mLi);
					});
				});
			}
		});
		
		//有下拉符号的元素li，鼠标移入时，背景颜色变成白色
		//下箭头和上箭头切换
		//同时显示详细内容
		$(".welcome_right li").hover(function(){
			console.log(1);
			$(this).find('u').animate({top:"-11px"},300);
			$(this).has('u').css("background","#fff").children('div').show();
		},function(){
			console.log(2);
			$(this).find('u').animate({top:"-15px"},300);
			$(this).has('u').css("background","#f1f1f1").children('div').hide();
		});
		
		$(".welcome_right > ul > li:not(:last-child) > div").css("left","0");
		
		//鼠标移入welcome左侧，送至XX
		//弹出多个地方的选择，显示ul
		$('.welcome_left').mouseenter(function(){
			$(".welcome_left ul").show();
			$(this).find('u').animate({top:"-11px"},300);
			//点击，更换地点样式和内容
			//ul列表中，a的点击事件和鼠标移入事件
			$(".welcome_left ul li a").click(function(){
				//获取li的文本
				var txt=$(this).text();
				$(this).closest('.welcome_left').find('span').text(txt);
				$(this).removeClass().addClass("bg_red").css("color","#fff")
				.closest('li').siblings().find('a').removeClass("bg_red").css("color","#777");
			//鼠标移入，没有被标记的元素，改变样式
			}).mouseenter(function(){
				if ($(this).hasClass("bg_red")) {
					return;
				}
				//鼠标移入的元素，改变样式
				//其他元素，样式不改变样式
				$(this).addClass("bg_gray").closest('li').siblings().find('a').removeClass("bg_gray");
			});
		//鼠标移开	
		}).mouseleave(function(){
			$(this).find('u').animate({top:"-15px"},300);
			$(".welcome_left ul").hide();
			$(".welcome_left a").removeClass("bg_gray");
		});
		
		//鼠标移入手机京东
		$(".phoneJd").hover(function(){
			$(this).find('i').css("background-position-y","-25px");
		},function(){
			$(this).find('i').css("background-position-y","0px");
		});
