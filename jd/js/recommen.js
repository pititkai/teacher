$.ajax({
	type:"get",
	url:"JSON/recommen.json",
	async:true,
	error:function(res){
		console.log(res.status);
	},
	success:function(res){
		//创建ul标签
		var mUl=$('<ul></ul>')
		//遍历JSON
		$(res).each(function(index){
			//给每个li的a标签，添加一张图片
			var mLi=$('<li><a href="#"><img src="img/recommen/'+res[index]+'" /></a></li>');
			//li追加到ul中
			$(mUl).append(mLi);
		});
		//将ul放到body的.recommen_main，即京东的商品推荐区域
		$(".recommen_main").append(mUl);
		
		//鼠标移入时，显示翻页按钮
		$(".recommen_main").hover(function(){
			$(".recommen_main span").show();
		},function(){
			$(".recommen_main span").hide();
		})
		
		//实现无缝翻页，克隆一页的内容，即四张图片
		$(".recommen_main ul").append($(".recommen_main ul li").slice(0,4).clone());
		//这个索引是用于记录页码
		var index=0;
		//点击左边的箭头，翻到上一页
		$(".recommen_main .pre").click(function(){	
			//判断是否第一页
			//由于第一页和最后一页(克隆页)，内容一页
			if (index==0) {
				//这是最后一页
				index=Math.ceil($(".recommen_main li").size()/4)-1;
				//在第一页时，将ul移动到最后一页
				//再从最后一页开始，进行无缝翻页
				var _left=-$(".recommen_main").width()*index;
				$(".recommen_main ul").css({"left":_left+"px"});
			}
			index--;
			var _left=-$(".recommen_main").width()*index;
			$(".recommen_main ul").stop().animate({left:_left},500);
		});
		
		//点击右边的箭头，翻到下一页
		$(".recommen_main .next").click(function(){
			//索引加一，表示下一张
			index++;
			//如果翻页到，克隆的那一页。
			//因为克隆那页和第一页一样，点击下一页是，直接翻到第二页，即索引值为1
			if (index==5) {
				index=1;
				$(".recommen_main ul").css({"left":"0px"});
			}
			var _left=-$(".recommen_main").width()*index;
			$(".recommen_main ul").stop().animate({left:_left},500);
		});
	}
});