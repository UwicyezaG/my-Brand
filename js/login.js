const logInform = document.getElementById("loginform");

logInform.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("passcode").value;

  const credentials = { email, password };
  console.log(credentials);

  fetch("https://my-brand-api-arwz.onrender.com/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((resCredentials) => {
      if (resCredentials.token) {
        localStorage.setItem("AcToken", resCredentials.token);
        console.log("Token:", resCredentials.token);

        location.href = "/dashb.html";
      } else {
        alert(resCredentials.message);
      }
    })
    .catch((error) => alert(error));
});
