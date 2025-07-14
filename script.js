const input = document.querySelector('input[name="username"]');
const btn = document.querySelector(".find-btn");
const dataList = document.querySelector(".data-list");

let login = "";

input.focus();

input.addEventListener("input", () => {
  login = input.value.trim();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    input.value = "";
    login = "";
  } else if (e.key === "Enter" && login) {
    getUserData();
  }
});

btn.addEventListener("click", () => {
  getUserData();
});

function showError(message) {
  dataList.classList.remove("hide");
  dataList.innerHTML = `
    <div class="error">
      <p>${message}</p>
      <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
        <strong>Try these popular usernames:</strong><br>
        • <strong>octocat</strong> - GitHub's mascot<br>
        • <strong>torvalds</strong> - Linus Torvalds<br>
        • <strong>your-username</strong> - Your GitHub username
      </p>
    </div>
  `;
}

function getUserData() {
  if (!login) return;
  if (login.includes(" ")) return;

  const url = `https://api.github.com/users/${login}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 403) {
          showError("Rate limit exceeded. Please wait a moment and try again.");
          return null;
        } else if (res.status === 404) {
          showError("User not found. Please check the username.");
          return null;
        } else {
          showError(`Error ${res.status}: Something went wrong. Please try again.`);
          return null;
        }
      }
      return res.json();
    })
    .then((data) => {
      if (!data || !data.id) showError("User not found");
      displayUserProfile(data);
    })
    .catch((error) => {
      showError(error.message);
    });
}

function displayUserProfile(data) {
  dataList.classList.remove("hide");
  dataList.innerHTML = "";

  const profile = document.createElement("div");
  profile.innerHTML = `
    <div class="profile-header">
      <img 
        src="${data.avatar_url}" 
        alt="${data.login}'s avatar" 
        class="profile-avatar"
      />
      <div class="profile-info">
        <h2>${data.name || data.login}</h2>
        <p>@${data.login}</p>
        ${data.bio ? `<p>${data.bio}</p>` : ""}
      </div>
    </div>

    <div class="profile-stats">
      <div class="stat-item">
        <span class="stat-value">${data.public_repos?.toLocaleString() || "0"}</span>
        <span class="stat-label">Repositories</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${data.followers?.toLocaleString() || "0"}</span>
        <span class="stat-label">Followers</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${data.following?.toLocaleString() || "0"}</span>
        <span class="stat-label">Following</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${data.public_gists?.toLocaleString() || "0"}</span>
        <span class="stat-label">Gists</span>
      </div>
    </div>

    <div class="profile-details">
      <div class="detail-item">
        <span class="detail-label">User ID:</span>
        <span class="detail-value">${data.id}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Location:</span>
        <span class="detail-value ${!data.location ? "null" : ""}">${
    data.location || "Not specified"
  }</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Company:</span>
        <span class="detail-value ${!data.company ? "null" : ""}">${
    data.company || "Not specified"
  }</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Blog:</span>
        <span class="detail-value ${!data.blog ? "null" : ""}">
          ${
            data.blog
              ? `<a href="${data.blog}" target="_blank" rel="noopener noreferrer">${data.blog}</a>`
              : "Not specified"
          }
        </span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Twitter:</span>
        <span class="detail-value ${!data.twitter_username ? "null" : ""}">
          ${
            data.twitter_username
              ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank" rel="noopener noreferrer">@${data.twitter_username}</a>`
              : "Not specified"
          }
        </span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Created:</span>
        <span class="detail-value">${
          data.created_at ? new Date(data.created_at).toLocaleDateString() : "N/A"
        }</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Last Updated:</span>
        <span class="detail-value">${
          data.updated_at ? new Date(data.updated_at).toLocaleDateString() : "N/A"
        }</span>
      </div>
    </div>

    <div style="text-align: center; margin-top: 2rem;">
      <a href="https://github.com/${data.login}" target="_blank" rel="noopener noreferrer" style="
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-md);
      " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-lg)'" 
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)'">
        View on GitHub
      </a>
    </div>
  `;

  dataList.appendChild(profile);

  setTimeout(() => {
    dataList.classList.add("show");
  }, 10);
}
