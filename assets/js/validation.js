$("#contact-form").on("submit", function (event) {
  event.preventDefault();

  $("p.text-danger").text("");

  var $name = $("#name"),
    $email = $("#email"),
    $phone = $("#phone"),
    $type = $("#type"),
    $btn = $("#submit-btn"),
    formValid = true,
    emailRegExp = /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/,
    phoneRegExp = /^(?:0(?!(5|7))(?:2|3|4|8|9))(?:-?\d){7}$|^(0(?=5|7)(?:-?\d){9})$/;

  var userData = {
    name: $name.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    type: $type.val().trim(),
  };

  $btn.attr("disabled", true);
  $btn.find("span.btn-text").hide();
  $btn.find("div.loader").css("display", "inline-block");

  if (userData.name.length < 2 || userData.name.length > 70) {
    formValid = display_error($name, "*A valid name is required");
  }

  if (userData.email.length < 6 || !emailRegExp.test(userData.email)) {
    formValid = display_error($email, "*A valid email is required");
  }

  if (!phoneRegExp.test(userData.phone)) {
    formValid = display_error($phone, "*A valid phone is required");
  }

  if (userData.type == "") {
    formValid = display_error($type, "*Please select type");
  }

  if (formValid) {
    $.ajax({
      type: "POST",
      url: "save-user-data.php",
      dataType: "html",
      data: userData,
      success: function (res) {
        if (res) {
          window.location = "tnx.html";
        }
      },
    });
  } else {
    setTimeout(function () {
      $btn.find("span.btn-text").show();
      $btn.find("div.loader").css("display", "none");
      $btn.attr("disabled", false);
    }, 1000);
  }
});

function display_error(element, message) {
  setTimeout(function () {
    element.next().text(message);
  }, 1000);
  return false;
}
