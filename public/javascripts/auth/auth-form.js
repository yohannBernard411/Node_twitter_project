window.addEventListener('DOMContentLoaded', () => {
  const forgot = document.querySelector('#forgot');
  if (forgot) {
    forgot.addEventListener('click', () => {
      Swal.fire({
        title: 'Renseigner votre email',
        input: 'email',
        inputPlaceholder: 'Entrer votre adresse email'
      }).then(result => {
          const email = result.value;
          if (email){
            axios.post('/users/forgot-password', {
              email
            }).then( (response) => {
              Swal.fire({
                icon: "success",
                title: 'Vous avez reçu un email avec les instructions.'
              });
            }).catch( error => {
              Swal.fire({
                icon: "error",
                title: 'Une erreur est survenue.'
              });
            });
          }
      });
    });
  }
});
