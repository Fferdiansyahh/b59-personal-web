const { Myproject, User } = require("../../models");
// var button = document.getElementById("my-button-41");
// button.addEventListener("click", changeColor);

// var button = document.getElementById("submit-login");
// button.addEventListener("click", confirmDel);

// var buttons = document.getElementById("my-button-2");
// buttons.addEventListener("click", sweetAlertConfirm);

// document.getElementById("email").addEventListener("change", function (event) {
//   console.log("User salah");
//   if (message.error) {
//     Swal.fire({
//       title: "Error",
//       text: message,
//       icon: "error",
//     });
//   }
// });

// if (message.error) {
//   return async function errorAccount() {
//     await Swal.fire({
//       title: "Deleted!",
//       text: "Project has been deleted .",
//       icon: "Success",
//       background: "#1d2333",
//     });
//   };
// }

function confirmDel(index, successText = "Success") {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    color: "#EBF1F5",
    background: "#1d2333",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#0057ff",
    cancelButtonColor: "#1d2333",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await Swal.fire({
        title: "Deleted!",
        text: "Project has been deleted .",
        icon: "Success",
        background: "#1d2333",
      });
      document.getElementById("mybutton-" + index).click();
    }
  });
}

function confirmEdit(successText = "Success") {
  Swal.fire({
    title: "Are you sure?",
    // text: "You won't be able to revert this!",
    icon: "warning",
    color: "#EBF1F5",
    background: "#1d2333",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#0057ff",
    cancelButtonColor: "#1d2333",
    confirmButtonText: "Yes, edit it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (document.getElementById("image").files.length == 0) {
        console.log("no files selected", images);
        await Swal.fire({
          title: "Edited!",
          text: "Project has been edited .",
          icon: "Success",
          confirmButtonColor: "#0057ff",
          background: "#1d2333",
        });
        document.getElementById("button-edit").click();
      } else {
        await Swal.fire({
          title: "Edited!",
          text: "Project has been edited .",
          icon: "Success",
          confirmButtonColor: "#0057ff",
          background: "#1d2333",
        });
        document.getElementById("button-edit").click();
      }
    }
  });
}

function confirmAdd(successText = "Success") {
  Swal.fire({
    title: "Are you sure?",
    // text: "You won't be able to revert this!",
    icon: "warning",
    color: "#EBF1F5",
    background: "#1d2333",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#0057ff",
    cancelButtonColor: "#1d2333",
    confirmButtonText: "Yes, Post Project!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (document.getElementById("image").files.length == 0) {
        console.log("no files selected", images);
        await Swal.fire({
          title: "Edited!",
          text: "Project has been Posted .",
          confirmButtonColor: "#0057ff",
          icon: "Success",
          background: "#1d2333",
        });
        document.getElementById("button-add").click();
      } else {
        await Swal.fire({
          title: "Edited!",
          text: "Project has been edited .",
          icon: "Success",
          background: "#1d2333",
        });
        document.getElementById("button-add").click();
      }
    }
  });
}

// async function confirmDel(id, res) {
//   console.log("sweet alert");
//   return await Swal.fire({
//     title: "Are you sure?",
//     text: "Do you want delete!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes",
//     cancelButtonText: "No",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // res.redirect("/delete-project:", id);
//       return (
//         (style.backgroundColor = "#ffff00"),
//         Swal.fire({
//           title: "Deleted!",
//           text: "Project has been Change .",
//           icon: "success",
//         })
//       );
//     } else {
//       // return false;
//     }
//   });
// }

function changeColor() {
  Swal.fire({
    title: "Are you sure?",
    text: "You want change Color!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      return (
        alert(),
        Swal.fire({
          title: "Change!",
          text: "Color has been Change .",
          icon: "success",
        })
      );
    }
  });
}

function sweetAlertConfirm() {
  event.preventDefault();
  swal({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(
    function () {
      return isConfirmed;
    },
    function () {
      return isDismissed;
    }
  );
}

function alert() {
  document.getElementById("my-button-41").style.backgroundColor = "green";
}

function addCategory() {
  alert("hello");
  return false;
}

function sendAlert(title, message) {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
  });
}

module.exports = { confirmDel, sendAlert };
