'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('instagram', ['$scope', 'instagram', function($scope, instagram) {
  	$scope.foto = 'Hola';

  	instagram.fetchHashTag(function(data){
  		var maximum = data.length;
  		var minimum = 0;
  		var randomnumer = Math.floor(Math.random() * (maximum - 1)) + minimum;
  		$scope.pic = data[randomnumer];
  	});
  }
  ])
  .controller('MailchimpSubscriptionCtrl', ['$log', '$resource', '$scope', function MailchimpSubscriptionCtrl($log, $resource, $scope){
    // Maneja el click al enviar la forma
    $scope.addSubscription = function (mailchimp) {
      var actions,
          MailchimpSubscription,
          params,
          url;

      // Creamos un nuevo recurso para interacturar con el API de MailChimp
      url = '//' + mailchimp.username + '.' + mailchimp.dc + '.list-manage.com/subscribe/post-json';
      params = {
        'FNAME': mailchimp.firstName,
        'LNAME': mailchimp.lastName,
        'EMAIL': mailchimp.email,
        'c': 'JSON_CALLBACK',
        'u': mailchimp.u,
        'id': mailchimp.id
      };
      actions = {
        'save': {
          method: 'jsonp'
        }
      };
      MailchimpSubscription = $resource(url, params, actions)

      // Enviamos la informacion de subscripcion a MailChimp
      MailchimpSubscription.save(
        // Se envía la información exitosamente
        function (response) {
          mailchimp.successMessage = '';
          mailchimp.errorMessage = '';

          // Almacenamos el mensaje enviado por mailchimp
          mailchimp.result = response.result;

          // Mailchimp retorna un error
          if(response.result === 'error') {
            if(response.msg) {
              // Eliminamos los numeros de errores, si hay.
              var errorMessageParts = response.msg.split(' - ');
              if (errorMessageParts.length > 1){
                errorMessageParts.shift(); // Eliminamos el numero de error
              }
              mailchimp.errorMessage = errorMessageParts.join(' ');
            } else {
              mailchimp.errorMessage = '¡Lo sentimos! Un error extraño sucedio.';
            }
          }
          // Mailchimp retorna un éxito.
          else if (response.result === 'success') {
            mailchimp.successMessage = "¡Gracias por suscribirte! Por favor confirma el correo que recibirás para completar el processo.";
          }
        },

        // Existe un error al mandar la informacion
        function (error) {
          $log.error('MailChimp Error: %o', error);
        }
      );
    }
  }
  ]);
