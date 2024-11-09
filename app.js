// サムネイルを取得する関数（Open Graphを利用）
async function fetchThumbnail(url) {
  try {
    const response = await fetch(`https://api.linkpreview.net/?key=YOUR_API_KEY&q=${url}`);
    const data = await response.json();
    return data.image; // サムネイル画像URLを返す
  } catch (error) {
    console.error("Error fetching thumbnail:", error);
    return null;
  }
}

// 既存の投稿を表示する関数
async function displayPosts() {
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  // localStorageから投稿データを取得
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  for (const post of posts) {
    const postDiv = document.createElement('div');
    const postContent = document.createElement('p');

    // 投稿内容にURLが含まれているか確認
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let contentWithLinks = post.content.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
    postContent.innerHTML = `${post.timestamp}: ${contentWithLinks}`;

    postDiv.appendChild(postContent);

    // URLからサムネイルを取得して表示
    const urlMatch = post.content.match(urlRegex);
    if (urlMatch) {
      const thumbnailUrl = await fetchThumbnail(urlMatch[0]);
      if (thumbnailUrl) {
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnailUrl;
        thumbnailImg.alt = "Thumbnail";
        thumbnailImg.style.width = '150px';
        thumbnailImg.style.height = 'auto';
        postDiv.appendChild(thumbnailImg);
      }
    }

    postsDiv.appendChild(postDiv);
  }
}

// フォーム送信時にデータを保存
document.getElementById('postForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const content = document.getElementById('content').value;
  const timestamp = new Date().toLocaleString();

  // 新しい投稿データ
  const newPost = { content, timestamp };

  // 既存の投稿データを取得して新しい投稿を追加
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(newPost);

  // 更新された投稿データをlocalStorageに保存
  localStorage.setItem('posts', JSON.stringify(posts));

  // フォームをクリアして投稿を再表示
  document.getElementById('content').value = '';
  displayPosts();
});

// 初回ロード時に投稿を表示
displayPosts();
