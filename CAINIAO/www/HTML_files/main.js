
jQuery(document).ready(function ($){
//$(function(){

	//搜索
	$(".search-reveal").click(function() {
        $(".row-search-mobile").slideToggle("400",
        function() {});
    });
	
	$('.placeholder').on('blur',function(){
	    if($(this).val() == ""){
	     $(this).val("搜索……");
	     }
	});
	$('.placeholder').on('focus',function(){
	 if($(this).val() == '搜索……') {
	      $(this).val('');
	   }
	});
	$('#feed_email').on('blur',function(){
	    if($(this).val() == ""){
	     $(this).val("输入邮箱 订阅笔记");
	     }
	});
	$('#feed_email').on('focus',function(){
	 if($(this).val() == '输入邮箱 订阅笔记') {
	      $(this).val('');
	   }
	});
	
	//代码高亮
	if(!$("pre").hasClass("prettyprint")) {
		$("pre").addClass("prettyprint");
	}
	

	// 列表
	color_flag = false; //配色标记
	prev_title_flag = false;
	next_title_flag = false;
 	href = window.location.href;
 	var total = $("#leftcolumn a").length;
	$("#leftcolumn").find("a").each(function(index, value){
		if(next_title_flag) {
				return false; //结束循环
		} 
		
		
		cur_href = $(this).attr("href");
		
		cur_obj = $(this);

		//if(href.match(cur_href) != null) {
		if(href.indexOf(cur_href) != -1) {
			//console.log('cur_href', cur_href);
		if(index==0) {
			$(".previous-design-link").hide();
		}
		if(index==(total-1)) {
			$(".next-design-link").hide();
		}
			
			
			if(cur_href.indexOf('/') == -1) { //第二重判断
				tmp_url = href.substring(0, href.lastIndexOf('/')+1) + cur_href;
				
				if(href != tmp_url) return;
			}
			if(!color_flag) {
				$(this).css({"background-color":"#96b97d","font-weight":"bold", "color":"#fff"});
				color_flag = true;
			}
			prev_href = $(this).prev("a").attr("href");
			prev_title = $(this).prev("a").attr("title");
			if(!prev_title) prev_title=$(this).prev("a").text();
			next_href = $(this).next("a").attr("href");
			next_title = $(this).next("a").attr("title");
			if(!next_title) next_title=$(this).next("a").text();
			if(!prev_title_flag) {
				if( prev_title ) {
					$(".previous-design-link a").attr("href", prev_href);
					$(".previous-design-link a").attr("title", prev_title);
					$(".previous-design-link a").text( prev_title);
				} else {
					if(typeof(prev_obj) != 'undefined') {
						prev_href = prev_obj.attr("href");
						prev_title = prev_obj.attr("title");
						if(!prev_title) prev_title=prev_obj.text();
						if(prev_title) {
							$(".previous-design-link a").attr("href", prev_href);
							$(".previous-design-link a").attr("title", prev_title);
							$(".previous-design-link a").text( prev_title);
						}
					}
					
				}
				prev_title_flag = true;
			}
			if(next_title) {
				if($(".next-design-link a").attr("href")) {
					$(".next-design-link a").attr("href", next_href);
					$(".next-design-link a").attr("title", next_title);
					$(".next-design-link a").text( next_title);
				} else {
					$(".next-design-link").html("<a href=\"" + next_href + "\" rel=\"next\" title=\"" + next_title + "\">" + next_title + "</a> &raquo;");
				}
				
				next_title_flag = true;
				
			}
			//return false; 
		} else {
			prev_obj = cur_obj;
			if(next_title_flag) {
				return false;
			} else {
				if(prev_title_flag) {
					next_href = $(this).attr("href");
					next_title = $(this).attr("title");
					if(!next_title) next_title=$(this).text();
					if(next_title) {
						if($(".next-design-link a").attr("href")) {
							$(".next-design-link a").attr("href", next_href);
							$(".next-design-link a").attr("title", next_title);
							$(".next-design-link a").text( next_title);
						} else {
							$(".next-design-link").html("<a href=\"" + next_href + "\" rel=\"next\" title=\"" + next_title + "\">" + next_title + "</a> &raquo;");
						}
						next_title_flag = true;
					}
				}
			}
		}
	});
	
	// 侧栏
	$(".sidebar-tree > ul > li").hover(function(){
		$(this).addClass("selected");
		$(this).children("a:eq(0)").addClass("h2-tit");
		$(this).children("ul").show();
	},function(){
		$(this).removeClass("selected");
		$(this).children(".tit").removeClass("h2-tit");
		$(this).children("ul").hide();
	})
	// 关闭QQ群
	$(".qqinfo").hide();
	//$.getJSON("/try/qqinfo.php", function(data) {
	//	$("#qqid").text(data.qqid);
	//	$("#qqhref").attr("href", data.qqhref);
	//});
	// 首页导航
	$("#index-nav li").click(function(){
		$(this).find("a").addClass("current");
		$(this).siblings().find("a").removeClass("current");
		id = $(this).find("a").attr("data-id");
		$(".sub-navigation-articles").hide();
		if(id == 'index') {
			
		}
		if(id == 'note') {
			
		} else if(id == 'tool') {

		} else if(id == 'quiz') {
			$("#tool").hide();
			$("#manual").hide();
			$("#" + id).show();
			$(".sub-navigation-articles").show();
		} else if(id == 'manual') {
			$("#tool").hide();
			$("#quiz").hide();
			$("#" + id).show();
			$(".sub-navigation-articles").show();
		} else {
			$("#tool").hide();
			$("#quiz").hide();
			$("#manual").hide();
		}
    });
	$("#cate0").click(function() {
		$(".codelist-desktop").show();
	})
	$(".design").click(function() {
		id = $(this).attr("id");
		$("." + id).show();
		$("." + id).siblings().hide();
	})
	//移动设备点击链接	
	$('a').on('click touchend', function(e) {
		if(screen.availHeight==548 && screen.availHeight==320) {
	  		var el = $(this);
	  		var link = el.attr('href');
	  		window.location = link;
  		}
	});
	
	$("#pull").click(function() {
		$(".left-column").slideToggle("400",function() {});
	})
	$(".qrcode").hover(function(){
		$("#bottom-qrcode").show();
		},function(){
			$("#bottom-qrcode").hide();
	});
	$(window).scroll(function () {
	    if($(window).scrollTop()>=100) {
	        $(".go-top").fadeIn();
	         if ($('#htmlfeedback-container').length){
	         	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
					 // some code..
				} else {
	         		$("#htmlfeedback-container").show();
	         	}
	         }
	    }else {
	    	$(".go-top").fadeOut();
	    }
	});


	$(".go-top").click(function(event){	
		$('html,body').animate({scrollTop:0}, 100);
		return false;
	});
	$(window).resize(function() {
		var viewportWidth = $(window).width();
		if(window.location.href.indexOf("w3cnote")!=-1) {
			//console.log('href', window.location.href);
		} else {
			if(viewportWidth>768) {
				$(".left-column").show();
			}
		}
		
	});

	
});
/**
* 用户登陆注册
*/
jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$runoob_pop = $('.runoob-pop');
	
	//判断是否登陆
	$.post('/wp-content/themes/runoob/option/user/log.php',{action:'checklogin'},function(res){
		if(res.error==0) {
			$('<a target="_blank" href="http://www.runoob.com/member">'+res.msg+'</a>').replaceAll('.runoob-pop');
		
		}
	},'json');
	
	//弹出窗口
	$runoob_pop.on('click', function(event){
		$form_modal.addClass('is-visible');	
		//show the selected form
		( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
	});

	//关闭弹出窗口
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	//使用Esc键关闭弹出窗口
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

	//切换表单
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}
	$('.full-width2').on('click', function(e){
        e.preventDefault();     
        var form = $(this).parent().parent();
        var action = form.find('input[name="action"]').val();
        var inputs = '';
        var isreg = (action == 'signup') ? true : false

        if( !action ){
            return
        }

        if( isreg ){ // 注册
        	verifycode = form.find('input[name="verifycode"]').val();
        	email = form.find('input[name="email"]').val();
        	name = form.find('input[name="name"]').val();
        	password = form.find('input[name="password"]').val();
        	password2 = form.find('input[name="password2"]').val();
        	inputs = {verifycode:verifycode,name:name,password:password,email:email,password2:password2,action:action};
        }else{ // 登陆
        	username = form.find('input[name="username"]').val();
        	password = form.find('input[name="password"]').val();
        	if($('#remember-me').attr('checked')) {
        		remember = 1;
        	} else {
        		remember = 0;
        	}
        	inputs = {username:username,password:password,action:action,remember:remember};
        }

        $.ajax({  
            type: "POST",  
            url:  jsui.uri+'/option/user/log.php',  
            data: inputs,  
            dataType: 'json',
            success: function(data){

                if( data.error ){
                	error_msg = '<p class="errtip">	<strong>错误</strong>：'+data.msg+'</p>'
                    $(".err-msg").html(error_msg);
                    return
                }

                if( isreg ){
                    location.reload();
                }else{
                	 location.reload();
                }
            }  
        });  
    })

});



jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};
//--------- 登陆，注册结束---------------
// 废弃弹窗
function NewWindow(text)
{
	win=window.open(text,'','top=0,left=0,width=400,height=230');
}

// 百度自动推送
(function(){
    var bp = document.createElement('script');
    bp.src = '//push.zhanzhang.baidu.com/push.js';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
