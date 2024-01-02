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

    function renderErrorMessage (response) {
      return `<br><small>${response.message}</small>`
    }

    $('#contact-form').validate({
      rules: {
        message: {
          required: true
        },
        replyTo: {
          required: true,
          email: true
        },
        fullName: {
          required: true
        }
      },
      submitHandler: function(form) {
        $form = $(form)
        const action = $form.attr('action')
        const formarray = $form.serializeArray()
        let request = {}
        $.each(formarray, function() {
          request[this.name] = this.value || ''
        })
        document.getElementById("btn-submit").disabled = true
        $.post(action, JSON.stringify(request), function(response, status) {
          if (status === 'success') {
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
          }
        })
        .fail((xhr, status, error) => {
          if (xhr.status === 500) {
            swal({
              title: 'Oops...',
              content: {
                element: 'div',
                attributes: {
                  innerHTML: '<p>Something went wrong!</p><p>You can always send an email to <a href="mailto:contact@drnur.co.uk">contact@drnur.co.uk</a></p>',
                }
              },
              icon: 'error',
            })
          } else {
            swal({
              title: 'Oops...',
              content: {
                element: 'div',
                attributes: {
                  innerHTML: '<p>Something went wrong! Possible reason(s): ' + renderErrorMessage(xhr.responseJSON) + '</p><p>You can always send an email to <a href="mailto:contact@drnur.co.uk">contact@drnur.co.uk</a></p>',
                }
              },
              icon: 'error',
            })
          }
        })
        .always(function() {
          document.getElementById("btn-submit").disabled = false
        })
      }
    })
});
