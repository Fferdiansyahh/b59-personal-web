function sendAlert(title, message) {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
  });
}
// var button = document.getElementById("submit-login");
// button.addEventListener("click", confirmDelProj);

function confirmDelProj(req, res) {
  return Swal.fire({
    title: "The Internet?Hi Ferdian",
    text: "That thing is still around?",
    icon: "question",
  });
}

function alertLogin() {}

module.exports = {
  sendAlert,
  confirmDelProj,
  alertLogin,
};
