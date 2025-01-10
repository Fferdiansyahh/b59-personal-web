// const { Myproject, User } = require("../models");

// document.getElementById("email").addEventListener("change", function (event) {
//   Swal.fire({
//     title: "Edited!",
//     text: "Project has been edited .",
//     icon: "Success",
//     background: "#1d2333",
//   });
// });

document.getElementById("image").addEventListener("change", function (event) {
  const preview = document.getElementById("preview");
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove("d-none");
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "#";
    preview.classList.add("d-none");
  }
});

const dropEl = document.querySelector("#dropzone");
const inputEl = document.querySelector("#input");
const dropCtrl = new SimpleDropzone(dropEl, inputEl);

dropzone.on("drop", ({ files }) => {
  console.log(files);
});

// const projectEdit = await Myproject.findOne({ where: { id } });
// const { username } = req.body;
// if (username !== null) {
//   console.log("Hasil Gambar Edit", projectEdit.image);
//   const reader = new FileReader();
//   reader.onload = function () {
//     preview.src = projectEdit.image;
//     preview.classList.remove("d-none");
//   };
// }
