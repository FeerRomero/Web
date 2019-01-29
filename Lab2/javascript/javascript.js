var itemNum = 6;
var inputItem = document.getElementById("newitem");
var todoList = document.querySelector('ul');


inputItem.addEventListener("keyup", function(evento) {
	evento.preventDefault();

	if(evento.keyCode === 13) {
		//Declaración de variables
		let valueItem = inputItem.value;
		let texto = document.createTextNode(valueItem);
		let span = document.createElement("SPAN");
		let nuevoElemento = document.createElement("li");
		let cbItem = document.createElement("INPUT");
		
		//Se añade al span el texto ingresado
		span.appendChild(texto);

		//Se asignan los valores al cbItem
		cbItem.setAttribute("type", "checkbox");
		cbItem.setAttribute("name", "todo");
		cbItem.setAttribute("value", itemNum);

		//Se añaden los elementos de cbItem y span al elemento de tipo "li"
		nuevoElemento.appendChild(cbItem);
		nuevoElemento.appendChild(span);

		//Se añade el nuevoElemento a la lista general
		document.getElementById("todo_list").appendChild(nuevoElemento);
		itemNum++;
	}
});


//FALTA HACER LO DE CAMBIAR LA CLASE DEL SPAN CUANDO LE DAN CLICK AL CHECKBOX CORRESPONDIENTE.
todoList.addEventListener('click', function(evento) {
	if (evento.target.tagName === 'LI') {
		evento.target.classList.toggle('done');
	}
}, false);