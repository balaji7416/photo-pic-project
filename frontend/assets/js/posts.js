const fetchHomePosts = async () => {
  try {
    const res = await fetch(API_URL + "posts", {
      method: "GET",
    });

    const posts = await res.json();
    const HomeFeed = document.querySelector(".posts");
    HomeFeed.innerHTML = "";
    const userId = localStorage.getItem("userId");
    posts.forEach((post) => {
      let postId = post._id;
      let img_url = post.imageUrl;
      let caption = post.caption;
      const likedByUser = post.likes.includes(userId) ? true : false;
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");
      postCard.innerHTML = `
              <img src="${img_url}" alt="image-post" class="image-post" />
              <div class="caption">${caption}</div>
              <div class="comment-and-like">
              <div class="likes-field">
              <button class="post-likes ${likedByUser ? "on-like": ""}" data-postid=${postId} >❤️like</button>
              <span class="likes-count">${post.likes.length}</span>
              </div>
              <div class="comments-field">
              <button  class="post-comments">comment</button>
              <span class="comments-count">${post.comments.length}</span>
              </div>
              </div>
            `;
      HomeFeed.appendChild(postCard);
    });
  } catch (err) {
    console.log("error fetching feed: ", err);
  }
};

const getUserPosts = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("User not logged in.");
    return;
  }
  try {
    const res = await fetch(API_URL + `posts/user/${userId}`, {
      method: "GET",
    });
    const posts = await res.json();
    if(res.ok) console.log("fetched user posts with status",res.status)
    if(!res.ok) console.log("failed to fetch userPosts");

    const userFeed = document.querySelector(".user-posts");
    userFeed.innerHTML = "";
    console.log(posts.length)
    if (!posts.length) {
      userFeed.innerHTML = "<div>No posts found.</div>";
      return;
    }
    posts.forEach((post) => {
      let postId = post._id;
      let img_url = post.imageUrl;
      let caption = post.caption;
      const likedByUser = post.likes.includes(userId) ? true : false;
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");
      postCard.innerHTML = `
              <img src="${img_url}" alt="image-post" class="image-post" />
              <div class="caption">${caption}</div>
              <div class="comment-and-like">
              <div class="likes-field">
              <button class="post-likes ${likedByUser ? "on-like": ""}" data-postid=${postId} data-isliked=${likedByUser}>❤️like</button>
              <span class="likes-count">${post.likes.length}</span>
              </div>
              <div class="delete-btn-container">
              <button class="user-post-delete-btn" data-postid=${postId} data-postelement=${postCard}>delete</button>
              </div>
              <div class="comments-field">
              <button  class="post-comments">comment</button>
              <span class="comments-count">${post.comments.length}</span>
              </div>
              </div>
            `;
      userFeed.appendChild(postCard);
    });
  } catch (err) {
    console.log("failed to fetch user Feed", err);
  }
};

const deletePost = async (postId, postElement) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(API_URL + `posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert("Post deleted Successfully");
      try{
        postElement.remove();
      } catch(err){
        console.log("error:",err)
      }
      
    } else {
      alert("Failed to delete post: " + (data.message || "unknown error"));
    }
  } catch (err) {
    console.log("Error deleting post", err);
    alert("Something went wrong while deleting..");
  }
};

const toggleLikePost = async (postId, likeBtn) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL + `posts/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data.message, data);
      const likesElement = likeBtn.nextElementSibling;
      likesElement.textContent = data.likesCount;

      if (data.action =="like")
        likeBtn.classList.add("on-like");
      else likeBtn.classList.remove("on-like");
    } else {
      console.log("failed to like post");
    }
  } catch (err) {
    console.log("something went wrong :", err);
    alert("failed to like post");
  }
};

// const UserPostsbtn = document.querySelector(".user-posts-sidebar");
// UserPostsbtn.addEventListener("click", () => {
//   document.querySelector(".user-posts-container").classList.add("show");
//   getUserPosts();
// });

document.addEventListener("click", (e) => {

  if(e.target.classList.contains("user-posts-sidebar")){
      document.querySelector(".user-posts-container").classList.add("show");
      getUserPosts();
  }
  if (e.target.classList.contains("post-likes")) {
    const postId = e.target.dataset.postid;
    toggleLikePost(postId, e.target);
  }
  if(e.target.classList.contains("user-post-delete-btn")){
    const postId = e.target.dataset.postid;
    const postElement = e.target.closest(".post-card");
    deletePost(postId,postElement);
  }
  if(e.target.classList.contains("user-posts-cancel-btn")){
    const userPosts = document.querySelector(".user-posts-container");
    userPosts.classList.remove("show");
  }
});



fetchHomePosts();
