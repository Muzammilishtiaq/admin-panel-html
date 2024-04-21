$('#login-form').hide();
$('#register-link').click(function (e) {
    e.preventDefault();
    $('#register-form').show();
    $('#login-form').hide();
});
$('#login-link').click(function (e) {
    e.preventDefault();
    $('#login-form').show();
    $('#register-form').hide();
});

// register submit function
$('#register-form').submit(function (e) {
    e.preventDefault();
    let registerData = {
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        email: $('#email').val(),
        password: $('#password').val()


    }

    // register form data  localstorage set item
    localStorage.setItem('registerpush', JSON.stringify(registerData))

    console.error(registerData)
    // window.location.href = 'Admin.html';
    document.getElementById('register-form').reset()

});

// login submit function
$('#login').submit(function (e) {
    e.preventDefault();
    var loginEmail = $('#logemail').val();
    var loginPassword = $('#logpassword').val();
    var localStoragejsondata = localStorage.getItem('registerpush');
    if (localStoragejsondata) {
        let localStoragedata = JSON.parse(localStoragejsondata)
        if (loginEmail === localStoragedata.email && loginPassword === localStoragedata.password) {
            console.log('success')
            window.location.href = 'dashboard.html';
        } else {
            alert('Email or Password is not correct ')
            console.log('not success')
        }
    } else {
        alert("No user data found. Please register first.");
    }

});
// end form register or login
// window load login form show function start
function onloginPageload(){
    $('#login-form').show();
}
// window load login form show function end

