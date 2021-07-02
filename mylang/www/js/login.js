$(function(){
    $("#btnRegister").click(function(){
        location.href="register.html"
    });

    $("#frmLogin").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var email = $("#inputEmail").val();
        var pass = $("#inputPassword").val();

         var datalist = "inputEmail=" + email + "&inputPassword=" + pass;
            $.ajax({
                type:"post",
                url: "http://192.168.1.7:9999/group4/Login",
                data: datalist,
                cache: false,
                success: function (mydata) {
                    var myData = JSON.parse(mydata);
                    if (myData.status === 1) {
                        //alert("User already Register");
                        sessionStorage.ttoken = email;
                        location.href="index.html";
                    }
                    else {
                        alert("Wrong Username or password");
                    }
                },
                error: function () {
                    console.log("ajax error!");
                    alert("Please contact admin!");
                }
            });
    });
});