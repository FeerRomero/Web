$.ajax({
	url : "data/grammys.json",
	type : "GET",
	dataType : "json",
	success : function (data) {
		let new_html = "";
		let myObj = data["fields"]
		new_html += `
				<option value= "-1" class="hide_option" selected="selected">
					Select Category
				</option>
			`;
		for(let i = 0; i < myObj.length; i++) {
			new_html += `
				<option value= "${myObj[i].field_id}">
					${myObj[i].field}
				</option>
			`;		
		}
		
		$("#category_types").append(new_html);
		loadCategoryInfo();
	},
	error : function(error_msg) {
		console.log(error_msg);
	}
});

function loadCategoryInfo() {
	$.ajax({
		url : "data/grammys.json",
		type : "GET",
		dataType : "json",
		success : function (data) {
			$("#category_types").on('change', function(categories) {
				//Limpia el contenido de la página
				let new_html1 = "";
				$(".nominees_section").html(new_html1);
				let myObj = data["fields"];
				let fieldId = $(this).val();
				for(let i = 0; i < myObj.length; i++) {
					if(fieldId == myObj[i].field_id) {
						new_html1 += `<h2>${myObj[i].field}</h2>`;
						
						if(myObj[i].description == null)
						{
							new_html1 += `<p></p>`;
						}
						else
						{
							new_html1 += `
							<p class="description">
								${myObj[i].description}
							</p>
							`;	
						}
						let listCategorias = myObj[i].categories;
						
						//Itera a través de las categorías
						for(let j = 0; j < listCategorias.length; j++) {
							new_html1 += `<div class="category_division">`;	
							let winner = listCategorias[j].winner_id;
							new_html1 += `
							<h3>
								${listCategorias[j].category_name}
							</h3>
							<p>
								${listCategorias[j].description}
							</p>
							`;
							let listNominees = listCategorias[j].nominees;
							for(let k = 0; k < listNominees.length; k++) {
								new_html1 += `
								<div class = "song_candidate"> 
								`;
								if(winner == k) {
									new_html1 += `
									<fieldset>
										<p class="song winner wrap_text">
											${listNominees[k].nominee}
										</p>
										<span>
											WINNER!
										</span>
										<p>
											${listNominees[k].artist}
										</p>
										<p>
											${listNominees[k].info}
										</p>	
										</fieldset>`;	
								}
								else
								{
									new_html1 += `
									<p class="song">
									${listNominees[k].nominee}
									</p>
									<p>
									${listNominees[k].artist}
									</p>
									<p>
									${listNominees[k].info}
									</p>
									`;
								}
								new_html1 += `</div>`;
							}
						new_html1 += `</div>`;
						}
					}
				}			
			$(".nominees_section").append(new_html1);
			});
		},
		error: function (error_msg) {
			console.log(error_msg)
		}
	});
}