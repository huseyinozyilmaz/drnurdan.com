$(document).ready(function(){

    //wow.js init
    wow = new WOW(
        {
          animateClass: 'animated',
          mobile: true,
          offset: 0
        }
    );
    wow.init();

    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });

    $("#contact-form").submit(function (e) {
        e.preventDefault();
    });
    var action = $("#contact-form").attr("action");
    var email  = action.substring(action.lastIndexOf("/") + 1, action.length);
    $("#btn-submit").click(function (e) {
        $.post( action, $( "#contact-form" ).serialize(), function(result) {
            if(result && result.success) {
                swal({
                    title: "Thanks",   
                    text: "Your message has been successfully sent. I will try to respond as soon as I review your message. All information received will always remain confidential.",
                    type: "success",   
                    confirmButtonText: "OK"
                });
            }
            else {
                swal({
                    title: "Oops...",
                    text: "Something went wrong!<br>Your message cannot be sent. Possible reason: <i>" + result.messages[0] + "</i><br><br>You can always send an email to <a href='mailto:" + email + "'>" + email +"</a>",
                    type: "error",
                    html: true,
                    confirmButtonText: "OK"
                });
            }
        },'json');
    });
});