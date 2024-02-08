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
        fetch(action, {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then((response) => {
          if (response.status === 404) {
            throw new Error('Cannot find the endpoint to send the message')
          }
          if (response.status === 500) {
            throw new Error('Failed to send the message due to error returned by the email provider')
          }
          return response.json()
        })
        .then((json) =>  {
          if (json.error) {
            throw new Error(json.message)
          }
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
          document.getElementById("btn-submit").disabled = false
        })
        .catch(err => {
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
          document.getElementById("btn-submit").disabled = false
        })
      }
    })
});
