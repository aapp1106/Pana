

$(document).ready(function () {

    $("#btnlogin").on("click", function (event) {
        ServiceLogin($("#username").val(), $("#password-field").val());
    });

    $("#password-field").keyup(function (event) {
        if (event.keyCode === 13) {
            ServiceLogin($("#username").val(), $("#password-field").val());
        }
    });

    $("#username").keyup(function (event) {
        if (event.keyCode === 13) {
            ServiceLogin($("#username").val(), $("#password-field").val());
        }
    });
   

});


function ServiceLogin(user, password) {
    var form_data = new FormData();
    form_data.append("user", user);
    form_data.append("pass", password);

    var date = new Date();
    var formURL = SetUrlForQuery('/Usuarios/Login');
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

                    window.location.href = SetUrlForQuery(data.Url);
                    ShowError(data.Msj);


                    return false;
                } else {
                    
                    SwalErrorMsj(data);
                      

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function validar() {
    // Inicialización de variables
    
    var formData = new FormData();
    formData.append('nuip', "1065807897");
    formData.append('tipo', "-1");
    formData.append('token', "18a5ea2c86f0141c51126ea9f1e77f49a9f321778e927861debe146acdef56e8fdd2083025ca9574bbe29136937be7cf62b3a52e97057461bdae425f770d931b");
    formData.append('g-recaptcha-response', "03AOLTBLSAphalG8HO_txhvvAzDp76QqwHJqqmUqvwreW6TdXyksUqT8KcIU894T-5niT7N6BrjihfWavHxYtBLuBvYT2zZ0jCI3VUnoTk3DBNbWhOupxIBnweYyTpkdcVNYowrH-yXwTKSIs0MrP3mStwEwXSwsNfATkzwUudGHqKdbeFCoF8Z__Fawonp2uo21XjjfIN1o-Nb4EJV00-mAf9mpYVEd7d4LNe9WVdjGQ5PaYAaNE32DMqLVeg1mmbcHtg6O6kPzpR1bAnhXSsja9HzO9mrnCDx0wEb4fTsZFnUzilmvandMdICTsfMG6mP0puNC843XQKwt_zpRV_uQ0VcyFA8GTt2g");

    
        $.ajax({
            type: "POST",
            url: "https://wsp.registraduria.gov.co/censo/consultar",
            dataType: "json",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            //beforeSend: function () {
            //    // preloader
            //    $('.form-process').fadeIn();
            //}
        }).done(function (response) {
            
            if (response.success) {
                console.log(response.data.message);
            } else {
                if (response.reload) {
                    location.reload();
                } else {
                    $("#error").html(response.data.message);
                    $("#div_error").removeClass('hidden').addClass('show');
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var error = 'Request: ' + jqXHR + '<br>Request failed: ' + textStatus + '<br>Exeption: ' + errorThrown;
            $("#error").html(error);
            $("#div_error").removeClass('hidden').addClass('show');
            $("#btn-error").addClass('hidden');
            // preloader
            $('.form-process').fadeOut();
        });
    
    return true;
}


