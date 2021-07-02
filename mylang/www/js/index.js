$(function () {
    if (!sessionStorage.ttoken || sessionStorage.ttoken === null)
        location.href = "login.html";

    //$("#idSpan").val = sessionStorage.ttoken;
    document.getElementById("idSpan").innerHTML = sessionStorage.ttoken;


    var link1 = crossroads.addRoute("/logout", function () {
        sessionStorage.clear();
        location.href = "login.html";
    });

    var link2 = crossroads.addRoute("", function () {
        $("#divHome").show();
        $("#divColour").hide();
        $("#divNumber").hide();
        $("#divfamily").hide();
        $("#divfruit").hide();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").hide();
    });

   
    //memory
    var link7 = crossroads.addRoute("/btnAddMemory", function () {
        $("#divHome").hide();
        $("#divColour").hide();
        $("#divNumber").hide();
        $("#divfamily").hide();
        $("#divfruit").hide();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").show();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").hide();
    });

var link11 = crossroads.addRoute("/mymemory", function () {
    $(".navbar-collapse li").removeClass("active");
    $(".navbar-collapse li a[href='#mymemory']").parent().addClass("active");
    var email = sessionStorage.ttoken;
    var datalist = "email=" + email;
    $.ajax({
        type: "post",
        url: "http://192.168.1.7:9999/group4/GetMemoryData",
        data: datalist,
        cache: false,
        success: function (mydata) {
            var myData = JSON.parse(mydata);

            var lastIndex = myData.length - 1;
            var htmlText = "";
            if (myData[lastIndex].status === 1) {
                for (var i = 0; i < lastIndex; i++) {
                    htmlText = htmlText + "<tr><td>" + myData[i].id
                    + "</td><td><a href='#viewmemory/" + myData[i].id + "'>" + myData[i].title
                    + "</a></td><td>" + myData[i].category
                    + "</td><td>" + myData[i].date
                    + "</td><td><a href='#delmemory'><span class='glyphicon glyphicon-trash'data-id="
                    + myData[i].id
                    + "</span></a></td></tr>";
                }

                $("#tblMemory tbody").html(htmlText);
            }
        },
        error: function () {
            console.log("ajax error!");
            alert("Please contact admin!");
        }
    });
    $("#divHome").hide();
    $("#divColour").hide();
    $("#divNumber").hide();
    $("#divfamily").hide();
    $("#divfruit").hide();
    $("#divHiragana").hide();
    $("#divmemory").show();
    $("#divAddMemory").hide();
    $("#divEditMemory").hide();
    $("#divAbout").hide();
    $("#divProfile").hide();
   
});

var link5 = crossroads.addRoute("/viewmemory/{id}", function (id) {

    var datalist = "id=" + id;
    $.ajax({
        type: "post",
        url: "http://192.168.1.7:9999/group4/GetMemoryDataById",
        data: datalist,
        cache: false,
        success: function (mydata) {
            var myData = JSON.parse(mydata);

            if (myData.status === 1) {
                document.getElementById("title").value = myData.title;
                document.getElementById("category").value = myData.category;
                document.getElementById("id").value = myData.id;
               
            }
            $("#divHome").hide();
            $("#divColour").hide();
            $("#divNumber").hide();
            $("#divfamily").hide();
            $("#divfruit").hide();
            $("#divHiragana").hide();
            $("#divmemory").hide();
            $("#divAddMemory").hide();
            $("#divEditMemory").show();
            $("#divAbout").hide();
            $("#divProfile").hide();
        },
        error: function () {
            console.log("ajax error!");
            alert("Please contact admin!");
        }
    });
});

$("#frmAddMemory").submit(function (e) {
    e.preventDefault();
    e.stopPropagation();

    var title = $("#title").val();
    var category = $("#category").val();

    var datalist = "title=" + title + " &category=" + category + "&owneremail=" + sessionStorage.ttoken;
    $.ajax({
        type: "post",
        url: "http://192.168.1.7:9999/group4/AddMemory",
        data: datalist,
        cache: false,
        success: function (mydata) {
            var myData = JSON.parse(mydata);
            if (myData.status === 1) {
                alert("Add Memory Success!");
                $("#divmemory").hide();
            }
            else {
                alert("Add Memory Failed");
            }
        },
        error: function () {
            console.log("ajax error!");
            alert("Please contact admin!");
        }
    });
});

$("#frmEditMemory").submit(function (e) {
    e.preventDefault();
    e.stopPropagation();

    var title = $("#title100").val();
    var category = $("#category100").val();
    var id = $("#id").val();

    var datalist = "title=" + title + " &category=" + category + "&id=" + id;
    $.ajax({
        type: "post",
        url: "http://192.168.1.7:9999/group4/UpdateMemoryByid",
        data: datalist,
        cache: false,
        success: function (mydata) {
            var myData = JSON.parse(mydata);
            if (myData.status === 1) {
                alert("Update Memory Success!");
                $("#divEditMemory").hide();
               
            }
            else {
                alert("Update Memory Failed");
            }
        },
        error: function () {
            console.log("ajax error!");
            alert("Please contact admin!");
        }
    });
});

$("#tblMemory tbody").on("click", "span", function () {
    var  id = $(this).data("id");
    datalist = "id=" + id;
    var parentTR = $(this).parent().parent().parent();
    bootbox.confirm("Are you sure want to delete?", function (answer) {
        if (answer) {
            $.ajax({
                type: "post",
                url: "http://192.168.1.7:9999/group4/DelMemoryById",
                data: datalist,
                cache: false,
                success: function (mydata) {
                    var myData = JSON.parse(mydata);
                    if (myData.status === 1) {
                        alert("Delete Memory Success!");
                        $(parentTR).fadeOut("slow", "swing", function () {
                            $(parentTR).remove();
                        });
                    }
                    else {
                        alert("Delete Memory Failed");
                    }
                },
                error: function () {
                    console.log("ajax error!");
                    alert("Please contact admin!");
                }
            });
        }
        else {
            bootbox.alert("Delete canceled!");
        }
    });
});

 //profile
 var link15 = crossroads.addRoute("/profile", function () {
    $(".navbar-collapse li").removeClass("active");
    $(".navbar-collapse li a[href='#profile']").parent().addClass("active");
    var email = sessionStorage.ttoken;
    var datalist = "email=" + email;
    $.ajax({
        type: "post",
        url: "http://192.168.1.7:9999/group4/GetProfileData",
        data: datalist,
        cache: false,
        success: function (mydata) {
            var myData = JSON.parse(mydata);
            var lastIndex = myData.length - 1;
            var htmlText = "";
            if (myData[lastIndex].status === 1) {
                for (var i = 0; i < lastIndex; i++) {
                    htmlText = htmlText + "<tr><td>" + myData[i].email
                        + "</td><td>" + myData[i].password
                        + "</td></tr>";
                }
                $("#tblProfile tbody").html(htmlText);
            }
        },
        error: function () {
            console.log("ajax error!");
            alert("Please contact admin!");
        }
    });
        $("#divHome").hide();
        $("#divColour").hide();
        $("#divNumber").hide();
        $("#divfamily").hide();
        $("#divfruit").hide();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").show();
});

//home

    $("#btncolour").click(function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#divHome']").parent().addClass("active");
        $("#divHome").hide();
        $("#divColour").show();
        $("#divNumber").hide();
        $("#divfamily").hide();
        $("#divfruit").hide();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").hide();
    });

    $("#btnnumber").click(function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#divHome']").parent().addClass("active");
        $("#divHome").hide();
        $("#divColour").hide();
        $("#divNumber").show();
        $("#divfamily").hide();
        $("#divfruit").hide();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").hide();

    });

    $("#btnfamily").click(function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#divHome']").parent().addClass("active");
        $("#divHome").hide();
        $("#divColour").hide();
        $("#divNumber").hide();
        $("#divfamily").show();
        $("#divfruit").hide();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").hide();

    });

    $("#btnfruit").click(function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#divHome']").parent().addClass("active");
        $("#divHome").hide();
        $("#divColour").hide();
        $("#divNumber").hide();
        $("#divfamily").hide();
        $("#divfruit").show();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").hide();

    });

    var link6 = crossroads.addRoute("/Hiragana", function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#Hiragana']").parent().addClass("active");
        $("#divHome").hide();
        $("#divColour").hide();
        $("#divNumber").hide();
        $("#divfamily").hide();
        $("#divfruit").hide();
        $("#divHiragana").show();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").hide();
        $("#divProfile").hide();

    });

    var link8 = crossroads.addRoute("/about", function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#about']").parent().addClass("active");
        $("#divHome").hide();
        $("#divColour").hide();
        $("#divNumber").hide();
        $("#divfamily").hide();
        $("#divfruit").hide();
        $("#divHiragana").hide();
        $("#divmemory").hide();
        $("#divAddMemory").hide();
        $("#divEditMemory").hide();
        $("#divAbout").show();
        $("#divProfile").hide();


    });


    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

});