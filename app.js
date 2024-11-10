function displayPosts() {
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  console.log("Retrieved posts from localStorage:", posts);

  posts.slice().reverse().forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    if (post.editing) {
      postDiv.style.backgroundColor = '#f0f8ff';
      const editInput = document.createElement('textarea');
      editInput.value = post.content;
      postDiv.appendChild(editInput);

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', () => saveEdit(posts.length - 1 - index, editInput.value));
      postDiv.appendChild(saveButton);

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.addEventListener('click', () => cancelEdit(posts.length - 1 - index));
      postDiv.appendChild(cancelButton);
    } else {
      const postContent = document.createElement('p');
      postContent.innerHTML = `${post.timestamp}: ${convertToLink(post.content)}`;
      postDiv.appendChild(postContent);

      // Create ellipsis menu
      const menuButton = document.createElement('button');
      menuButton.textContent = '⋮';
      menuButton.classList.add('menu-button');

      // Dropdown menu container
      const menuContainer = document.createElement('div');
      menuContainer.classList.add('menu-container');
      menuContainer.style.display = 'none';

      // Edit and Delete options in the menu
      const editOption = document.createElement('button');
      editOption.textContent = 'Edit';
      editOption.addEventListener('click', () => enableEdit(posts.length - 1 - index));
      menuContainer.appendChild(editOption);

      const deleteOption = document.createElement('button');
      deleteOption.textContent = 'Delete';
      deleteOption.addEventListener('click', () => deletePost(posts.length - 1 - index));
      menuContainer.appendChild(deleteOption);

      // Toggle dropdown menu on button click
      menuButton.addEventListener('click', () => {
        menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
      });

      // Hide menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!postDiv.contains(e.target)) {
          menuContainer.style.display = 'none';
        }
      });

      postDiv.appendChild(menuButton);
      postDiv.appendChild(menuContainer);
    }

    postsDiv.appendChild(postDiv);
  });
}
