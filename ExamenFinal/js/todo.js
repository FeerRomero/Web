var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var todos = document.querySelectorAll("input[type=checkbox]");


function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  
  console.log(completed)
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://exemenwebfinalfer.herokuapp.com/todos/' + id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}




function loadTodos() {
  $.ajax({
    url: 'https://exemenwebfinalfer.herokuapp.com/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)
      let new_html = ""
      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        // algo asi:
        if (data[i].completed == true) {
          new_html += `
          <li><input type="checkbox" name="todo" value="${data[i]._id}" checked><span>${data[i].description}</span></li>
          `
        }
        else
        {
          new_html += `
          <li><input type="checkbox" name="todo" value="${data[i]._id}"><span>${data[i].description}</span></li>
          `
        }
      }
      $("#unfinished-list").append(new_html)
      todos = document.querySelectorAll("input[type=checkbox]");
      console.log(todos.length)
      todos.forEach(function(element) {
        console.log("Se añadio listener")
        element.addEventListener('change', function() {
          if (this.checked) {
            updateTodo(element.getAttribute('value'),true)
          }
          else
          {
            updateTodo(element.getAttribute('value'),false)
          }
        })
    });
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://exemenwebfinalfer.herokuapp.com/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        new_html=``
        $("#unfinished-list").html(new_html)
        loadTodos()     
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo(todoText, completed, html) {
  
}