const handleBack = ()=> {
    window.history.back()
}

const onUserClicked = (element) => {
    $("#users-modal").modal("show")
    console.log(element.getAttribute("data-id"));
}