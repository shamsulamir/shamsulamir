const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('username');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();

  if (!username) {
    resultDiv.innerHTML = '<p style="color: #f85149;">Please type a username first.</p>';
    return;
  }

  resultDiv.innerHTML = '<p>Fetching data from GitHub...</p>';

  try {
    // Calling GitHub's free open API
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.status === 404) {
      resultDiv.innerHTML = '<p style="color: #f85149;">User not found on GitHub.</p>';
      return;
    }

    const data = await response.json();

    // Displaying the retrieved data inside the card
    resultDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="Avatar" class="avatar" />
      <h3 style="margin: 10px 0 4px 0; color: #fff;">${data.name || data.login}</h3>
      <p style="font-size: 13px; color: #8b949e; margin-top: 0;">${data.bio || 'No bio provided'}</p>
      
      <div class="stats">
        <span>📦 Repos: <b>${data.public_repos}</b></span>
        <span>👥 Followers: <b>${data.followers}</b></span>
      </div>

      <a href="${data.html_url}" target="_blank" class="profile-link">View Full GitHub Profile →</a>
    `;
  } catch (error) {
    resultDiv.innerHTML = '<p style="color: #f85149;">Something went wrong. Check your internet connection.</p>';
  }
});