
$(document).ready(function () {
	Get_Barrios();
	$("#btnGuardarRegistrar").on("click", function () { SaveRegistrar(); });
	form_RegistrarFirma = Validador("form_Registrar", {
        Cedula: {
            required: true,
            StringEmpty: true
		},
		name: {
            required: true,
            StringEmpty: true
        },
        Celular: {
            required: true,
            StringEmpty: true
        },
        Barrio: {
            required: true,
            StringEmpty: true
        }
    }
    );



});


function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}


function SaveRegistrar() {

	if (form_RegistrarFirma.form()) {
	
		var form_data = new FormData();
		var formURL = 'http://167.86.106.173:8069/Registrar/InsertRegistrarPage';
		var Params = { 
			Cedula: $('#Cedula').val(), 
			Nombre: $('#name').val(), 
			Celular: $('#Celular').val(), 
			Barrio: $('#Barrio').val(), 
			Referente : 2019,
			UserReg : 2019,
		};

		form_data.append('Parametros', JSON.stringify(Params));
		$.ajax(
		{
			url: formURL,
			content: "application/json; charset=utf-8",
			type: "POST",
			dataType: "json",
			data: form_data,
			contentType: false,
			processData: false,
			success: function (data) {
				if (!data.IsError) {
					swal.fire({
						title: "¡Creado!",
						text: "Se ha creado correctamente.",
						type: "success"
					})
					.then((willDelete) => {
						if (willDelete) {
							location.reload(true);
						}
					});
				}
				else {
					Swal.fire(
						'¡Atención!',
						data.Msj,
						'warning'
					)
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert("error")
				console.log(errorThrown);
			}
		});
		
	}else {
		Swal.fire(
			'¡Atención!',
			'llene todos los campos',
			'warning'
		  )
	}
}



function Get_Barrios() {
    var formURL = 'http://167.86.106.173:8069/ConfiCampana/GetBarrios';
    $.ajax(
        {
            url: formURL,
            content: "application/json; charset=utf-8",
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlMunicipio = "";
                    HtmlMunicipio += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        if(item.Co_Depar == 20){
							HtmlMunicipio += "<option value=" + item.IdBarrio + ">" + item.Barrio + "</option>";
						}
                    })
					$('#Barrio').html(HtmlMunicipio);
					$('#Barrio').select2();
                } else {
                    alert(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

