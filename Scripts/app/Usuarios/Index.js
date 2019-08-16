var tabla_User = null;
var form_plan = null;
var form_Campana = null;
var Usuarios = [];
var editando = false;
var PartidoBool = false;
var CampanaBool = false;
var DeparBool = false;
var CiudadId;
//validar que una imagen se modifique o no...
var ModificaImagen = false;
var ValorImagen;


$(document).ready(function () {
    ShowLoading();
    RenderTable('datatable-usuarios', [0, 1, 2, 3, 4, 5, 6], null, {
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
                filename: "Equipo campaña",
                titleAttr: 'Excel',
            },

        ]
    });
    tabla_User = $('#datatable-usuarios').DataTable();
    
    $('.custom-file-input').on('change', function () {
        var Tipe = $(this);
        let fileName = $(this).val().split('\\').pop(); btnGuardarCampana
        var ValorAcept = Tipe[0].accept.split('.')[1];
        var TipeArchi = fileName.split('.')[1];
        if (ValorAcept == TipeArchi) {
            $(this).next('.custom-file-label').addClass("selected").html(fileName);
        }
        else {
            $('#logo-error').html('El archivo debe ser pdf');
            alert('El archivo debe ser pdf')
        }
    }); 

    
    
    initValidador();
    initValidadorCampana();

    $("#mdl-User").on('hidden.bs.modal', function () {
        editando = false;
    });

    document.getElementById("Departamentos").style.display = "none";
    document.getElementById("Cuidades").style.display = "none";
    $("#Tipo").on('change', function () {
        document.getElementById("Departamentos").style.display = "block";
    });
    $("#DEPAR").on('change', function () {
        document.getElementById("Cuidades").style.display = "block";
        Get_Ciudades();
    });
    
    $("#btnGuardarUser").on("click", function () { SaveUserOrUpdate(); });
    
    $("#ResetU").on("click", function () { resetear(); });
    
    //$("#logo").fileinput({
    //    browseLabel: 'Buscar archivo',
    //    browseIcon: '<i class="icon-file-pdf"></i>',
    //    showUpload: false,
    //    removeLabel: "Limpiar",
    //    removeIcon: '<i class="icon-cross3"></i>',
    //    initialCaption: "",
    //    maxFileSize: 3072,
    //    allowedFileTypes: ['pdf'],
    //    allowedFileExtensions: ['pdf'],
    //    language: "es"
    //});

    //$("#logo").change(function () {Get_Usuarios


    //    var input = $(this);
    //    if (input[0].files.length > 0) {
    //        $("#" + input.attr("id") + "-error").css("display", "none");
    //        $("#" + input.attr("id") + "-error").html("");
    //    }
    //});
    Get_Usuarios();
    Get_Partidos();
    Get_Cargos();
    GetCampanas();
    Get_Departamentos();

    var elem = document.querySelector('#Estado');
    var switchery = new Switchery(elem, { color: '#007BFF' });

    $('#BoolActive').html("Activo");
    $("#Estado").on('change', function () {
        var CheckActivo = $("#Estado").is(':checked')
        if (CheckActivo) {
            $('#Hestado').val("Activo");
            $('#BoolActive').html("Activo");
        }else
        {
            $('#BoolActive').html("Inactivo");
            $('#Hestado').val("Inactivo");
        }
        
    });

    $("#logo").on('change', function () {
        ModificaImagen = true;
        ValorImagen = document.getElementById('logo').files[0].name;
    });
    
    
    
    
});

function resetear() {
    document.getElementById("form-Planes").reset();
    form_Plans.resetForm();
}


function initValidador() {
    form_Plans = Validador("form-Planes", {
        TxtNit: {
            required: true,
            StringEmpty: true
        },
        txtNombre: {
            required: true,
            StringEmpty: true
        },
        txtApellido: {
            required: true,
            StringEmpty: true
        },
        txtCorreo: {
            required: true,
            StringEmpty: true
        },
        txtCelular: {
            required: true,
            StringEmpty: true
        },
        TxtDireccion: {
            required: false,
            StringEmpty: true
        },
        TxtCargo: {
            required: false,
            StringEmpty: true
        }
    }
    );
}

function initValidadorCampana() {
    form_Campana = Validador("form-Campana", {
        Tipo: {
            required: true,
            StringEmpty: true
        },
        Partido: {
            required: true,
            StringEmpty: true
        },
        logo: {
            required: true,
            StringEmpty: true,
            RegistroFileRequired:true
        },
        NombreCandidato: {
            required: true,
            StringEmpty: true
        },
        Correo: {
            required: true,
            StringEmpty: true
        },
        txtDireccion: {
            required: true,
            StringEmpty: true
        },
        Celular: {
            required: true,
            StringEmpty: true
        }
    }
    );
}

function SaveUserOrUpdate() {
    if (!editando)
        SaveUser();
    else
        UpdateUser();
}

function SaveUser() {
    if (form_Plans.form()) {
        var form_data = $("#form-Planes").serialize();
        
        $.ajax(
            {
                url: SetUrlForQuery('/Usuarios/InsertUsuario'),
                type: "POST",
                dataType: "json",
                data: form_data,

                success: function (data, textStatus, jqXHR) {
                    $('#mdl-User').modal('hide');
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
                        $('#mdl-User').modal('hide');
                        SwalErrorMsj(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}

function confimarExistencia() {

    $.ajax(
        {
            url: SetUrlForQuery('/Usuarios/Get_ConfiCampana'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    CloseLoading();
                    var DataCandidato = data.Objeto;
                    if (DataCandidato.length > 0) {
                        $('#NombreCandidato').val(DataCandidato[0].NombreCandidato);
                        $("#Tipo").val(DataCandidato[0].CoTipoCampa).trigger('change');
                        $("#DEPAR").val(DataCandidato[0].CodDepar).trigger('change');
                        CiudadId = DataCandidato[0].CodMunicipio;
                        Get_Ciudades();
                        var codigopar = DataCandidato[0].CodPartido.trim();
                        $("#Partido").val(codigopar).trigger('change');
                        $('#Correo').val(DataCandidato[0].Correo);
                        $('#txtDireccion').val(DataCandidato[0].Direccion);
                        $('#Celular').val(DataCandidato[0].Telefono);


                        $("label.custom-file-label").text(DataCandidato[0].PdfHv);
                        ModificaImagen = false;
                        ValorImagen = DataCandidato[0].PdfHv;
                        
                        document.getElementById("btnEditarCandidato").style.display = "initial";
                        document.getElementById("btnGuardarCampana").style.display = "none";
                        $('#Hid').val(DataCandidato[0].IdConfigCampana);

                        $("#btnEditarCandidato").on("click", function () {
                            Updatecampana();
                        });
                        
                    } else {
                        document.getElementById("btnEditarCandidato").style.display = "none";
                        $("#btnGuardarCampana").on("click", function () {
                            SaveCampana();
                        });
                    }
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

function UpdateUser() {
    if (form_Plans.form()) {
        var form_data = $("#form-Planes").serialize();


        $.ajax(
            {
                url: SetUrlForQuery('/Usuarios/UpdateUsuario'),
                type: "POST",
                dataType: "json",
                data: form_data,

                success: function (data, textStatus, jqXHR) {
                    if (!data.Is_Error) {
                        $('#mdl-User').modal('hide');
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
                        $('#mdl-User').modal('hide');
                        SwalErrorMsj(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }
}
function Get_Usuarios() {

    $.ajax(
        {
            url: SetUrlForQuery('/Usuarios/GetUsuarios'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    Usuarios = data.Objeto;
                    tabla_User.clear().draw();


                    tabla_User.destroy();

                    RenderTable('datatable-usuarios', [0, 1, 2, 3, 4, 5,6,7], [
                        { data: 'Username', className: "dt-center" },
                        { data: 'Identificacion', className: "dt-center" },
                        {
                            data: 'Nombre', className: "dt-left", width: "40%", render: function (data, type, row, meta) {
                                var apellido = row.Apellido == null ? "" : row.Apellido;
                                return row.Nombre + " " + apellido;
                            }
                        },
                        { data: 'NombreCargo', className: "dt-center" },
                        { data: 'Celular', className: "dt-center" },
                        {
                            data: 'NombreEstado', className: "dt-center", render: function (data, type, row, meta) {
                                return data === "ACTIVO" ? "<span class='label label-primary'>Activo</span>" : "<span class='label label-danger'>Inactivo</span>";
                            }
                        },
                        {
                            data: 'Id_Usuario', className: "dt-left", render: function (data, type, row, meta) {
                                return "<a onclick='EditarPlan(" + meta.row + ")' title='Editar'><i style='font-size:15px;' class='text-success fa fa-pencil-square-o ButonIconProyect'></i> <span style='font-size:15px;'></span></a>";
                            }
                        },
                        { data: 'Correo', className: "dt-left" },
                        { data: 'Direccion', className: "dt-left" }
                    ],
                        {
                            data: Usuarios,
                            "paging": true,
                            "ordering": true,
                            "info": true,
                            "searching": true
                            
                        });

                    tabla_User = $('#datatable-usuarios').DataTable();
                    

                    CloseLoading();
                } else {
                    CloseLoading();
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function EditarPlan(index) {
    editando = true;
    var item = Usuarios[index];
    $("#Hid").val(item.Id_Usuario);
    $("#TxtNit").val(item.Identificacion);
    $("#txtNombre").val(item.Nombre);
    $("#txtApellido").val(item.Apellido);
    $("#txtCorreo").val(item.Correo);
    $("#txtCelular").val(item.Celular);
    $("#TxtDireccion").val(item.Direccion);
    $("#TxtCargo").val(item.Cargo).trigger('change');

    if (item.Permisos != null) {
        var permisos = item.Permisos.split(",")
        $("#Permisos").val(permisos).trigger('change');
    }   
    var elemento = $("#Estado");

    if (item.NombreEstado == "INACTIVO") {
        elemento.prop("checked", false);
        $('#Hestado').val("Inactivo");
        $('#BoolActive').html("Inactivo");
    } else {
        elemento.prop("checked", true);
        $('#Hestado').val("Activo");
        $('#BoolActive').html("Activo");
    }
    $('#mdl-User').modal('show');
}

function Get_Cargos() {

    $.ajax(
        {
            url: SetUrlForQuery('/Usuarios/GetCargos'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataCandidato = data.Objeto;
                    var HtmlCargo = "";
                    HtmlCargo += "<option value=''>Seleccionar</option>";
                    $.each(DataCandidato, function (index, item) {
                        HtmlCargo += "<option value=" + item.IdCargo + ">" + item.Nombre + "</option>";
                    })
                    
                    $('#TxtCargo').html(HtmlCargo);
                    $('#TxtCargo').select2({
                        dropdownParent: $('#mdl-User')
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
                    var codigopar;
                    $.each(DataPartido, function (index, item) {
                        codigopar = item.CodPartido.trim();
                        HtmlPartido += "<option value=" + codigopar +">"+item.Descripcion+"</option>";
                    })
                    $('#Partido').html(HtmlPartido);
                    $('#Partido').select2();

                    PartidoBool = true;

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
            url: SetUrlForQuery('/ConfiCampana/GetDepartamento'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlDepartamento = "";
                    HtmlDepartamento += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        HtmlDepartamento += "<option value=" + item.Co_Depar + ">" + item.Des_Depar + "</option>";
                    })
                    $('#DEPAR').html(HtmlDepartamento);
                    $('#DEPAR').select2();
                    DeparBool = true;
                    CargarDataCandidato();
                    
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
            url: SetUrlForQuery('/ConfiCampana/GetMunicipios'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlMunicipio = "";
                    HtmlMunicipio += "<option value=''>Seleccionar</option>";
                    var depa = $('#DEPAR').val();
                    
                    $.each(DataPartido, function (index, item) {
                        if (item.Co_Depar == depa) {
                            HtmlMunicipio += "<option value=" + item.Id_Muni + ">" + item.Des_Muni + "</option>";
                        }
                        
                    })
                    $('#Ciudad').html(HtmlMunicipio);
                    $('#Ciudad').select2();
                    if (DeparBool) {
                        $("#Ciudad").val(CiudadId).trigger('change');
                    }
                    
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function GetCampanas() {

    $.ajax(
        {
            url: SetUrlForQuery('/ConfiCampana/GetTiposCampana'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlCampa = "";
                    HtmlCampa += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        HtmlCampa += "<option value=" + item.IdTipo + ">" + item.Descripcion + "</option>";
                    })
                    $('#Tipo').html(HtmlCampa);
                    $('#Tipo').select2();
                    CampanaBool = true;
                    
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function SaveCampana() {
    if (form_Campana.form()) {
        var form_data = new FormData();
        var Params = {
            NombreCandidato: $('#NombreCandidato').val(),
            CodDepar: $('#DEPAR').val(),
            CodMunicipio : $('#Ciudad').val(),
            CodPartido : $('#Partido').val(),
            Direccion : $('#txtDireccion').val(),
            Correo: $('#Correo').val(),
            Telefono: $('#Celular').val(),
            CoTipoCampa: $('#Tipo').val()
        };
        form_data.append('Parametros', JSON.stringify(Params));
        var FilePdf = $("#logo");
        if (FilePdf[0].files[0] != undefined)
            form_data.append('FilePdf', FilePdf[0].files[0]);
        ShowLoading();

        $.ajax(
            {
                url: SetUrlForQuery('/ConfiCampana/InsertConfigCampana'),
        
                content: "application/json; charset=utf-8",
                type: "POST",
                dataType: "json",
                data: form_data,
                contentType: false,
                processData: false,

                success: function (data, textStatus, jqXHR) {
                    CloseLoading();
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
}




function Updatecampana() {
    if (ValorImagen.length > 0) {
        if (form_Campana.form()) {
            var form_data = new FormData();
            if (ModificaImagen) {
                ValorImagen = "M";
            }
            var Params = {
                IdConfigCampana: $('#Hid').val(),
                NombreCandidato: $('#NombreCandidato').val(),
                CodDepar: $('#DEPAR').val(),
                CodMunicipio: $('#Ciudad').val(),
                CodPartido: $('#Partido').val(),
                Direccion: $('#txtDireccion').val(),
                Correo: $('#Correo').val(),
                Telefono: $('#Celular').val(),
                CoTipoCampa: $('#Tipo').val(),
                PdfHv: ValorImagen

            };
            form_data.append('Parametros', JSON.stringify(Params));
            var FilePdf = $("#logo");
            if (FilePdf[0].files[0] != undefined)
                form_data.append('FilePdf', FilePdf[0].files[0]);
            ShowLoading();

            $.ajax(
                {
                    url: SetUrlForQuery('/ConfiCampana/UpdateConfiCampana'),

                    content: "application/json; charset=utf-8",
                    type: "POST",
                    dataType: "json",
                    data: form_data,
                    contentType: false,
                    processData: false,

                    success: function (data, textStatus, jqXHR) {
                        CloseLoading();
                        if (!data.Is_Error) {
                            swal.fire({
                                title: "¡Hecho!",
                                text: "Se ha modificado correctamente.",
                                type: "success"
                            })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        location.reload(true);


                                    }
                                });

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
    } else {
        swal.fire({
            title: "¡Atencion!",
            text: "Ingrese el campo hoja de vida.",
            type: "warning"
        })
    }
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Retraso() {
    await sleep(3000);
    if (PartidoBool == true && CampanaBool == true && DeparBool == true) {
       
        confimarExistencia();
    }
    else
        Retraso()
}

function CargarDataCandidato() {
    ShowLoading();
    Retraso();
}