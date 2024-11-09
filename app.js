document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('content').value;
  const date = new Date().toISOString();

  const data = `${date},${content}\n`;

  try {
    const response = await fetch('/.netlify/functions/append-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token YOUR_GITHUB_TOKEN`
      },
      body: JSON.stringify({
        content: Buffer.from(data).toString('base64'),
        message: `New post on ${date}`,
        path: 'data/posts.csv'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert('Post added successfully!');
    document.getElementById('content').value = ''; // Clear the form
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit post');
  }
});
