//加载购物车
kai();

//加载商品
$.ajax({
	type:"get",
	url:"JSON/goods.json",
	async:true,
	success:function(res){
		//遍历商品的JSON
		$(res).each(function(index){
			//创建dl、dt、dd
			var mDl=$('<dl id="'+res[index].id+'"></dl>');
			var mDt=$('<dt><img src="img/goods/'+res[index].img+'" /></dt>');
			var mDd=$('<dd><p>'+res[index].title+'</p><u>￥</u><span>'+res[index].price+'</span><a class="btn"><i></i>加入购物车</a></dd>');
			//将dt、dd添加到dl中
			$(mDl).append(mDt);
			$(mDl).append(mDd);
			//将dl添加到商品模块中
			$(".goodsBox .goods").append(mDl);
		});
		
		//鼠标移入dl时，改变其样式
		$(".goods dl").hover(function(){
			$(this).css("border","1px solid #e4393c").next().css("border-left","1px solid #e4393c");
		},function(){
			$(this).css("border","1px dashed #ccc").next().css("border-left","1px dashed #ccc");
		});
		console.log(document.cookie);
		//判断cookie是否为空，显示对应的内容
		if (document.cookie==null||document.cookie=="") {
			$(".carBox .car dl.no_login").show().siblings().hide();
		}else {
			$(".carBox .car dl.no_login").hide().siblings().show();
		}
		
		//点击加入购物城
		//将相应信息，将商品的id编号和数量，添加到cookie中
		$(".goods .btn").click(function(){
			//获取键名为id的值
			var temp=getCookie($(this).closest('dl').attr("id"));
			//设置num，用于记录商品数量
			var num=isNaN(parseInt(temp))?0:parseInt(temp);
			num++;
			setCookie($(this).closest('dl').attr("id"),num);
			cookieIsEmpty();
			kai();
		});
	}
});


function kai(){
	if (document.cookie==""||document.cookie==null) {
		return;
	}	
	var exp=/goods.{1}\b/g;
	var kai=document.cookie.match(exp);
	
	console.log(kai);
	//刷新购物车
	$(".car tbody tr").remove();
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
						var mTr=$('<tr title="'+kai[i]+'"></tr>');
						var mTd1=$('<td><input type="checkbox" name="" id="" value="全选" /></td>');
						var mTd2=$('<td><dl><dt><img src="img/goods/'+res[index].img+'"/></dt><dd>'+res[index].title+'</dd></dl></td>');
						var mTd3=$('<td class="price">'+res[index].price+'</td>');
						var mTd4=$('<td><i class="pre">-</i><input type="text" class="num" value="'+getCookie(kai[i])+'" /><i class="next">+</i></td>');
						var mon=res[index].price*getCookie(kai[i]);
						var mTd5=$('<td class="smallPrice">'+mon.toFixed(2)+'</td>');
						var mTd6=$('<td><a class="del">删除</a></td>');
						$(mTr).append(mTd1);
						$(mTr).append(mTd2);
						$(mTr).append(mTd3);
						$(mTr).append(mTd4);
						$(mTr).append(mTd5);
						$(mTr).append(mTd6);
						$(".car tbody").append(mTr);
					}
				}
			});
			//点击数量下面的按钮减号，可以减少商品数量，每次减一，最小为1
			$(".car tbody .pre").click(function(){
				var num=$(this).next().val();
				if (num==1) {
					return;
				}
				num--;
				$(this).next().val(num);
				allPrice();
				setCookie($(this).closest('tr').attr("title"),num);
				var money=$(this).closest('tr').find('.num').val()*$(this).closest('tr').find('.price').text();
				$(this).closest('tr').find('.smallPrice').text(money.toFixed(2));
			});
			
			//点击数量下面的按钮加号，可以添加商品数量，每次加一，无上限
			$(".car tbody .next").click(function(){
				var num=$(this).prev().val();
				num++;
				$(this).prev().val(num);
				allPrice();
				setCookie($(this).closest('tr').attr("title"),num);
				console.log(document.cookie);
				var money=$(this).closest('tr').find('.num').val()*$(this).closest('tr').find('.price').text();
				$(this).closest('tr').find('.smallPrice').text(money.toFixed(2));
				console.log(money);
			});
			
			//点击删除,将商品从购物车移除，同时从cookie中移除
			$(".car tbody .del").click(function(){
				//从购物车中移除
				$(this).closest('tr').remove();
				//从cookie中移除
				removeCookie($(this).closest('tr').attr("title")); 
				//如果cookie为空，则显示购物车为空
				cookieIsEmpty();
				//统计总价钱
				allPrice();
			});
			
			
			//全选框，点击时，下面全部的勾选框状态和全选框一致
			$(".car .allChecked").click(function(){
				$(".car :checkbox").prop("checked",$(this).prop("checked"));
				allPrice();
			});
			//如果下面的勾选框，只要有一个没勾选，则全选取消
			//如果下面的勾选框，全部勾选后，全选确认
			$(".car tbody :checkbox").click(function(){
				//被勾选的元素，改变背景颜色
//				$(".car tbody tr").css("background","#fff");
				$(".car tbody tr").removeClass("change");
//				$(".car tbody :checked").closest('tr').css("background","#fff4e8");
				$(".car tbody :checked").closest('tr').addClass("change");
				//设置变量，记录是否，全部被选中
				var flag=false;
				$(".car tbody :checkbox").each(function(){
					//如果，该框没有被勾选
					if (!$(this).prop("checked")) {
						//flag设置为true，表示存在没勾选的框
						flag=true;
						$(".car .allChecked").prop("checked",false);
					}
				});
				//判断flag的状态
				if (flag) {
					flag=false;
				}else {
					//全选 所有的勾选框
					$(".car :checkbox").prop("checked",true);
				}
				allPrice();
			});
			
			allPrice();
			
		}
	});
}
//如果cookie为空，则显示购物车为空
function cookieIsEmpty(){
	//判断cookie是否为空，显示对应的内容
	if (document.cookie==null||document.cookie=="") {
		$(".carBox .car dl.no_login").show().siblings().hide();
	}else {
		$(".carBox .car dl.no_login").hide().siblings().show();
	}
}

//统计总价钱
function allPrice(){
	//统计总价钱
	var allPrice=0;
	//遍历tr的行
//	$(".car tbody tr").each(function(index){
	$(".car tbody :checked").closest('tr').each(function(index){
		var num=parseInt($(this).find('.num').val());
		var price=$(this).find(".price").text();
		allPrice=allPrice+num*price;
	});
	$(".car tfoot .allPrice").text(allPrice.toFixed(2));
}