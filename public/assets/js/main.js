$(document).ready(function () {
  $("#registerForm").submit(function (e) {
    e.preventDefault();
    var fullname = $("#fullname").val();
    var username = $("#username").val();
    var password = $("#password").val();
    console.log({ fullname, username, password });

    $.ajax({
      type: "POST",
      url: "/register",
      dataType: "json",
      data: { fullname, username, password },
      success: function (response) {
        $.toast({
          heading: "Success",
          text: response.message,
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  $("#loginForm").submit(function (e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
      type: "POST",
      url: "/login",
      dataType: "json",
      data: { username, password },
      success: function (response) {
        $.toast({
          heading: "Success",
          text: response.message,
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
        });
        window.location.href = "/home";
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });
});
