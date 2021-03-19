$(document).ready(function () {
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

  $.each(users, function (key, value) {
    var _tr =
      '<tr> <td>' +
      value.id +
      '</td>  <td>' +
      value.name +
      '</td>  <td>' +
      value.email +
      '</td>  <td>' +
      value.gender +
      '</td>  <td>' +
      value.status +
      '</td><td><a href="/update_user.html?id= ' +
      key +
      '" class="btn border-shadow update data-id="' +
      key +
      '"><span class="text-gradient"><i class="fas fa-pencil-alt"></i></span><a class="btn border-shadow delete" data-id="' +
      key +
      '"><span class="text-gradient"><i class="fas fa-times"></i></span></a></a></td></tr>';

    $('tbody').append(_tr);
  });
});
