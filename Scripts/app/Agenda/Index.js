var tabla_Registrar = null;
var InfoRegistrar = [];
var form_Registrar = [];
var editando = false;
var reuniones = [];
var DataAgenda = [];


$(document).ready(function () {

    RenderTable('datatable-calendario', [0, 1, 2, 3, 4, 5, 6, 7], null, {
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
                filename: "Agenda",
                titleAttr: 'Excel',
            },

        ]
    });
    RenderTable('datatable-Directorio', [0, 1, 2, 3, 4], null, {
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
                filename: "Directorio",
                titleAttr: 'Excel',
            },

        ]
    });
    tabla_calendario = $('#datatable-calendario').DataTable();
    tabla_Directorio = $('#datatable-Directorio').DataTable();



    cargarReuniones();
    $("#cargartabla").click(function () {
        cargartablaeventos();
    })
    $("#DirectoioBtn").click(function () {
        CargarModal();
    })


    form_RegistrarDir = Validador("RegistrarDirectorio", {
        NombreDir: {
            required: true,
            StringEmpty: true
        }
    }
    );

});

function cargartablaeventos() {
    tabla_calendario.clear().draw();
    var escogido = $("#Mes").val();
    var cont = 0;
    $.each(DataAgenda, function (index, item) {
        date = JSONDateconverter(item.Fecha)
        var y = date.split('-')[0];
        var m = (date.split('-')[1]) - 1;
        var d = date.split('-')[2];



        if (item.NombreEstado != "RECHAZADA") {
            var hora = moment(item.Hora).format('LT');
            hora = moment(hora, "HH:mm").format("hh:mm A");

            var obse = "";
            if (item.Observacion != null)
                obse = item.Observacion;
            else
                obse = "Sin observación";

            if (m == escogido) {
                cont = cont + 1;
                tabla_calendario.row.add([
                    item.NombreEstado,
                    item.Nombre,
                    item.Direccion,
                    item.Celular,
                    moment(item.Fecha).format('LL'),
                    hora,
                    item.Duraccion + " minutos",
                    obse


                ]).draw(false);
            }

        }

    })
    if (cont == 0) {
        swal.fire({
            title: "Atención",
            text: "No existen citas creadas para el mes.",
            type: "warning"
        });
    }


}

function PintarCalendar() {
    //ShowLoading();

    /* initialize the external events
     -----------------------------------------------------------------*/
    $('#external-events div.external-event').each(function () {

        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 1111999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });
    });


    /* initialize the calendar
     -----------------------------------------------------------------*/
    $('#calendar').fullCalendar({
        lang: 'es',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'

        },
        displayEventTime: false,
        editable: false,
        events: reuniones,
        eventClick: function (item) {
            var DataLocal = DataAgenda.find(function (elemt) {
                return elemt.IdAgenda == item.id;
            })
            $("#ShowInfo div").remove();

            if (DataLocal.NombreEstado == "CONFIRMADA") {
                var estado = 'label-primary">';
            } else if (DataLocal.NombreEstado == "PENDIENTE") {
                var estado = 'label-warning">';
            }

            var hora = moment(DataLocal.Hora).format('LT');

            var hora = moment(hora, "HH:mm").format("hh:mm A");

            var obse = "";
            if (DataLocal.Observacion != null)
                obse = DataLocal.Observacion;
            else
                obse = "Sin observación";
            var parametros = '<div class="modal-dialog modal-xs" style="z-index:0">' +
                '<div class="modal-content">' +
                '<div class="modal-header text-left">' +
                '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>' +
                '<h3>Informacion Reunión</h3>' +
                ' </div>' +
                '<div class="modal-body">' +
                '<form id="form-candidato">' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Estado:</strong> <span class="label ' + estado + DataLocal.NombreEstado + '</span></label>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Nombre:</strong> ' + DataLocal.Nombre + '</label>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Direccion de encuentro:</strong> ' + DataLocal.Direccion + '</label>' +
                '</div>' +
                ' </div>' +
                '</div>' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Celular:</strong> ' + DataLocal.Celular + '</label>' +
                '</div>' +
                ' </div>' +
                '</div>' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Fecha:</strong> ' + moment(DataLocal.Fecha).format('LL') + '</label>' +
                '</div>' +
                ' </div>' +
                '</div>' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Hora:</strong> ' + hora + '</label>' +


                '</div>' +
                ' </div>' +
                '</div>' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Duración:</strong> ' + DataLocal.Duraccion + ' minutos</label>' +
                '</div>' +
                ' </div>' +
                '</div>' +

                '<div class="row">' +
                '<div class="col-sm-12">' +
                '<div class="form-group">' +
                '<label class="control-label text-right"><strong>Observación:</strong> ' + obse + '</label>' +
                '</div>' +
                ' </div>' +
                '</div>' +

                '<input type="hidden" id="HidC" name="HidC" class="form-control">' +
                '</form>' +
                '</div>' +

                '<div class="modal-footer text-center">' +
                '<button type="button" class="btn btn-white" data-dismiss="modal">Cerrar</button>' +
                '</div>' +
                '</div>' +
                '</div>';

            $('#ShowInfo').append(parametros);
            $('#ShowInfo').modal('show');

        }


    });
}



function cargarReuniones() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $.ajax(
        {
            url: SetUrlForQuery('/Agenda/GetAgenda'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    DataAgenda = data.Objeto;
                    $.each(DataAgenda, function (index, item) {
                        date = JSONDateconverter(item.Fecha)
                        y = date.split('-')[0];
                        m = (date.split('-')[1]) - 1;
                        d = date.split('-')[2];
                        if (item.NombreEstado != "RECHAZADA") {
                            reuniones.push({
                                title: 'Reunion con ' + item.Nombre,
                                start: new Date(y, m, d),
                                startEditable: false,
                                color: '#2eb1fc',
                                id: item.IdAgenda
                            })
                        }

                    })
                    PintarCalendar();
                    //reuniones = [
                    //    {
                    //        title: 'All Day Event',
                    //        start: new Date(y, m, 1)
                    //    },
                    //    {
                    //        title: 'Long Event',
                    //        start: new Date(y, m, d - 5),
                    //        end: new Date(y, m, d - 2)
                    //    },
                    //    {
                    //        id: 999,
                    //        title: 'Repeating Event',
                    //        start: new Date(y, m, d - 3, 16, 0),
                    //        allDay: false
                    //    },
                    //    {
                    //        id: 999,
                    //        title: 'Repeating Event',
                    //        start: new Date(y, m, d + 4, 16, 0),
                    //        allDay: false
                    //    },
                    //    {
                    //        title: 'Meeting',
                    //        start: new Date(y, m, d, 10, 30),
                    //        allDay: false
                    //    },
                    //    {
                    //        title: 'Lunch',
                    //        start: new Date(y, m, d, 12, 0),
                    //        end: new Date(y, m, d, 14, 0),
                    //        allDay: false
                    //    },
                    //    {
                    //        title: 'Birthday Party',
                    //        start: new Date(y, m, d + 1, 19, 0),
                    //        end: new Date(y, m, d + 1, 22, 30),
                    //        allDay: false
                    //    },
                    //    {
                    //        title: 'Click for Google',
                    //        start: new Date(y, m, 28),
                    //        end: new Date(y, m, 29),
                    //        url: 'http://google.com/'
                    //    }
                    //]
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function CargarModal() {
    $('#Directorio').modal('show');
    CargarTablaDirectorio();
}
var ListaBarrios = [];
var Directorio = [];
function CargarTablaDirectorio() {

    $.ajax(
        {
            url: SetUrlForQuery('/Directorio/GetDirectorio'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    Directorio = data.Objeto.Directorio;
                    ListaBarrios = data.Objeto.Barrios;
                    CargarBarrios();
                    tabla_Directorio.clear().draw();


                    $.each(Directorio, function (index, item) {


                        tabla_Directorio.row.add([
                            item.Nombre,
                            item.Celular + " - " + item.Celular2,
                            item.Barrio,
                            item.EntregaCarpeta == true ? "SI" : "NO",
                            "<div class='input-group-append show'>" +
                            "<a style='color:#007BFF; ' data-toggle='dropdown' class=' dropdown-toggle' type='button aria-expanded='true'>...</a>" +
                            "<ul class='dropdown-menu float-right ' x-placement='bottom-start' style='position: absolute; top: 35px; left: 1202px; will-change: top, left;'>" +
                            "<li><a onclick='EditarDire(" +index + ")'><i style='font-size:15px;' class='text-success fa fa-pencil-square-o '></i> <span style='font-size:15px;'>Editar</span></a></li>" +
                            "<li><a onclick=DeleteDire(" + item.IdDirectorio + ")><i style='font-size:15px;' class='text-danger fa fa-times'></i> <span style='font-size:15px;'>Eliminar</span></a></li>" +
                            "</ul>" +
                            "</div>"


                        ]).draw(false);


                    });
                    CloseLoading();
                } else {
                    CloseLoading();
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });
}


function CargarBarrios() {


    var HtmlBarrio = "";
    HtmlBarrio += "<option value=''>Seleccionar</option>";
    $.each(ListaBarrios, function (index, item) {
        HtmlBarrio += "<option value=" + item.IdBarrio + ">" + item.Barrio + "</option>";
    })
    $('#BarrioDir').html(HtmlBarrio);
    $('#BarrioDir').select2({
        dropdownParent: $('#Directorio')
    });

    BarrioBool = true;





}



function HabilitarBotones() {
    visible_elemento('NuevoDir')
}

function SaveDirectorio() {

    if (form_RegistrarDir.form()) {
        ShowLoading();
        var form_data = $("#RegistrarDirectorio").serialize();


        //var EntregarBool = false;
        //if ($('#IsEntregar').is(":checked")) {
        //    EntregarBool = true;
        //}
        //form_data.append('Parametros', JSON.stringify([{ "Barrio": $('#BarrioDir').val(), "Celular": $('#CelularDir').val(), "EntregaCarpeta": EntregarBool, "Nombre": $('#NombreDir').val()}]));


        $.ajax(
            {
                url: SetUrlForQuery('/Directorio/InsertRegistrar'),
                type: "POST",
                dataType: "json",
                data: form_data,
                success: function (data) {
                    if (!data.Is_Error) {
                        CloseLoading();
                        swal.fire({
                            title: data.Html == "True" ? "¡Modificado!":"¡Creado!",
                            text: data.Msj,
                            confirmButtonColor: "#66BB6A",
                            type: "success",
                            closeOnConfirm: true,
                            timer: 20000
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    location.reload(true);


                                }
                            });
                    } else {
                        CloseLoading();
                        swal({
                            title: "¡Atención!",
                            text: data.Msj,
                            confirmButtonColor: "#66BB6A",
                            type: "warning"

                        })
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    CloseLoading();
                    console.log(errorThrown);

                }
            });

    }

}


function EditarDire(index) {
    //$("#edit_Contact_" + index).on("click", function () {
    var item = Directorio[index];
    editando = true;
    $("#IsUpdate").val(editando);
    $("#Hid").val(item.IdDirectorio);
    $("#NombreDir").val(item.Nombre);
    $("#CelularDir").val(item.Celular);
    $("#Celular2").val(item.Celular2);

    $("#BarrioDir").val(item.IdBarrio).trigger('change');



    if (item.EntregaCarpeta) {
        $("#IsEntregar").prop('checked', false).trigger("click");
       
    } else {
        $("#IsEntregar").prop('checked', true).trigger("click");
      
    }
    visible_elemento('NuevoDir');
   
}

function DeleteDire(id) {

    $.ajax(
        {
            url: SetUrlForQuery('/Directorio/DeleteDirectorio?Id=' + id),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {

                    swal.fire({
                        title: "¡Eliminado!",
                        text: data.Msj,
                        type: "success"
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                window.location.reload(true);


                            }
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

