var tabla_Registrar = null;
var InfoRegistrar = [];
var form_Registrar = [];
var editando = false;
var BarrioBool = false;
var PuestoBool = false;
var UserRefBool = false;
var InfoCampaña = [];
var ReferenciaBool = false;
var BanderaChangeBarrio = false;
$(document).ready(function () {



    //ShowLoading();
    CargarCampaña();
    $("#btnnuevouContacto").on("click", function () {
        Get_Puestos();
        Get_Barrios();
        ValidarInformacionContactoACapturar();

    });
    RenderTable('datatable-Registrar', [0, 1, 2, 3, 4, 5], null, {
        "paging": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b><i class=' fa fa-file-excel-o position-left'></i></b> Excel ",
                filename: "Base datos",
                titleAttr: 'Excel',
            },

        ]
    });
    tabla_Registrar = $('#datatable-Registrar').DataTable();

    RenderTable('datatable_PuestosVotacion', [0, 1], null, {
        "paging": true,
        "info": true,
        "searching": true,
        //dom: 'frtip',

    });
    tabla_PuestosVotacion = $('#datatable_PuestosVotacion').DataTable();



    RenderTable('datatable-Busquedaavanzada', [0, 1, 2, 3, 4, 5, 6,7,8], null, {
        "paging": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b><i class=' fa fa-file-excel-o position-left'></i></b> Excel ",
                filename: "Busqueda avanzada",
                titleAttr: 'Excel',
            },

        ]
    });
    tabla_Busquedaavanzada = $('#datatable-Busquedaavanzada').DataTable();

    var elem = document.querySelector('#VotoDuro');
    var switchery = new Switchery(elem, { color: '#007BFF' });



    var mem = $('#Fechs .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        dropdownParent: $('#mdl-Contact')
    });

    $("#mdl-Contact").on('hidden.bs.modal', function () {
        editando = false;
        document.getElementById("form-Registrar").reset();
    });

    $("#referen").on("click", function () { CambiarReferente(); });
    $("#BarrioChange").on("click", function () { CambiarBarrio(); });
    Get_Departamentos();
    Get_Ciudades();
    Get_Puestos();
    $('#BoolActive').html("NO");

    OcultarOpciones();
    $("#btnGuardarRegistrar").on("click", function () { SaveContactOrUpdate(); });
    initValidadorRegistrar()

    $("#VotoDuro").on('change', function () {
        var CheckActivo = $("#VotoDuro").is(':checked');
        if (CheckActivo)
            $('#BoolActive').html("SI");
        else
            $('#BoolActive').html("NO");
    });

    CargarDataContacto();

    //Get_Contactos();
    EventosClick();


    $('#TotConBus').html(0);

    $("#ResetB").on("click", function () { resetear(); });
    $("#tab2").on("click", function () { resetear(); });
    $("#tab3").on("click", function () { resetear(); });




    document.getElementById("Referente1").style.display = "none";
    CargarTablaPuestosVotacion();
    esconde_elemento('DivMunicipio');
});


function CargarTablaPuestosVotacion() {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/GetPuestosDeVotacionYCantidad'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    Puestos = data.Objeto;
                    tabla_PuestosVotacion.clear().draw();
                    var nom;

                    $.each(Puestos, function (index, item) {
                        if (item.puesto == "" || item.puesto == "0" || item.puesto == null) {
                            nom = "Sin Puesto"
                        } else {
                            nom = item.nombre
                        }

                        tabla_PuestosVotacion.row.add([
                            nom,
                            item.cantidad


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


function CambiarReferente() {
    if (ReferenciaBool == true) {
        ReferenciaBool = false;
        $("#Referente1").val("");
        document.getElementById("Referente1").style.display = "none";
        document.getElementById("ReferenteN").style.display = "block";


    }
    else {
        ReferenciaBool = true;
        $("#Referente").val("0").trigger('change');
        document.getElementById("Referente1").style.display = "block";
        document.getElementById("ReferenteN").style.display = "none";

    }

}
function CambiarBarrio() {
    if (BanderaChangeBarrio == true) {

        visible_elemento('DivSelectBarrio')
        esconde_elemento('DivInputBarrio')
        BanderaChangeBarrio = false;

    }
    else {

        visible_elemento('DivInputBarrio')
        esconde_elemento('DivSelectBarrio')
        BanderaChangeBarrio = true;
    }

}
function ValidarInformacionContactoACapturar() {
    if (InfoCampaña[0].CodMunicipio != "26") {
        document.getElementById("BarrioContacto").style.display = "none";
    }
    if (InfoCampaña[0].CodDepar != "20") {
        document.getElementById("PuestoContacto").style.display = "none";
    }
    document.getElementById("Referente1").style.display = "none";

}

function CargarCampaña() {

    $.ajax(
        {
            url: SetUrlForQuery('/Usuarios/Get_ConfiCampana'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {

                    InfoCampaña = data.Objeto;
                } else {

                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log(errorThrown);
            }
        });
}

function resetear() {
    document.getElementById("form-Registrar").reset();
    form_Registrar.resetForm();
    $("#Barrios").select2("val", "");
    $("#Puesto").select2("val", "");
    $("#Barrios").select2("val", "0");


    if (!$("VotoDuro").is(":checked")) {
        document.getElementById("VotoDuro").checked = false;
        //document.getElementById('VotoDuro').click();

        $("#VotoDuro").prop("checked", false);
        $('#BoolActive').html("NO");
    }

}

function SaveCultura() {


    ShowLoading();
    var form_data = new FormData();
    var formURL = '/Agenda/InsertRegistrar';
    form_data.append('Parametros', JSON.stringify([{ "IsBusy": false, "Nombre": "wilder" }]));


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
                    CloseLoading();
                    swal({
                        title: "¡Creado!",
                        text: data.Mensaje,
                        confirmButtonColor: "#66BB6A",
                        type: "success",
                        closeOnConfirm: true,
                        timer: 20000
                    },
                        function (isconfirm) {
                            if (isconfirm) {
                                location.href = "/Cultura";
                            }
                        });
                } else {
                    CloseLoading();
                    swal({
                        title: "¡Atención!",
                        text: data.Mensaje,
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

function EventosClick() {
    $("#Puestovotacion").on('change', function () {
        var Consulta = $("#Puestovotacion").val();
        ConsultaAvanzada(Consulta, 1);
    });
    $("#Referentes").on('change', function () {
        var Consulta = $("#Referentes").val();
        ConsultaAvanzada(Consulta, 2);
    });
    $("#Departamento").on('change', function () {
        var Consulta = $("#Departamento").val();
        ConsultaAvanzada(Consulta, 3);
    });
    $("#Municipio").on('change', function () {
        var Consulta = $("#Municipio").val();
        ConsultaAvanzada(Consulta, 4);
    });
    $("#Barrio").on('change', function () {
        var Consulta = $("#Barrio").val();
        ConsultaAvanzada(Consulta, 5);
    });
    $("#Comunas").on('change', function () {
        var Consulta = $("#Comunas").val();
        ConsultaAvanzada(Consulta, 6);
    });
    $("#Votoduro").on('change', function () {
        var Consulta = $("#Votoduro").val();
        ConsultaAvanzada(Consulta, 7);
    });
}

function ConsultaAvanzada(query, Tag) {
    var Resultado = [];
    switch (Tag) {
        case 1:
            Resultado = ContactosRegistrados.filter(function (elemt) {
                if (parseInt(query) > 0)
                    return parseInt(elemt.IdPuesto) == parseInt(query);
                else
                    return elemt.IdPuesto == null;
            })
            break;
        case 2:
            Resultado = ContactosRegistrados.filter(function (elemt) {
                if (query == "Todos") {
                    return ContactosRegistrados;
                }
                else if (parseInt(query) > 0) {
                    return elemt.Referente == query;
                } else if (elemt.Referente1 == "" && elemt.Referente == 0) {
                    return elemt.Referente1 == query;
                } else if (elemt.Referente == 0) {
                    return elemt.Referente1 == query;
                }


            })
            break;
        case 3:
            Resultado = ContactosRegistrados.filter(function (elemt) {
                if (query != "null")
                    return elemt.Departamentos == query;
                else
                    return elemt.Departamentos == null;

            })
            break;
        case 4:
            Resultado = ContactosRegistrados.filter(function (elemt) {
                if (query != "null")
                    return elemt.Municipio == query;
                else
                    return elemt.Municipio == null;
            })
            break;
        case 5:
            Resultado = ContactosRegistrados.filter(function (elemt) {
                if (parseInt(query) > 0)
                    return elemt.IdBarrio == query;
                else
                    return elemt.IdBarrio == null;
            })
            break;
        case 6:
            Resultado = ContactosRegistrados.filter(function (elemt) {
                if (parseInt(query) > 0)
                    return elemt.Comuna == query;
                else
                    return elemt.Comuna == null;
            })
            break;
        case 7:
            Resultado = ContactosRegistrados.filter(function (elemt) {
                return elemt.VotoDuro.toString() == query;
            })
            break;
        default:
    }

    tabla_Busquedaavanzada.clear().draw();



    $('#TotConBus').html(Resultado.length);

    var votodu;
    var referente;
    var lugar = "";
    $.each(Resultado, function (index, item) {




        if (item.VotoDuro)
            votodu = "Si"
        else
            votodu = "No"

        if (item.Referente == 0) {
            referente = item.Referente1;

        } else {
            referente = item.NombreRef + " " + item.ApellidoRef;
        }

        if (item.Departamentos == null && item.Municipio == null && item.DirePuesto == null) {
            lugar = "";

        } else {
            lugar = item.Departamentos + " - " + item.Municipio + " - " + item.DirePuesto;
        }



        tabla_Busquedaavanzada.row.add([
            item.Cedula,
            item.Nombre,
            item.Celular,
            lugar,
            item.Mesa,
            referente,
            votodu,
            item.Barrio,
            ""


        ]).draw(false);
    });
}


function OcultarOpciones() {
    document.getElementById("Puestov").style.display = "none";
    document.getElementById("Referen").style.display = "none";
    document.getElementById("Dep").style.display = "none";
    document.getElementById("muni").style.display = "none";
    document.getElementById("barr").style.display = "none";
    document.getElementById("comun").style.display = "none";
    document.getElementById("vo").style.display = "none";
    $("#OpcionEscogida1").on("click", function () {
        $('#CriterioCon').html("Puesto de votacion");
        document.getElementById("Puestov").style.display = "block";
        document.getElementById("Referen").style.display = "none";
        document.getElementById("Dep").style.display = "none";
        document.getElementById("muni").style.display = "none";
        document.getElementById("barr").style.display = "none";
        document.getElementById("comun").style.display = "none";
        document.getElementById("vo").style.display = "none";
    });

    $("#OpcionEscogida2").on("click", function () {
        $('#CriterioCon').html("Referente");
        document.getElementById("Puestov").style.display = "none";
        document.getElementById("Referen").style.display = "block";
        document.getElementById("Dep").style.display = "none";
        document.getElementById("muni").style.display = "none";
        document.getElementById("barr").style.display = "none";
        document.getElementById("comun").style.display = "none";
        document.getElementById("vo").style.display = "none";
    });

    $("#OpcionEscogida3").on("click", function () {
        $('#CriterioCon').html("Departamento");
        document.getElementById("Puestov").style.display = "none";
        document.getElementById("Referen").style.display = "none";
        document.getElementById("Dep").style.display = "block";
        document.getElementById("muni").style.display = "none";
        document.getElementById("barr").style.display = "none";
        document.getElementById("comun").style.display = "none";
        document.getElementById("vo").style.display = "none";

    });

    $("#OpcionEscogida4").on("click", function () {
        $('#CriterioCon').html("Municipio");
        document.getElementById("Puestov").style.display = "none";
        document.getElementById("Referen").style.display = "none";
        document.getElementById("Dep").style.display = "none";
        document.getElementById("muni").style.display = "block";
        document.getElementById("barr").style.display = "none";
        document.getElementById("comun").style.display = "none";
        document.getElementById("vo").style.display = "none";

    });

    $("#OpcionEscogida5").on("click", function () {
        $('#CriterioCon').html("Barrio");
        document.getElementById("Puestov").style.display = "none";
        document.getElementById("Referen").style.display = "none";
        document.getElementById("Dep").style.display = "none";
        document.getElementById("muni").style.display = "none";
        document.getElementById("barr").style.display = "block";
        document.getElementById("comun").style.display = "none";
        document.getElementById("vo").style.display = "none";
        Get_Barrios();
    });

    $("#OpcionEscogida6").on("click", function () {
        $('#CriterioCon').html("Comunas");
        document.getElementById("Puestov").style.display = "none";
        document.getElementById("Referen").style.display = "none";
        document.getElementById("Dep").style.display = "none";
        document.getElementById("muni").style.display = "none";
        document.getElementById("barr").style.display = "none";
        document.getElementById("comun").style.display = "block";
        document.getElementById("vo").style.display = "none";
    });

    $("#OpcionEscogida7").on("click", function () {
        $('#CriterioCon').html("Votoduro");
        document.getElementById("Puestov").style.display = "none";
        document.getElementById("Referen").style.display = "none";
        document.getElementById("Dep").style.display = "none";
        document.getElementById("muni").style.display = "none";
        document.getElementById("barr").style.display = "none";
        document.getElementById("comun").style.display = "none";
        document.getElementById("vo").style.display = "block";
    });
}

function initValidadorRegistrar() {
    form_Registrar = Validador("form-Registrar", {
        TxtNit: {
            required: true,
            StringEmpty: true
        },
        txtNombre: {
            required: true,
            StringEmpty: true
        },
        txtCelular: {
            required: true,
            StringEmpty: true
        }
    }
    );
}

function SaveContactOrUpdate() {
    if (!editando)
        SaveRegistrar();
    else
        UpdateRegistrar();
}

function SaveRegistrar() {
    if (form_Registrar.form()) {

        var form_data = $("#form-Registrar").serialize();

        $.ajax(
            {
                url: SetUrlForQuery('/Registrar/InsertRegistrar'),
                type: "POST",
                dataType: "json",
                data: form_data,

                success: function (data, textStatus, jqXHR) {
                    $('#mdl-Contact').modal('hide');
                    if (!data.Is_Error) {
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

                    } else {
                        $('#mdl-Contact').modal('hide');
                        SwalErrorMsj(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}

function UpdateRegistrar() {
    if (form_Registrar.form()) {

        var form_data = $("#form-Registrar").serialize();
        $.ajax(
            {
                url: SetUrlForQuery('/Registrar/UpdateRegistrar'),
                type: "POST",
                dataType: "json",
                data: form_data,

                success: function (data, textStatus, jqXHR) {
                    if (!data.Is_Error) {
                        $('#mdl-Contact').modal('hide');
                        swal.fire({
                            title: "¡Actualizado!",
                            text: "Se ha actualizado correctamente.",
                            type: "success"
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    location.reload(true);


                                }
                            });

                    } else {
                        $('#mdl-Contact').modal('hide');
                        SwalErrorMsj(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}

function Get_Barrios() {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/GetBarrios'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlBarrio = "";
                    HtmlBarrio += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        HtmlBarrio += "<option value=" + item.IdBarrio + ">" + item.Barrio + "</option>";
                    })
                    $('#Barrios').html(HtmlBarrio);
                    $('#Barrios').select2({
                    });

                    BarrioBool = true;


                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });


}

function ArmarSelect() {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/ArmaSelect'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataReferente = data.Objeto.ReferenteUnico;
                    var HtmlReferente = "";
                    //HtmlReferente += "<option value=''>Seleccionar</option>";
                    HtmlReferente += "<option value='Todos'>Todos</option>";
                    $.each(DataReferente, function (index, item) {
                        if (item.Referente == 0 && item.Referente1 != "") {
                            HtmlReferente += "<option value=" + JSON.stringify(item.Referente1) + ">" + item.Referente1 + "</option>";

                        } else if (item.NombreRef != "null" && item.Referente > 0) {
                            HtmlReferente += "<option value=" + JSON.stringify(item.Referente) + ">" + item.NombreRef + " " + item.ApellidoRef + "</option>";

                        } else {
                            if (item.Referente1 == "")
                                HtmlReferente += "<option value=" + JSON.stringify(item.Referente1) + ">" + "Sin referente" + "</option>";
                        }

                    })
                    $('#Referentes').html(HtmlReferente);
                    $('#Referentes').select2();
                    //comunas
                    var DataComuna = data.Objeto.ComunasUnicas;
                    var HtmlComuna = "";
                    HtmlComuna += "<option value=''>Seleccionar</option>";
                    $.each(DataComuna, function (index, item) {
                        if (item.Comuna > 0) {
                            HtmlComuna += "<option value=" + JSON.stringify(item.Comuna) + ">" + item.Comuna + "</option>";
                        } else
                            HtmlComuna += "<option value=" + JSON.stringify("NULL") + ">" + "Sin comuna" + "</option>";
                    })
                    $('#Comunas').html(HtmlComuna);
                    $('#Comunas').select2();

                    //finalcomuna
                    var DataBarrio = data.Objeto.BarrioUnico;
                    var HtmlBarrio = "";
                    HtmlBarrio += "<option value=''>Seleccionar</option>";
                    $.each(DataBarrio, function (index, item) {
                        if (item.IdBarrio > 0) {
                            HtmlBarrio += "<option value=" + item.IdBarrio + ">" + item.Barrio + "</option>";
                        } else
                            HtmlBarrio += "<option value=" + JSON.stringify("NULL") + ">" + "Sin Barrio" + "</option>";
                    })
                    $('#Barrio').html(HtmlBarrio);
                    $('#Barrio').select2();



                    var DataPuesto = data.Objeto.PuestosUnicos;
                    var HtmlPuesto = "";
                    HtmlPuesto += "<option value=''>Seleccionar</option>";
                    $.each(DataPuesto, function (index, item) {
                        if (item.IdPuesto > 0) {
                            HtmlPuesto += "<option value=" + item.IdPuesto + ">" + item.Departamentos + " - " + item.Municipio + " - " + item.DirePuesto + "</option>";
                        } else
                            HtmlPuesto += "<option value=" + item.IdPuesto + ">" + "Sin puesto" + "</option>";
                    })
                    $('#Puestovotacion').html(HtmlPuesto);
                    $('#Puestovotacion').select2();



                    var ListaMunicipios = data.Objeto.ListaMunicipios
                    var HtmlMunicipio = "";
                    HtmlMunicipio += "<option value=''>Seleccionar</option>";
                    ListaMunicipios = ListaMunicipios.filter(function (elemt) {
                        return elemt.Co_Depar == InfoCampaña[0].CodDepar;
                    })
                    $.each(ListaMunicipios, function (index, item) {

                        HtmlMunicipio += "<option value=" + item.Des_Muni + ">" + item.Des_Muni + "</option>";

                    })
                    $('#MunicipioParent').html(HtmlMunicipio);
                    $('#MunicipioParent').select2();


                    var HtmlDuro = "";
                    HtmlDuro += "<option value=''>Seleccionar</option>";
                    HtmlDuro += "<option value=" + true + ">SI</option>";
                    HtmlDuro += "<option value=" + false + ">NO</option>";
                    $('#Votoduro').html(HtmlDuro);
                    $('#Votoduro').select2();
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                CloseLoading();
            }
        });



}

var ContactosRegistrados = [];

function Get_Contactos() {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/GetContactos'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    Usuarios = data.Objeto;
                    ContactosRegistrados = Usuarios;

                    tabla_Registrar.destroy();
                    $('#TotConCam').html(ContactosRegistrados.length);
                    ArmarSelect();
                    RenderTable('datatable-Registrar', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [
                        { data: 'Cedula', className: "dt-center" },
                        { data: 'Nombre', className: "dt-center", width: "40%" },
                        { data: 'Celular', className: "dt-left" },
                        {
                            data: 'IdUser', className: "dt-center", render: function (data, type, row, meta) {
                                if (row.Departamentos != null && row.Municipio != null && row.DirePuesto != null) {
                                    return row.Departamentos + " - " + row.Municipio + " - " + row.DirePuesto;
                                } else {
                                    return "";
                                }
                            }
                        },
                        { data: 'Mesa', className: "dt-left" },
                        { data: 'Correo', className: "dt-left" },
                        { data: 'Direccion', className: "dt-left" },
                        { data: 'Barrio', className: "dt-left" },
                        { data: 'Comuna', className: "dt-left" },
                        {
                            data: 'Referente', className: "dt-center", render: function (data, type, row, meta) {
                                if (data == null || data == "") {
                                    return row.Referente1;
                                } else {
                                    return row.NombreRef + " " + row.ApellidoRef;
                                }
                            }
                        },
                        {
                            data: 'VotoDuro', className: "dt-center", render: function (data, type, row, meta) {
                                if (data) {
                                    return "Si";
                                } else {
                                    return "No";
                                }
                            }
                        },
                        {
                            data: 'IdUser', className: "dt-center", render: function (data, type, row, meta) {
                                return "<div class='input-group-append show'>" +
                                    "<a style='color:#007BFF; ' data-toggle='dropdown' class=' dropdown-toggle' type='button aria-expanded='true'>...</a>" +
                                    "<ul class='dropdown-menu float-right ' x-placement='bottom-start' style='position: absolute; top: 35px; left: 1202px; will-change: top, left;'>" +
                                    "<li><a onclick='EditarContacto(" + meta.row + ")'><i style='font-size:15px;' class='text-success fa fa-pencil-square-o '></i> <span style='font-size:15px;'>Editar</span></a></li>" +
                                    "<li><a onclick=DeleteContact(" + data + ")><i style='font-size:15px;' class='text-danger fa fa-times'></i> <span style='font-size:15px;'>Eliminar</span></a></li>" +
                                    "</ul>" +
                                    "</div>";
                            }
                        }

                    ],
                        {
                            data: Usuarios,
                            "paging": true,
                            "ordering": true,
                            "info": true,
                            "searching": true

                        });

                    tabla_Registrar = $('#datatable-Registrar').DataTable();


                    //tabla_Registrar.clear().draw();
                    //var lugar = "";
                    //var ref = "";
                    //var cumple;
                    //$.each(Usuarios, function (index, item) {
                    //    if (item.Departamentos != null && item.Municipio != null && item.DirePuesto != null) {
                    //        lugar = item.Departamentos + " - " + item.Municipio + " - " + item.DirePuesto;
                    //    } else {
                    //        lugar = "";
                    //    }

                    //    if (item.Referente == null || item.Referente == "") {
                    //        ref = item.Referente1;
                    //    } else {
                    //        ref = item.NombreRef + " " + item.ApellidoRef;
                    //    }

                    //    if (item.Cumpleanos != null) {
                    //        cumple = JSONDateconverter(item.Cumpleanos);
                    //    } else {
                    //        cumple = "";
                    //    }

                    //    var votoduto
                    //    if (item.VotoDuro)
                    //        votoduto = "Si"
                    //    else
                    //        votoduto = "No"

                    //    tabla_Registrar.row.add([
                    //        item.Cedula,
                    //        item.Nombre,
                    //        item.Celular,
                    //        lugar,
                    //        item.Mesa,

                    //        item.Correo,
                    //        item.Direccion,
                    //        item.Barrio,
                    //        item.Comuna,
                    //        ref,
                    //        votoduto,


                    //        "<div class='input-group-append show'>" +
                    //        "<a style='color:#007BFF; ' data-toggle='dropdown' class=' dropdown-toggle' type='button aria-expanded='true'>...</a>" +
                    //        "<ul class='dropdown-menu float-right ' x-placement='bottom-start' style='position: absolute; top: 35px; left: 1202px; will-change: top, left;'>" +
                    //        "<li><a id='edit_Contact_" + index + "'><i style='font-size:15px;' class='text-success fa fa-pencil-square-o '></i> <span style='font-size:15px;'>Editar</span></a></li>" +
                    //        "<li><a onclick=DeleteContact(" + item.IdUser + ")><i style='font-size:15px;' class='text-danger fa fa-times'></i> <span style='font-size:15px;'>Eliminar</span></a></li>" +
                    //        "</ul>" +
                    //        "</div>"

                    //    ]).draw(false);
                    //    $(document).on("click", "#edit_Contact_" + index, function () {
                    //        //$("#edit_Contact_" + index).on("click", function () {
                    //        editando = true;
                    //        $("#Hid").val(item.IdUser);
                    //        $("#TxtNit").val(item.Cedula);
                    //        $("#txtNombre").val(item.Nombre);
                    //        $("#txtDir").val(item.Direccion);

                    //        $("#Puesto").val(item.PuestoVo).trigger('change');

                    //        $("#txtCelular").val(item.Celular);
                    //        $("#Mesa").val(item.Mesa);
                    //        $("#txtCorreo").val(item.Correo);
                    //        if (item.Referente == null || item.Referente == "") {
                    //            document.getElementById("Referente1").style.display = "block";
                    //            document.getElementById("ReferenteN").style.display = "none";
                    //            $("#Referente1").val(item.Referente1);
                    //        } else {
                    //            document.getElementById("Referente1").style.display = "none";
                    //            $("#Referente").val(item.Referente).trigger('change');
                    //        }


                    //        if (item.VotoDuro) {
                    //            $("#VotoDuro").prop('checked', false).trigger("click");
                    //            $('#BoolActive').html("SI");
                    //        } else {
                    //            $("#VotoDuro").prop('checked', true).trigger("click");
                    //            $('#BoolActive').html("NO");
                    //        }



                    //        if (item.Cumpleanos != null) {
                    //            $('#Fecha').val(JSONDateconverter(item.Cumpleanos));
                    //        }


                    //        $("#Barrios").val(item.IdBarrio).trigger('change');

                    //        $("#tab1").click();

                    //        //$('#mdl-Contact').modal('show');
                    //    });
                    //});
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

function EditarContacto(index) {
    //$("#edit_Contact_" + index).on("click", function () {
    var item = ContactosRegistrados[index];
    editando = true;
    $("#Hid").val(item.IdUser);
    $("#TxtNit").val(item.Cedula);
    $("#txtNombre").val(item.Nombre);
    $("#txtDir").val(item.Direccion);

    $("#Puesto").val(item.PuestoVo).trigger('change');
    $("#MunicipioParent").val(item.MunicipioParent).trigger('change');
    $("#txtCelular").val(item.Celular);
    $("#Mesa").val(item.Mesa);
    $("#txtCorreo").val(item.Correo);
    if (item.Referente == null || item.Referente == "") {
        document.getElementById("Referente1").style.display = "block";
        document.getElementById("ReferenteN").style.display = "none";
        $("#Referente1").val(item.Referente1);
    } else {
        document.getElementById("Referente1").style.display = "none";
        $("#Referente").val(item.Referente).trigger('change');
    }


    if (item.VotoDuro) {
        $("#VotoDuro").prop('checked', false).trigger("click");
        $('#BoolActive').html("SI");
    } else {
        $("#VotoDuro").prop('checked', true).trigger("click");
        $('#BoolActive').html("NO");
    }

    if (item.Cumpleanos != null) {
        $('#Fecha').val(JSONDateconverter(item.Cumpleanos));
    }

    $("#Barrios").val(item.IdBarrio).trigger('change');
    $("#BarrioParent").val(item.MunicipioParent)
    $("#tab1").click();

    //$('#mdl-Contact').modal('show');
}

function DeleteContact(id) {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/DeleteContacto?Id=' + id),
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
                                Get_Contactos();


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


function Get_Departamentos() {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/GetDepartamentosUnicosDeContacto'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlDepartamento = "";
                    HtmlDepartamento += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        if (item.Municipio == null) {
                            HtmlDepartamento += "<option value=" + item.Departamentos + ">" + "Sin departamento" + "</option>";
                        } else
                            HtmlDepartamento += "<option value=" + item.Departamentos + ">" + item.Departamentos + "</option>";
                    })
                    $('#Departamento').html(HtmlDepartamento);
                    $('#Departamento').select2();
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function Get_Ciudades() {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/GetMunicipiosUnicosDeContacto'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlMunicipio = "";
                    HtmlMunicipio += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        if (item.Municipio == null) {
                            HtmlMunicipio += "<option value=" + item.Municipio + ">" + "Sin Municipio" + "</option>";
                        } else
                            HtmlMunicipio += "<option value=" + item.Municipio + ">" + item.Municipio + "</option>";
                    })
                    $('#Municipio').html(HtmlMunicipio);
                    $('#Municipio').select2();
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function Get_Puestos() {
    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/GetPuestoVotacion'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlPuesto = "";
                    HtmlPuesto += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        if (InfoCampaña[0].Orden == 1) {//Departamental
                            visible_elemento('DivMunicipio')
                            if (item.Departamentos.toUpperCase() == InfoCampaña[0].Des_Depar.toUpperCase()) {
                                HtmlPuesto += "<option value=" + item.IdPuesto + ">" + item.Departamentos + " - " + item.Municipio + " - " + item.Direccion + "</option>";
                            }
                        }
                        else if (InfoCampaña[0].Orden == 2) {//Municipio
                            esconde_elemento('DivMunicipio');
                            if (item.IdMunicipio == InfoCampaña[0].CodMunicipio) {
                                HtmlPuesto += "<option value=" + item.IdPuesto + ">" + item.Departamentos + " - " + item.Municipio + " - " + item.Direccion + "</option>";
                            }
                        }
                        else {//Nacional
                            HtmlPuesto += "<option value=" + item.IdPuesto + ">" + item.Departamentos + " - " + item.Municipio + " - " + item.Direccion + "</option>";
                        }
                    })
                    $('#Puesto').html(HtmlPuesto);
                    $('#Puesto').select2({
                    });

                    PuestoBool = true;
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Retraso() {
    await sleep(3000);
    if (BarrioBool == true && PuestoBool == true && UserRefBool == true) {

        Get_Contactos();
    }
    else
        Retraso()
}

function CargarDataContacto() {
    ShowLoading();
    Get_Barrios();
    Get_UsuarioReferente();
    Retraso();
}

function Get_UsuarioReferente() {

    $.ajax(
        {
            url: SetUrlForQuery('/Usuarios/GetUsuarios'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var UserRef = data.Objeto;
                    var HtmlUserRef = "";
                    HtmlUserRef += "<option value='0'>Seleccionar</option>";
                    $.each(UserRef, function (index, item) {

                        HtmlUserRef += "<option value=" + item.Id_Usuario + ">" + item.Nombre + " " + item.Apellido + "</option>";

                    })
                    $('#Referente').html(HtmlUserRef);
                    $('#Referente').select2({
                    });
                    UserRefBool = true;
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

