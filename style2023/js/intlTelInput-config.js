//自定义参数
var get_ie = ieVersion();
if(get_ie != 'ie7' && get_ie != 'ie8' && get_ie != 'ie9'){
	var phoneInputField = document.querySelector("#phone");
	var phoneInput = window.intlTelInput(phoneInputField, {
			utilsScript: "https://statics.zwsoft.com/static/style2023/js/intl-tel-input-utils-17.0.8.js",
			preferredCountries:[],
			//dropdownContainer:document.body,
		});
		
	phoneInputField.addEventListener("open:countrydropdown", function() {
	  telContainer();
	});

	$(window).resize(function(){
		telContainer();
	});

	telContainer();
	function telContainer(){
		var is_feedback = "";
		var utel_width = 0;
		if($(".input-list").length > 0){
			utel_width = $(".input-list").width();//旧版LP
		}else if($(".genuine-form-warp").length > 0){
			utel_width = $(".genuine-form-warp").width(); //ebook/Huisman-case-study
		}else if($(".we-row .we-col").length > 0){
			utel_width = $(".we-row .we-col").width();//story
		}else if($(".choose-top .choose-list").length > 0){
			utel_width = $(".choose-top .choose-list").width();//2023版LP
		}else if($("#myform #email").length > 0){
			utel_width = $("#myform #email").width();//安装反馈
			var is_feedback = 'feedback';
		}
		var window_width = $(window).width();
		if(window_width > 1366 && window_width <= 1680){
			//if(is_feedback != 'feedback'){
				$(".iti__country-list").width(utel_width + 60);
				$(".iti__country-list").addClass("tel-container");
			//}
		}
		if(window_width > 768 && window_width <= 1366){
			//if(is_feedback != 'feedback'){
				$(".iti__country-list").width(utel_width + 30);
				$(".iti__country-list").addClass("tel-container");
			//}
		}
		if(window_width <= 768){
			$("body").addClass("iti-mobile");
			$(".iti--container").attr('style','');
		}
					
	}
}