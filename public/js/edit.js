const post_id = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-body"]').value;

  const response = await fetch(`/api/post/${post_Id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //console.log(response);
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update your post');
  }
  document.location.replace('/dashboard');
};

const deleteClickHandler = async () => {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('click', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);