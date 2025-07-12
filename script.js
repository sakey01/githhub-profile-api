const input = document.querySelector('div input[name="username"]');
const btn = document.querySelector(".find-btn");
const dataList = document.querySelector(".data-list");
let login;
let endpoint;

input.focus();

input.addEventListener("input", () => {
  login = input.value.trim();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    input.value = "";
  } else if (e.key === "Enter") btn.click();
});

function getUserData() {
  if (!login) return;
  if (login.includes(" ")) {
    console.log("no spaces allowed");
    return;
  }

  const url = `https://api.github.com/users/${login}`;

  endpoint = fetch(url)
    .then((res) => {
      if (!res.ok) return;
      return res.json();
    })
    .then((data) => {
      dataList.classList.remove("hide");

      dataList.innerHTML += `<img src="${data.avatar_url}" width="100px">`;
      dataList.innerHTML += `<span>ID: ${data.id}</span>`;
      dataList.innerHTML += `<span>User: ${data.login}</span>`;
      dataList.innerHTML += `<span>Name: ${data.name}</span>`;
      dataList.innerHTML += `<span>Location: ${data.location}</span>`;
      dataList.innerHTML += `<span>Public Repositories: ${data.public_repos}</span>`;
      dataList.innerHTML += `<div class="divide"></div>`;
    })
    .catch((error) => console.log("Error"));
}

btn.addEventListener("click", getUserData);
