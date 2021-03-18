$(document).ready(function () {
  var users = JSON.parse(localStorage.getItem("users"));

  $.each(users, function (k, v) {
    var _tr =
      "<tr> <td>" +
      k +
      "</td>  <td>" +
      v.name +
      "</td>  <td>" +
      v.email +
      "</td>  <td>" +
      v.gender +
      "</td>  <td>" +
      v.status +
      '</td><td><a href="/update_user.html" class="btn border-shadow update"><span class="text-gradient"><i class="fas fa-pencil-alt"></i></span><a class="btn border-shadow delete" data-id="usuario.id"><span class="text-gradient"><i class="fas fa-times"></i></span></a></a></td></tr>';

    $("tbody").append(_tr);
  });
});

$("#add_user").submit(function (event) {
  event.preventDefault();
  if ("localStorage" in window && window["localStorage"] !== null) {
    try {
      //Recupera valores do storage
      var users = JSON.parse(localStorage.getItem("users"));

      if (users === null) {
        //Se não tem nada, cria um array vazio
        users = [];
      }

      //Recupera os dados do form

      if ($("#radio-2").is(":checked")) {
        var gender = "Male";
      }
      if ($("#radio-3").is(":checked")) {
        var gender = "Female";
      }

      if ($("#radio-4").is(":checked")) {
        var status = "Active";
      }
      if ($("#radio-3").is(":checked")) {
        var status = "Inactive";
      }

      user = {
        name: $("#userName").val(),
        email: $("#userEmail").val(),
        gender: `${gender}`,
        status: `${status}`,
      };

      //salva os dados do form no array vazio
      users.push(user);

      //Salava o array no localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Usuário Salvo.");
      return true;
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
        alert("Sem espaço para armazenar no local Storage!");
      }
    }
  } else {
    alert(
      "Não e possivel salvar dados , pois seu browser não suporta local Storage"
    );
  }
});

$("#update_user").submit(function (event) {
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };
  $.ajax(request).done(function (response) {
    alert("Alterado com sucesso");
  });
});

//verifica se o usuário está na Home
if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };
    if (confirm("Você quer deletar o Usuário?")) {
      $.ajax(request).done(function (response) {
        alert("Usuário deletado com sucesso");
        location.reload();
      });
    }
  });
}
