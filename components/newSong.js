const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
        .then(response => {
            // Handle server response
        })
        .catch(error => {
            // Handle error
        });
});
