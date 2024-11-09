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

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // 編集モードかどうかのチェック
    if (post.editing) {
      // 編集モードの場合
      const editInput = document.createElement('textarea');
      editInput.value = post.content;
      postDiv.appendChild(editInput);

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', () => saveEdit(index, editInput.value));
      postDiv.appendChild(saveButton);

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.addEventListener('click', () => cancelEdit(index));
      postDiv.appendChild(cancelButton);
    } else {
      // 通常表示の場合
      const postContent = document.createElement('p');
      postContent.innerHTML = `${post.timestamp}: ${convertToLink(post.content)}`;
      postDiv.appendChild(postContent);

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => enableEdit(index));
      postDiv.appendChild(editButton);

      // 削除ボタンを追加
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deletePost(index));
      postDiv.appendChild(deleteButton);
    }

    postsDiv.appendChild(postDiv);
  });
}

// 編集モードを有効にする関数
function enableEdit(index) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts[index].editing = true;
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// 編集を保存する関数
function saveEdit(index, newContent) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts[index].content = newContent;
  posts[index].editing = false;
  posts[index].timestamp = new Date().toLocaleString(); // 更新日時を設定
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// 編集をキャンセルする関数
function cancelEdit(index) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts[index].editing = false;
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// 投稿を削除する関数
function deletePost(index) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.splice(index, 1); // 指定の投稿を削除
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// フォーム送信時にデータを保存
document.getElementById('postForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const content = document.getElementById('content').value;
  const timestamp = new Date().toLocaleString();

  // 新しい投稿データ
  const newPost = { content, timestamp, editing: false };

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
