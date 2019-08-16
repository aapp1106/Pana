$(document).ready(function () {
    RenderTable('datatable-recargas', [0, 1, 2,3], null, {
        "paging": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b><i class=' icon-download4 position-left'></i></b>Excel ",
                filename: "Aqui el nombre",
                titleAttr: 'Excel',
            },

        ]
    });
    tabla_Recarga = $('#datatable-recargas').DataTable();
    $("#SendMensaje").on("click", function (event) {
        EnviarMensaje();
    });
    $("#btnGuardarRecarga").on("click", function (event) {
        GuardarRecarga();
    });
    initValidadorCampos();
    GetRecargas();
});


function GetRecargas() {

    $.ajax(
        {
            url: SetUrlForQuery('/SendMensajes/GetRecargas'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataRecargas = data.Objeto;
                    tabla_Recarga.clear().draw();
                    $.each(DataRecargas, function (index, item) {

                        tabla_Recarga.row.add([
                            item.ValorRecarga,
                            item.SmsEnviados,
                            item.SmsRestantes,
                           JSONDateconverter(item.FechaReg)
                        ]).draw(false);

                      
                    });
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}




function initValidadorCampos() {
    form_Recarga = Validador("form-Recarga", {
        TxtValor: {
            required: true
        },
       
    });
    form_Mensaje = Validador("EnvioMensaje", {
        TextMensaje: {
            required: true
           
        }
    });
}

function EnviarMensaje() {
    if (form_Mensaje.form()) {
        var form_data = new FormData();
        form_data.append("Mensaje", $('#TextMensaje').val());

        var date = new Date();
        var formURL = SetUrlForQuery('/SendMensajes/EnviarMensajes');
        $.ajax(
            {
                url: formURL,
                type: "POST",
                dataType: "json",
                data: form_data,
                contentType: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                    if (!data.Is_Error) {
                        swal.fire({
                            title: "¡Enviando!",
                            text: data.Msj,
                            type: "success",
                            confirmButtonText:"Aceptar"
                        }).then((result) => {
                            if (result.value) {
                                window.location.reload(true);
                            }
                        })

                    } else {

                        SwalErrorMsj(data);


                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}

function GuardarRecarga() {
    if (form_Recarga.form()) {
        var form_data = new FormData();
        form_data.append("Recarga", $('#TxtValor').val());

        var date = new Date();
        var formURL = SetUrlForQuery('/SendMensajes/Recargar');
        $.ajax(
            {
                url: formURL,
                type: "POST",
                dataType: "json",
                data: form_data,
                contentType: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                    if (!data.Is_Error) {
                        swal.fire({
                            title: "¡Recarga!",
                            text: data.Msj,
                            type: "success"
                        }).then((result) => {
                            if (result.value) {
                                window.location.reload(true);
                            }
                        })

                    } else {

                        SwalErrorMsj(data);


                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}