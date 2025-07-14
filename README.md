# GitHub API Viewer

Welcome to GitHub API Viewer – an application to fetch and display public GitHub user profile data by username.

## Features

- Search any public GitHub user profile.
- View stats: repositories, followers, following, and gists.
- Display profile info: name, bio, location, company, blog, and Twitter handle.

## Screenshot

<img width="1278" height="699" alt="Screenshot 2025-07-13 at 17 05 48" src="https://github.com/user-attachments/assets/429a37c4-95c6-47af-9123-36b87cdec8ab" />

## Usage

1. Enter a GitHub username (e.g., `sakey01`)
2. Click "View Profile" or press Enter.
3. Profile details will be displayed.

## API Rate Limits

GitHub allows 60 unauthenticated requests per hour per IP.

If you see a "Rate limit exceeded" error:

- Wait for an hour.
- Or use a personal access token for higher limits.

## Using a Personal Access Token (Optional)

1. Generate a token at: https://github.com/settings/tokens (no scopes needed).
2. In `script.js`, update your fetch headers like this:

```js
const token = "YOUR_PERSONAL_ACCESS_TOKEN"; // Replace with your token

async function fetchGitHubProfile(username) {
    try {
        const url = `https://api.github.com/users/${username}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'GitHubProfileViewerApp',
                'Authorization': `token ${token}` // Add this line
            }
        });

        const data = await response.json();
        
    } catch (error) {
        console.error("Error fetching GitHub profile:", error);
    }
}
```

**Important:** Do not share or commit your token publicly.

## License

This project is licensed under the MIT License.

## Credits

Built with the GitHub REST API.
