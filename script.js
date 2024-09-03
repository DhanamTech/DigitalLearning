jQuery(document).ready(function($) {
	jQuery(document).on('click', '.iconInner', function(e) {
		jQuery(this).parents('.botIcon').addClass('showBotSubject');
		$("[name='msg']").focus();
	});

	jQuery(document).on('click', '.closeBtn, .chat_close_icon', function(e) {
		jQuery(this).parents('.botIcon').removeClass('showBotSubject');
		jQuery(this).parents('.botIcon').removeClass('showMessenger');
	});

	jQuery(document).on('submit', '#botSubject', function(e) {
		e.preventDefault();

		jQuery(this).parents('.botIcon').removeClass('showBotSubject');
		jQuery(this).parents('.botIcon').addClass('showMessenger');
	});
	
	$(document).on("submit", "#messenger", async function(e) {
		e.preventDefault();

		var val = $("[name=msg]").val().toLowerCase();
        const API_KEY = "AIzaSyCoW7wGuiF_uhs7M2uSNAxl56x3YjJ45Yc";
        const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key="+API_KEY;
		var mainval = $("[name=msg]").val();
		name = '';
        
		function userMsg(msg) {
			$('.Messages_list').append('<div class="msg user"><span class="avtr"><figure style="background-image: url(asset/avatar.png)"></figure></span><span class="responsText">' + mainval + '</span></div>');
		};
		function appendMsg(msg) {
			$('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url(asset/avatar.png)"></figure></span><span class="responsText">' + msg + '</span></div>');
			$("[name='msg']").val("");
		};


		userMsg(mainval);
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{text:val}]
                }]
            })
        });

        const data = await response.json();
    
        const apiResponse = data?.candidates[0].content.parts[0].text;
        appendMsg(apiResponse);
	
		var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
		$('.Messages').animate({scrollTop: lastMsg}, 'slow');
	});
})