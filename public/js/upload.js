var $submitBtn = $("#submit");
var preview = $("#preview");
var fileInput = $("input[type=\"file\"]");
var sure = $("#u-sure");

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

fileInput.on("change", function(e) {
    var url = URL.createObjectURL(e.target.files[0]);
    preview.attr("src", url);
    sure.text("Are you sure you want to upload this image?")

});

$submitBtn.on("click", imageSubmit);