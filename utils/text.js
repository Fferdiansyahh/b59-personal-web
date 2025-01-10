const Swal = require("../Asset/js/sweetalert2@11");

function truncateText(text) {
  const maxLength = 150;
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  } else {
    return text;
  }
}

function alertDelete(event) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function textTechnologies(tech) {
  const text = tech.toString(", ");
  // let text = tech;
  console.log(text);
  return text;
}


function delCheck() {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want delete!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      return (
        (style.backgroundColor = "#ffff00"),
        Swal.fire({
          title: "Deleted!",
          text: "Project has been Change .",
          icon: "success",
        })
      );
    } else {
      return false;
    }
  });
}

module.exports = {
  truncateText,
  alertDelete,
  textTechnologies,
  delCheck,
};
