$.ajax({
	type:"get",
	url:"JSON/banner_left_homeEle.json",
	async:true,
	success:function(res){
		$(res).each(function(index){
			//把第一标题追加到.banner_list  li a标签中，
			var mLi=$('<li><a href="#">'+res[index]["first-title"]+'<i>&gt;</i></a><div></div></li>');	
			//将li添加到ul.banner_list
			$(".banner_list").append(mLi);
			//遍历第一层header
			$(res[index]["first-header"]).each(function(inde){
				var mA=$('<a href="#">'+res[index]["first-header"][inde]+'<i>&gt;</i></a>')
				$('.banner_list div').eq(index).append(mA);
			});
			//遍历第一层内容 
			$(res[index]["first-content"]).each(function(inde){
				//创建dl、dt、dd标签
				var mDl=$('<dl></dl>');
				var mDt=$('<dt><a href="#">'+res[index]["first-content"][inde]["second-title"]+'</a><i>&gt;</i></dt>');
				var mDd=$('<dd></dd>');
				$(mDl).append(mDt);
				//遍历第二层内容
				$(res[index]["first-content"][inde]["second-content"]).each(function(ind){
					var mA=$('<a href="#">'+res[index]["first-content"][inde]["second-content"][ind]+'</a>');
					$(mDd).append(mA);
				});
				$(mDl).append(mDd);
				
				//将第二层内容，追加到li div标签中
				//将dl添加到ul.banner_list > li > div,这里div只有一个，所以可以使用eq()查找
				$('.banner_list div').eq(index).append(mDl);
			});
			
			
			
			//鼠标移入li时，显示信息内容
			$(".banner_list li").hover(function(){
				$(this).css({"background":"#fff"}).find('div').show();
				$(this).children('a').css({"color":"#cd303c"});
				//隐藏右箭头
				$(this).children('a').children('i').hide();
			//鼠标移出li时，隐藏内容
			},function(){
				$(this).css({"background":"#c81623"}).find('div').hide();
				$(this).children('a').css({"color":"#fff"});
				//显示右箭头
				$(this).children('a').children('i').show();
			});
			
			//清除最后一个dd的下边框
			$(".banner_list div dd:last-child").css("border-bottom","none");
		});
	},
	error:function(){
		console.log(status);
	}
});

var index=0;
var timer1=setInterval(nextImg,3000);
function nextImg(){
	index++;
	$(".banner_center img").css("opacity","0");
	$(".banner_center img").eq(index%6).animate({opacity:1},1000);
	$(".num li").eq(index%6).addClass("active").siblings().removeClass("active");
}
//鼠标移入图片时，清除计时器
$(".banner_center").hover(function(){
	$(".banner_center span").show();
	clearInterval(timer1);
},function(){
	$(".banner_center span").hide();
	timer1=setInterval(nextImg,3000);
})

//点击上一张
$(".pre_img").click(function(){
	if (index==0) {
		index=$(".banner_center img").size();
	}else{
		index-=2;
	}
	nextImg();
});
//点击下一张
$(".next_img").click(function(){
	nextImg();
});
//鼠标移到小圆点上，切换对应图片
$(".num li").mouseenter(function(){
	index=$(this).index()-1;
	nextImg();
});
var myTimer=null;

//鼠标移到，banner右侧的业务
//前四个业务，触发事件
$(".banner_right .bottom > ul > li").slice(0,4).on("mouseenter",hehe);

function hehe(){
	$(".banner_right .bottom > ul > li").slice(0,4).css({"border-bottom":"1px solid #ccc"});
	$(this).css({
		"border-bottom":"1px solid #fff",
		"border-top":"1px solid #C81623",
		"color":"#C81623"
		}).siblings().css({
			"color":"#666",
			"border-top":"1px solid #ccc"
		});
	//显示相应的内容，这里li的个数和div.bot的个数一样
	//索引相对应
	$(".bottom > div").eq($(this).index()).show().siblings().has('u').hide();
	$(".banner_right .bottom > ul > li:gt(3)").hide();
	$(".banner_right .bottom > ul > li").slice(0,4).find('i').hide();
}
//点击关闭按钮，显示原来的内容
$(".banner_right .bottom > div > u.close").click(function(){
	//移除鼠标移入事件
	$(".banner_right .bottom > ul > li").slice(0,4).unbind("mouseenter");
	$(".banner_right .bottom > ul > li").slice(0,4).css("border-bottom","none");
	$(this).addClass("gray");
	$(".banner_right .bottom > ul > li").show().find('i').show();
	
	$(".banner_right .bottom > ul > li").slice(0,4).css({"border-top":"1px solid #ccc"});
});
//
$(".banner_right .bottom > div > u.close").hover(function(){
	$(this).addClass("gray");
},function(){
	$(this).removeClass("gray");
});
//鼠标移出，业务框，重新绑定鼠标移入事件
$(".banner_right .bottom > ul > li").slice(0,4).mouseleave(function(){
	$(".banner_right .bottom > ul > li").slice(0,4).on("mouseenter",hehe);
});

//鼠标滑过  充值话费、流量等类型时，改变样式
$(".banner_right .bottom > div > ul > li > a").hover(function(){
	$(this).addClass("change").closest('li').siblings().find('a').removeClass("change");
});

$(".banner_right .bottom .bot2 :radio").click(function(){
	if ($(".banner_right .bottom .bot2 :checked").val()==2) {
		$(".banner_right .bottom .bot2 .returnTime").show();
	}else {
		$(".banner_right .bottom .bot2 .returnTime").hide();
	}
})