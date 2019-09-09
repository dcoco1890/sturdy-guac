let delBut = $("#del-id");
let idDel = $("#id-del");
let mod = $("#myModal");
let modalHead = $("#title-modal");
let modalBody = $("#body-modal");
let picture = $("#image-modal");
let finalD = $("#delete-modal");
let url = "/api/";

function delItem(e) {
    e.preventDefault();
    delBut.prop("disabled", true);
    let idNum = idDel.val();
    url += idNum;
    console.log(url);
    if (idNum) {
        picture.attr("src", url);
        modalHead.text("WARNING");
        modalBody.text("This action is permanent. Are you sure you want to delete this image?");
        mod.modal();

    } else {
        modalHead.text("ERROR");
        modalBody.text("No number selected");
        mod.modal();
        delBut.prop("disabled", false);

    }

}

function modalYes() {

    $.ajax({
        type: "DELETE",
        url: url,
        success: function(data) {
            console.log(data);
        },
        error: function(e) {
            console.log(e);
        }
    });

}

delBut.on("click", delItem);
finalD.on("click", modalYes);