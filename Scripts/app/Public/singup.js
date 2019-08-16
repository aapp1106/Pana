var form_Validator = null;
$(document).ready(function () {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    form_Validator = Validador("form-register", {
        txtNombres: {
            required: true,
            StringEmpty: true
        },
        txtApellidos: {
            required: true,
            StringEmpty: true
        },
        cboIndicativo: {
            required: true
        },
        txtCelular: {
            required: true,
            StringEmpty: true,
            digits: true,
        },
        txtEmail: {
            required: true,
            email2: true,
            StringEmpty: true
        },
        txtPass: {
            required: true,
            StringEmpty: true,
            minlength: 8
        },
        txtPass2: {
            required: true,
            StringEmpty: true,
            equalTo: "#txtPass"
        },
        chkTerminos: {
            required: true
        }
    },
        {
            chkTerminos: "Debe aceptar los terminos y condiciones.",
            txtPass2: {
                equalTo: "Las contraseñas deben coincidir"
            }
        }
    );

    $("#btnRegistrar").click(function () {
        if (form_Validator.form()) {
            alert("SI");
        } else {
            alert("NO");
        }
    });
});