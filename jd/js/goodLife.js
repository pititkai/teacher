$.ajax({
	type:"get",
	url:"JSON/goodLife.json",
	async:true,
	error:function(res){
		console.log(res.status);
	},
	success:function(res){
		
		//创建内容
		//遍历第一层，获取title
		$(res).each(function(index){
			var mDiv=$('<div></div>')
			var mH=$('<h3>'+res[index]["first-title"]+'</h3>');
			$(mDiv).append(mH);
			//遍历第一层内容，res[index]["first-content"]
//			alert(res[0]["first-content"][0]["second-content"][1]);
			$(res[index]["first-content"]).each(function(inde){
				//创建dl、dt、dd
				//将第二层，标题、图片路径添加到dl中
				var mDl=$('<dl></dl>');
				var mDt=$('<dt></dt>');								
				var mDd=$('<dd><img src="img/goodLife/'+res[index]["first-content"][inde]["second-img"]+'" /></dd>');
				//遍历第二层的，res[index]["first-content"][inde]["second-content"]
				$(res[index]["first-content"][inde]["second-content"]).each(function(ind){
					var mP=$('<p>'+res[index]["first-content"][inde]["second-content"][ind]+'</p>');
					$(mDt).append(mP);
				});
				//将dt、dd添加到dl中
				$(mDl).append(mDt);
				$(mDl).append(mDd);
				//将dl添加到div中
				$(mDiv).append(mDl);
				$(".goodLife").append(mDiv);
			});
		})
		//给每个div一个class，便于设置样式
		$(".goodLife div").eq(0).addClass("goodLife_left");
		$(".goodLife div").eq(1).addClass("goodLife_center");
		$(".goodLife div").eq(2).addClass("goodLife_right");
		$(".goodLife div").eq(3).addClass("goodLife_brand").find('h3').remove();
		$(".goodLife img").wrap('<a href="#"></a>');
	}
});