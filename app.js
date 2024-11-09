document.getElementById('postForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const content = document.getElementById('content').value;
  
  // 投稿内容を表示する
  const post = document.createElement('div');
  post.textContent = content;
  document.getElementById('posts').appendChild(post);
  
  // フォームをリセット
  document.getElementById('content').value = '';
});
