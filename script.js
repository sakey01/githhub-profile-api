const input = document.querySelector('div input[name="username"]');
const btn = document.querySelector(".find-btn");
const dataList = document.querySelector(".data-list");
const profile = document.createElement("div");
let login;

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

  const endpoint = fetch(url)
    .then((res) => {
      if (!res.ok) return;
      return res.json();
    })
    .then((data) => {
      dataList.classList.remove("hide");

      profile.innerHTML += `<a id="profile" href="https://github.com/${data.login}" target="_blank" rel="noopener noreferrer"><img src="${data.avatar_url}" width="100px"></a>`;
      profile.innerHTML += `<span><span class="label">ID: </span>${data.id}</span>`;
      profile.innerHTML += `<span><span class="label">User: </span> ${data.login}</span>`;
      profile.innerHTML += `<span><span class="label">Name: </span> ${data.name}</span>`;
      profile.innerHTML += `<span><span class="label">Bio: </span> ${data.bio}</span>`;
      profile.innerHTML += `<span><span class="label">Location: </span> ${data.location}</span>`;
      profile.innerHTML += `<span><span class="label">Public Repository: </span> ${data.public_repos}</span>`;
      profile.innerHTML += `<span><span class="label">Followers: </span> ${data.followers}</span>`;
      profile.innerHTML += `<div class="divide"></div>`;

      dataList.appendChild(profile);

      if (profile.innerHTML.includes("null")) {
        profile.innerHTML = profile.innerHTML.replace(/null/g, "n/a");
      }
    })
    .catch((error) => {
      proflie.classList.add("hide");
      console.log("ERROR 404");
    });
}

btn.addEventListener("click", getUserData);
