const API_URL = "https://photo-pic-project-backend.onrender.com/api/";

const uploadPost = async () => {
  const fileInput = document.querySelector("#upload-post-img");
  const caption = document.querySelector("#upload-caption").value.trim();
  const token = localStorage.getItem("token");

  if (fileInput.files.length === 0 || !caption) {
    alert("Please upload a image and add caption");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("image", file);
  formData.append("caption", caption);

  try {
    const res = await fetch(API_URL + "posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Post uploaded successfully");
      document.querySelector(".upload-form").reset();
      document.querySelector(".form-container").classList.remove("show");
      appendNewPostToFeed(data);
      fetchHomePosts();
    } else {
      alert("Upload failed: " + (data.message || "unknown error"));
    }
  } catch (err) {
    console.log("something went wronng: ", err);
  }
};
document.querySelector(".upload-form").addEventListener("submit", (e) => {
  e.preventDefault();
  uploadPost();
});
document.querySelector(".add-post-option").addEventListener("click", () => {
  document.querySelector(".form-container").classList.add("show");
})
document.querySelector(".add-post").addEventListener("click", () => {
  document.querySelector(".form-container").classList.add("show");
});

document.querySelector(".cancel-post").addEventListener("click", () => {
  document.querySelector(".form-container").classList.remove("show");
});

const appendNewPostToFeed = (post) => {
  const userId = localStorage.getItem("userId");
  const likedByUser = post.likes.includes(userId);
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");
  postCard.innerHTML = `
              <img src="${
                post.image_url
              }" alt="image-post" class="image-post" />
              <div class="caption">${post.caption}</div>
              <div class="comment-and-like">
              <div class="likes-field">
              <button class="post-likes ${
                likedByUser ? "on-like" : ""
              }" data-postid=${post.Id} >❤️like</button>
              <span class="likes-count">${post.likes.length}</span>
              </div>
              <div class="comments-field">
              <button  class="post-comments">comment</button>
              <span class="comments-count">${post.comments.length}</span>
              </div>
              </div>
            `;
  document.querySelector(".posts").prepend(postCard);
};

const uploadForm = document.querySelector(".upload-form");
const formContainer = document.querySelector(".form-container");

document.addEventListener("click", (e) => {
  if(!uploadForm.contains(e.target) && 
     !e.target.classList.contains("add-post") &&
     !e.target.classList.contains("add-post-option")){
      formContainer.classList.remove("show");
     }
})