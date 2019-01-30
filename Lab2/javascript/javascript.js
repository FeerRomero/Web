var itemNum = 6;
var inputItem = document.getElementById("newitem");
var todoList = document.getElementById("todo_list");

inputItem.addEventListener("keyup", function(evento) {
	evento.preventDefault();

	if(evento.keyCode === 13) {
		//Declaración de variables
		let valueItem = inputItem.value;
		let texto = document.createTextNode(valueItem);
		let span = document.createElement("SPAN");
		let nuevoElemento = document.createElement("li");
		let cbItem = document.createElement("INPUT");

		if(valueItem == "") {
			window.alert("Nombre de actividad invalido.")
		}
		else
		{
			//Se añade al span el texto ingresado
			span.appendChild(texto);

			//Se asignan los valores al cbItem
			cbItem.setAttribute("type", "checkbox");
			cbItem.setAttribute("name", "todo");
			cbItem.setAttribute("value", itemNum);
			cbItem.setAttribute("onchange", "crossOut(this)");

			//Se añaden los elementos de cbItem y span al elemento de tipo "li"
			nuevoElemento.appendChild(cbItem);
			nuevoElemento.appendChild(span);

			//Se añade el nuevoElemento a la lista general
			document.getElementById("todo_list").appendChild(nuevoElemento);
			itemNum++;

			//Limpiar el campo de texto
			inputItem.value="";
		}
	}
});


function crossOut(checkbox) {
	//Declaración de variables
	let myTodoItems = todoList.getElementsByTagName('li');
	let iPosition = checkbox.value;
	let spanElement = myTodoItems[iPosition-1].childNodes[1];
	
	//Revisar si fue check o uncheck
	if (checkbox.checked) {
		//Añadir al span la clase "done"
		spanElement.classList.add("done");
	}
	else
	{
		//Eliminar del span la clase "done"
		spanElement.classList.remove("done");
	}
};
