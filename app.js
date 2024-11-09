// URLをリンクに変換する関数
function convertToLink(content) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
}

// 既存の投稿を表示する関数（新しい投稿が上に来るように逆順で表示）
function displayPosts() {
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  // localStorageから投稿データを取得し、逆順にする
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.reverse(); // 最新の投稿が先頭に来るように逆順に

  posts.forEach((post) => {
    const postDiv = document.createElement('div');
    const postContent = document.createElement('p');

    // 投稿内容にURLが含まれているか確認し、リンクに変換
    postContent.innerHTML = `${post.timestamp}: ${convertToLink(post.content)}`;
    postDiv.appendChild(postContent);

    postsDiv.appendChild(postDiv);
  });
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
