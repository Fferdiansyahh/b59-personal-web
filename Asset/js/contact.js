var contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var form = e.target;
  var formData = new FormData(form);

  var data = Object.fromEntries(formData.entries());

  console.log(data);
  console.log(data.phoneNumber);

  var link = document.createElement("a");
  link.href = `mailto:ansyah.ferdi5@gmail.com?subject=${data.subject}&body=Selamat siang. %0D%0A %0D%0ANama saya ${data.name}.%0D%0ASilahkan hubungi saya di ${data.email} atau ${data.phoneNumber}.%0D%0ASkill saya adalah ${data.skill}. %0D%0ABerikut pesan saya : ${data.message}`;

  link.click();
});

function convertDate() {
  const date = new Date();
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split("");
  var ddChars = dd.split("");

  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0])
  );
}
