let delBut = $("#del-id");
let idDel = $("#id-del");

function delItem(e) {
    e.preventDefault();
    delBut.prop("disabled", true);
    let idNum = idDel.val();
    console.log(idNum);
}

delBut.on("click", delItem);