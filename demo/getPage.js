(function($){
	page={
		init:function(obj,args){
			obj.empty();
			this.getBtn=this._getBtn(args);

			if(!args.page){
				args.page=1;
			}
			args.page=parseInt(args.page);
			var rowDom=this.getRowDom(args);
			var pageDom=this.getPageDom(args);
			var jump=this.getJump(args);
			obj.append(rowDom)
				.append(pageDom)
				.append(jump);
			if(args.callback){
				args.callback(args.page);
			}
		},
		getPageDom:function(args){
			var pagetotal=args.pageCount;
			var page=args.current;
			var rows=args.pagetotal;
			var box=$('<div class="pageturning"></div>');
			
			var prevBtn,nextBtn,firstBtn,lastBtn,pubBtn;
			var pubDom=$('<div></div>');

			//第一页
			firstBtn=this.getBtn(1,rows).text('1');
			if(page==1){
				firstBtn.addClass('current');
			}else{
				firstBtn.addClass('tcdNumber');
			}

			//最后一页
			
			lastBtn=this.getBtn(pagetotal,rows).text(pagetotal);
			if(page==pagetotal){
				lastBtn.addClass('current');
			}else{
				lastBtn.addClass('tcdNumber');
			}
			
			
			
			var len=Math.min(page+2,pagetotal-1);
			len<5 && (len=5);
			len=Math.min(len,pagetotal-1);
			var start=Math.max(2,page-2);
			start>pagetotal-4 && (start=pagetotal-4);
			start=Math.max(2,start);
			
			for(var i=start; i<=len; i++){
				pubBtn=this.getBtn(i,rows).text(i);
				if(i==page){
					pubBtn.addClass('current');
				}else{
					pubBtn.addClass('tcdNumber');
				}
				pubDom.append(pubBtn);
			}

			//上一页
			if(page==1){
				prevBtn=$('<span class="disabled"></span>');
			}else{
				prevBtn=this.getBtn(page-1,rows).addClass('prevPage'); 
			}
			//下一页
			if(page==args.pagetotal){
				nextBtn=$('<span class="disabled"></span>');
			}else{
				nextBtn=this.getBtn(page+1,rows).addClass('nextPage');
			}

			box.append(pubDom.children());
			if(start>2){
				box.prepend('<span>…</span>');
			}
			if(len<pagetotal-1){
				box.append('<span>…</span>');
			}
			box.prepend(firstBtn);
			box.prepend(prevBtn);
			box.append(lastBtn);
			box.append(nextBtn);
			return box;
		},
		getRowDom:function(args){
			var arr=[10,20,50];
			var dom=$('<div class="pagenumbox"></div>');
			dom.append('<span>每页</span>');
			var sel=$('<select class="pagetal" type="text"></select>');
			if(arr.indexOf(args.current)==-1){
				arr.unshift(args.current);
			}
			for(var i=0; i<arr.length; i++){
				sel.append('<option value="'+arr[i]+'">'+arr[i]+'</option>');
			}
			sel.change(function(){
				args.next.apply(args.next,[1,sel.val()]);
			});
			dom.append(sel)
				.append('<span>行</span>');
			return dom;
		},
		getJump:function(args){
			var dom=$('<div class="jumppage"></div>');
			dom.append('<span>共 '+args.pagetotal+' 页</span>')
				.append('<span>到第</span>')
				.append('<input class="pageCont" type="text" value="'+args.current+'">')
				.append('<span>页</span>')
			var go=$('<a class="jumpbtn" href="javascript:;">Go</a>');
			dom.append(go);
			go.click(function(){
				var page=dom.find('input').val();
				page=parseInt(page) || 1;
				args.next.apply(args.next,[page,args.pagetotal]);
			});
			return dom;
		},
		_getBtn:function(args){
			var handle=args.next;
			return function(page,rows){
				var obj=$('<a href="javascript:;"></a>');
				obj.click(function(){
					handle.apply(handle,[page,rows]);
				});
				return obj;
			}
		}

	}
	$.fn.createPage=function(options){
		var args=$.extend({
			current:1,//当前第几页
			pagetotal:10,//一页有几行
			pageCount:1,//总共有几页
			// next:initmsg,//点击页码执行的函数
			callback:false,
		},options);
		if(!args.next){
			alert('缺少next参数！');
			return false;
		}
		page.init(this,args);
	}
})(jQuery);