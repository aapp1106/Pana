var tabla_Permisos = null;
var form_Permisos = null;
var Permisos = [];
var editando = false;
$(document).ready(function () {
    RenderTable('tbl_permisos', [0, 1, 2, 3, 4, 5, 6]);
    tabla_Permisos = $('#tbl_permisos').DataTable();

    var elem = document.querySelector('#chkVisible');
    var switchery = new Switchery(elem, { color: '#007BFF' });

    var elem2 = document.querySelector('#chkActivo');
    var switchery2 = new Switchery(elem2, { color: '#007BFF' });
    initValidador();
    //$("#mdl-permisos").on('shown.bs.modal', function () {
    //    LimpiarChecbox("form-permisos", true);
    //});
    $("#mdl-permisos").on('hidden.bs.modal', function () {
        LimpiarChecbox("form-permisos", true);
        editando = false;
    });
    $("#btnGuardarPermiso").on("click", function () { SavePermiso();  });
    CargarTiposPermiso();
    CargarPermisos();

});

function initValidador() {
    form_Permisos = Validador("form-permisos", {
        cboTipo: {
            required: true,
            StringEmpty: true
        },
        txtPermiso: {
            required: true,
            StringEmpty: true
        },
        txtAlias: {
            required: true,
            StringEmpty: true
        },
        txtDescripcion: {
            required: true,
            StringEmpty: true
        },
        txtIcono: {
            required: true,
            StringEmpty: true
        }
     }
    );
}

function SavePermiso() {
    if (form_Permisos.form()) {
        var form_data = new FormData();
        var formURL = SetUrlForQuery('/Permisos/SavePermiso');
        var obj = {
            Permiso: $("#txtPermiso").val(),
            Alias: $("#txtAlias").val(),
            Descripcion: $("#txtDescripcion").val(),
            Id_TipoPermiso: $("#cboTipo").val(),
            Icono: $("#txtIcono").val(),
            MenuPadre: $("#txtMenu").val(),
            Url: $("#txtUrl").val(),
            Visible: $("#chkVisible").is(':checked'),
            Activo: $("#chkActivo").is(':checked')
        };

        form_data.append('permiso', JSON.stringify(obj));
        form_data.append('Hid', $("#Hid").val());
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
                        //CloseModalBox();
                        Swal.fire({
                            title: "¡Creado!",
                            text: "Se ha creado el permiso correctamente.",
                            //confirmButtonColor: "#66BB6A",
                            type: "success"
                        });
                        CargarPermisos();
                        $('#mdl-permisos').modal('hide');
                        
                    }
                    else {
                        Swal.fire({
                            title: "¡Error!",
                            text: data.Msj,
                            //confirmButtonColor: "#ab2328",
                            type: "error",
                            closeOnConfirm: true,
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}

function DelPermiso(id) {

    Swal.fire({
        title: '¡Atencíón',
        text: "¿Seguro que quieres eliminar este permiso?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
    }).then((result) => {
        if (result.value) {
            var form_data = new FormData();
            var formURL = SetUrlForQuery('/Permisos/DelPermiso');
            form_data.append('Hid', id);
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
                            CargarPermisos();
                            Swal.fire(
                                '¡Eliminado!',
                                'El permiso ha sido eliminado correctamente .',
                                'success'
                            );
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
   
        
    
};

function CargarPermisos() {
    var formURL = SetUrlForQuery('/Permisos/Get_Permisos');

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                Permisos = data;
                tabla_Permisos.clear().draw();
                $.each(Permisos, function (index, item) {

                    tabla_Permisos.row.add([
                        item.Des_TipoPermiso,
                        item.Permiso,
                        item.Alias,
                        item.Icono,
                        item.MenuPadre,
                        item.Url,
                        "<div class='input-group-append show'>" +
                            "<a style='color:#007BFF; ' data-toggle='dropdown' class=' dropdown-toggle' type='button aria-expanded='true'>...</a>"+
                            "<ul class='dropdown-menu float-right ' x-placement='bottom-start' style='position: absolute; top: 35px; left: 1202px; will-change: top, left;'>"+
                                "<li><a id='edit_permiso_" + index + "'><i style='font-size:15px;' class='text-success fa fa-pencil-square-o '></i> <span style='font-size:15px;'>Editar</span></a></li>"+
                                "<li><a id='del_permiso_" + index + "'><i style='font-size:15px;' class='text-danger fa fa-times'></i> <span style='font-size:15px;'>Eliminar</span></a></li>"+
                            "</ul>"+
                        "</div>"
                    ]).draw(false);

                    $("#edit_permiso_" + index).on("click", function ()
                    {
                        editando = true;
                        $("#Hid").val(item.Id_Permiso);
                        $("#txtPermiso").val(item.Permiso);
                        $("#txtAlias").val(item.Alias);
                        $("#txtDescripcion").val(item.Descripcion);
                        $("#cboTipo").val(item.Id_TipoPermiso);
                        $("#txtIcono").val(item.Icono);
                        $("#txtMenu").val(item.MenuPadre);
                        $("#txtUrl").val(item.Url);

                        if (item.Visible !== $("chkVisible").is(":checked"))
                            $("chkVisible").trigger("click");
                       
                        if (item.Activo !== $("chkActivo").is(":checked"))
                            $("chkActivo").trigger("click");
                        
                        $('#mdl-permisos').modal('show');
                    });
                    $("#del_permiso_" + index).on("click", function () {
                        DelPermiso(item.Id_Permiso);
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}


function CargarTiposPermiso() {
    var formURL = SetUrlForQuery('/Permisos/Get_TiposPermisos');

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#cboTipo").html("");
                $("#cboTipo").append("<option value=''>Seleccionar</option>");
                $.each(data, function (index, item) {
                    $("#cboTipo").append("<option value='" + item.Id_TipoPermiso + "'>" + item.Descripcion + "</option>");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}
