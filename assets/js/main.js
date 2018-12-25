$(document).ready(function(){
    var loaded = Date.now()

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

    function renderMessages (messages) {
        var list = ''
        $.each(messages, function(index, value){
            list = list + '<br><small>' + value + '</small>'
        })
        return list
    }

    $("#contact-form").submit(function (e) {
        e.preventDefault();
    });

    $("#btn-submit").click(function (e) {
        $('#signclick').val('ctrl-' + Math.random().toString(36).substr(2, 5) + '-ctrl')
    });

    $('#contact-form').validate({
      rules: {
        message: {
          required: true
        },
        replyto: {
          required: true,
          email: true
        },
        fullname: {
          required: true
        }
      },
      submitHandler: function(form) {
        $form = $(form)
        $('#signtime').val(Date.now() - loaded)
        var action = $form.attr('action')
        var formarray = $form.serializeArray()
        var json = {}
        $.each(formarray, function() {
          json[this.name] = this.value || ''
        })
        $.post(action, json, function(response, status) {
          if (status === 'success' && response.success) {
            swal({
              title: 'Thank you!',
              content: {
                element: 'p',
                attributes: {
                  innerHTML: 'Your message has been successfully sent. I will try to respond as soon as I review your message. All information received will always remain confidential.',
                }
              },
              icon: 'success',
            })
            $form.trigger('reset')
          } else {
            swal({
              title: 'Oops...',
              content: {
                element: 'div',
                attributes: {
                  innerHTML: '<p>Something went wrong! Possible reason(s): ' + renderMessages(response.messages) + '</p><p>You can always send an email to <a href="mailto:contact@drnur.co.uk">contact@drnur.co.uk</a></p>',
                }
              },
              icon: 'error',
            })
          }
        })
      }
    })
});
