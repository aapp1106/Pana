$(document).ready(function () {
    RenderTable('datatable-cadidatos', [0, 1, 2], null, {
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
    tabla_Candidato = $('#datatable-cadidatos').DataTable();

    
    document.getElementById("txtPropuesta").readOnly = true;
    $("#btnnuevoCandidato").on("click", function () { Get_Partidos(); });
    $("#btnEditarPropuesta").on("click", function () {
        document.getElementById("btnGuardarEdicion").style.display = "block";
        document.getElementById("txtPropuesta").readOnly = false;
    });
    $("#btnnuevaPropuesta").on("click", function () {
        document.getElementById("btnGuardarEdicion").style.display = "block";
        document.getElementById("txtPropuesta").readOnly = false;
    });
    $("#btnGuardarCandidato").on("click", function () {
        SaveCandidato();
    });
    
    initValidador();
    Get_Propuesta();
    Get_Candidatos();
    $("#ResetC").on("click", function () { resetear(); });
});

function resetear() {
    document.getElementById("form-candidato").reset();
    form_candi.resetForm();
}

function Get_Partidos() {

    $.ajax(
        {
            url: SetUrlForQuery('/ConfiCampana/GetPartidos'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlPartido = "";
                    HtmlPartido += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        HtmlPartido += "<option value=" + item.CodPartido + ">" + item.Descripcion + "</option>";
                    })
                    $('#Partido').html(HtmlPartido);
                    $('#Partido').select2({
                        dropdownParent: $('#mdl-Candidato')
                    }

                    );
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function initValidador() {
    form_candi = Validador("form-candidato", {
        TxtNombre: {
            required: true,
            StringEmpty: true
        },
        Partido: {
            required: true
        }
    });
    form_Prop = Validador("form-Propuesta", {
        txtPropuesta: {
            required: true,
            StringEmpty: true
        }
    });
}

function SavePropuesta() {
    if (form_Prop.form()) {
        var form_data = $("#form-Propuesta").serialize();
        $.ajax(
            {
                url: SetUrlForQuery('/ConfiEncuesta/InsertPropuesta'),
                type: "POST",
                dataType: "json",
                data: form_data,
                success: function (data, textStatus, jqXHR) {
                    //$('#mdl-User').modal('hide');
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
                        //$('#mdl-User').modal('hide');
                        SwalErrorMsj(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
    else
    {
        swal.fire({
            title: "¡Error!",
            text: "Debe llenar el campo.",
            type: "warning"
        })}
}

function SaveCandidato() {
    if (form_candi.form()) {
        var form_data = $("#form-candidato").serialize();
        $.ajax(
            {
                url: SetUrlForQuery('/ConfiEncuesta/InsertCandidato'),
                type: "POST",
                dataType: "json",
                data: form_data,
                success: function (data, textStatus, jqXHR) {
                    $('#mdl-Candidato').modal('hide');
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
                        $('#mdl-Candidato').modal('hide');
                        SwalErrorMsj(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}

function UpdateProp() {
    if (form_Prop.form()) {
        var form_data = $("#form-Propuesta").serialize();
        $.ajax(
            {
                url: SetUrlForQuery('/ConfiEncuesta/UpdatePropuesta'),
                type: "POST",
                dataType: "json",
                data: form_data,

                success: function (data, textStatus, jqXHR) {
                    if (!data.Is_Error) {
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
                        SwalErrorMsj(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}

function DelCandidato(id) {

    Swal.fire({
        title: '¡Atencíón',
        text: "¿Seguro que quieres eliminar este candidato?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
    }).then((result) => {
        if (result.value) {
            var form_data = new FormData();
            var formURL = SetUrlForQuery('/ConfiEncuesta/DeleteCandidato?idCandi=' + id);
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
                        if (!data.Is_Error) {
                            Get_Candidatos();
                            swal.fire({
                                title: "¡Eliminado!",
                                text: "El candidato ha sido eliminado correctamente .",
                                type: "success"
                            });

                        }
                        else {
                            Swal.fire({
                                title: "¡Error!",
                                text: data.Msj,
                                //confirmButtonColor: "#ab2328",
                                type: "error",
                                closeOnConfirm: true
                            });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
        }
    });
}

function Get_Candidatos() {

    $.ajax(
        {
            url: SetUrlForQuery('/ConfiEncuesta/GetCandidatos'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataCandidato = data.Objeto;
                    tabla_Candidato.clear().draw();
                    $.each(DataCandidato, function (index, item) {

                        tabla_Candidato.row.add([
                            item.NombreCandidato,
                            item.Descripcion,
                            "<div class='input-group-append show'>" +
                            "<a style='color:#007BFF; ' data-toggle='dropdown' class=' dropdown-toggle' type='button aria-expanded='true'>...</a>" +
                            "<ul class='dropdown-menu float-right ' x-placement='bottom-start' style='position: absolute; top: 35px; left: 1202px; will-change: top, left;'>" +
                            //"<li><a id='edit_permiso_" + index + "'><i style='font-size:15px;' class='text-success fa fa-pencil-square-o '></i> <span style='font-size:15px;'>Editar</span></a></li>" +
                            "<li><a id='del_Candidato" + item.IdCandidato + "'><i style='font-size:15px;' class='text-danger fa fa-times'></i> <span style='font-size:15px;'>Eliminar</span></a></li>" +
                            "</ul>" +
                            "</div>"
                        ]).draw(false);

                        $("#del_Candidato" + item.IdCandidato).on("click", function () {
                            DelCandidato(item.IdCandidato);
                        });
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

function Get_Propuesta() {

    $.ajax(
        {
            url: SetUrlForQuery('/ConfiEncuesta/GetPropuesta'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPropuesta = data.Objeto;
                    if (DataPropuesta.length > 0 ) {
                        $('#txtPropuesta').val(DataPropuesta[0].DescripcionPropuesta);
                        //document.getElementById("txtPropuesta").readOnly = false;
                        document.getElementById("btnnuevaPropuesta").style.display = "none";
                        $('#HidP').val(DataPropuesta[0].IdPropuesta);
                    } else {
                        document.getElementById("btnEditarPropuesta").style.display = "none";
                    }

                    $("#btnGuardarEdicion").on("click", function () {
                        if (DataPropuesta.length > 0) {
                            UpdateProp();
                        } else {
                            SavePropuesta();
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