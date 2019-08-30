var $submitBtn = $("#submit");


function imageSubmit(e) {
    e.preventDefault();

    var form = $("#file")[0];
    var data = new FormData(form); // new formdata object to send to ajax

    $submitBtn.prop("disabled", true); // disables the submit button after it is pressed
    console.log(data);

    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/api/upload",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(data) {

            $("#result").text(data);
            console.log("SUCCESS : ", data);
            $submitBtn.prop("disabled", false);

        },
        error: function(e) {

            $("#result").text(e.responseText);
            console.log("ERROR : ", e);
            $submitBtn.prop("disabled", false);

        }
    });
}


$submitBtn.on("click", imageSubmit);