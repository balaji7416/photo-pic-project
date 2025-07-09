const fetchHomePosts = async () => {
  try {
    const res = await fetch(API_URL + "posts", {
      method: "GET",
    });

    const posts = await res.json();
    const HomeFeed = document.querySelector(".posts");
    HomeFeed.innerHTML = "";

    posts.forEach((post) => {
      let postId = post._id;
      let img_url = post.imageUrl;
      let caption = post.caption;
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");
      postCard.innerHTML = `
              <img src="${img_url}" alt="image-post" class="image-post" />
              <div class="caption">${caption}</div>
              <div class="comment-and-like">
              <div class="likes-field">
              <button class="post-likes" data-postid=${postId}>❤️like</button>
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
  try {
    const res = await fetch(API_URL + `posts/user/${userId}`, {
      method: "GET",
    });
    const posts = await res.json();
    const userFeed = document.querySelector(".user-posts");
    userFeed.innerHTML = "";
    posts.forEach((post) => {
      const image_url = post.imageUrl;
      const caption = post.caption;
      const postcard = document.createElement("div");
      postcard.classList.add("post-card");
      postcard.innerHTML = `
              <img src="${image_url}" alt="image-post" class="image-post" />
              <div class="caption">${caption}</div>
              <div id="comment-and-like">
              <div id="likes-field">
              <button id="post-likes">❤️like</button>
              <span id="likes-count">${post.likes.length || 0}</span>
              </div>
              <div id="comments-field">
              <button  id="post-comments">comment</button>
              <span id="comments-count">${post.comments.length || 0}</span>
              </div>
              </div>
            `;
      userFeed.appendChild(postcard);
    });
  } catch (err) {
    console.log("failed to fetch user Feed", err);
  }
};

const deletePost = async (postId, postElement) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(API_URL + `${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert("Post deleted Successfully");
      postElement.remove();
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

      if (data.message == "Liked Successfully")
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

const UserPostsbtn = document.querySelector(".userPosts");
UserPostsbtn.addEventListener("click", () => {
  document.querySelector(".user-posts-container").classList.toggle("hidden");
  getUserPosts();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("post-likes")) {
    const postId = e.target.dataset.postid;
    toggleLikePost(postId, e.target);
  }
});

fetchHomePosts();
