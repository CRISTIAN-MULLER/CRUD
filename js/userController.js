$('#add_user').submit(function (event) {
  event.preventDefault();
  if ('localStorage' in window && window['localStorage'] !== null) {
    try {
      //Recupera os dados do form
      //Recupera valores do storage
      var users = JSON.parse(localStorage.getItem('users'));
      var sequence = JSON.parse(localStorage.getItem('sequence'));

      if (users === null) {
        //Se não tem nada, cria um array vazio
        users = [];
      }

      if (sequence === null) {
        //Se não tem nada, cria um array vazio
        sequence = 1;
      }

      if ($('#radio-2').is(':checked')) {
        var gender = 'Male';
      }
      if ($('#radio-3').is(':checked')) {
        var gender = 'Female';
      }

      if ($('#radio-4').is(':checked')) {
        var status = 'Active';
      }
      if ($('#radio-3').is(':checked')) {
        var status = 'Inactive';
      }

      user = {
        id: sequence,
        name: $('#userName').val(),
        email: $('#userEmail').val(),
        gender: `${gender}`,
        status: `${status}`,
      };

      //salva os dados do form no array vazio
      users.push(user);

      //Salava o array no localStorage
      localStorage.setItem('users', JSON.stringify(users));
      //atualiza a seuquencia
      localStorage.setItem('sequence', sequence + 1);
      location.reload();
      alert('Usuário Salvo.');

      return true;
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Sem espaço para armazenar no local Storage!');
      }
    }
  } else {
    alert(
      'Não e possivel salvar dados , pois seu browser não suporta local Storage'
    );
  }
});

$('#update_user').submit(function (event) {
  event.preventDefault();
  console.log(users);
  var users = JSON.parse(localStorage.getItem('users'));

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var id = parseInt(urlParams.get('id'));

  (users[id].name = $('#name').val()), (users[id].email = $('#email').val());

  if ($('#radio-2').is(':checked')) {
    users[id].gender = 'Male';
  }
  if ($('#radio-3').is(':checked')) {
    users[id].gender = 'Female';
  }

  if ($('#radio-4').is(':checked')) {
    users[id].status = 'Active';
  }
  if ($('#radio-5').is(':checked')) {
    users[id].status = 'Inactive';
  }
  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
});

//verifica se o usuário está na Home
$(document).ready(function () {
  if (window.location.pathname == '/') {
    $('.delete').click(function () {
      var idToRemove = $(this).attr('data-id');

      if (confirm('Você quer deletar o Usuário?')) {
        var users = JSON.parse(localStorage.getItem('users'));
        delete users[idToRemove];
        var sliced = users.filter(function (a) {
          return typeof a !== 'undefined';
        });

        // Salva no localStorage
        localStorage.setItem('users', JSON.stringify(sliced));

        location.reload();
      }
    });
  }
});
