// 既存の投稿を表示する関数
function displayPosts() {
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.slice().reverse().forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postContent = document.createElement('p');
    postContent.innerHTML = `${post.timestamp}: ${convertToLink(post.content)}`;
    postDiv.appendChild(postContent);

    // 三点リーダーメニューを作成
    const menuButton = document.createElement('button');
    menuButton.textContent = '⋮';
    menuButton.classList.add('menu-button');

    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');

    const editOption = document.createElement('button');
    editOption.textContent = 'Edit';
    editOption.addEventListener('click', () => enableEdit(posts.length - 1 - index));
    menuContainer.appendChild(editOption);

    const deleteOption = document.createElement('button');
    deleteOption.textContent = 'Delete';
    deleteOption.addEventListener('click', () => deletePost(posts.length - 1 - index));
    menuContainer.appendChild(deleteOption);

    menuButton.addEventListener('click', (e) => {
      e.stopPropagation(); // 他のクリックイベントが伝播しないように
      menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
      if (!postDiv.contains(e.target)) {
        menuContainer.style.display = 'none';
      }
    });

    postDiv.appendChild(menuButton);
    postDiv.appendChild(menuContainer);
    postsDiv.appendChild(postDiv);
  });
}

// URLをリンクに変換する関数
function convertToLink(content) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
}

// フォーム送信時の処理
document.getElementById('postForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const content = document.getElementById('content').value;
  const timestamp = new Date().toLocaleString();

  const newPost = { content, timestamp, editing: false };

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(newPost);

  localStorage.setItem('posts', JSON.stringify(posts));

  document.getElementById('content').value = '';
  displayPosts();
});

// 初回ロード時に投稿を表示
displayPosts();
