var $submitBtn = $("#submit");
var preview = $("#preview");
var fileInput = $("input[type=\"file\"]");
var sure = $("#u-sure");

function imageSubmit(e) {
    e.preventDefault();
    setTimeout(reload, 3000); // added this to reload the page regardless of whether or not the upload was good
    var form = $("#file")[0];
    var data = new FormData(form); // new formdata object to send to ajax

    $submitBtn.prop("disabled", true); // disables the submit button after it is pressed

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

            $("#result").text(`Success! ${data.name} was uploaded`);
            console.log("SUCCESS : ", data);
            $submitBtn.prop("disabled", false);
        },
        error: function(e) {

            $("#result").text("Needs to be JPG or PNG");
            console.log("ERROR : ", e);
            $submitBtn.prop("disabled", false);
        }
    });
}

// shows preview of image being uploaded
fileInput.on("change", function(e) {
    var url = URL.createObjectURL(e.target.files[0]);
    console.log(e);
    console.log(e.target);
    preview.attr("src", url);
    sure.text("Are you sure you want to upload this image?");

});

function reload() {
    location.reload();
}


$submitBtn.on("click", imageSubmit);