const searchBar = document.querySelector(".search-bar");
const resultContainer = document.querySelector(".user-search-results");

searchBar.addEventListener("input", async() => {
    try{
        const query = searchBar.value.trim();
        if(!query){
            return;
        }
        
        const res = await fetch(API_URL + `users/search?q=${query}`, {
            method: "GET",
        });

        const users = await res.json();
        resultContainer.classList.add("show");
        if(!users){
            const searchItem = document.createElement("div");
            searchItem.classList.add("user-search-option");
            resultContainer.innerHTML="";
            searchItem.innerHTML=`
            No results found
            `;
            resultContainer.appendChild(searchItem);
        }
        else{
            resultContainer.innerHTML="";
            users.forEach(user =>{
            const searchItem = document.createElement("div");
            searchItem.classList.add("user-search-option");
            searchItem.setAttribute("data-userid",user._id)
            searchItem.innerHTML=`
                ${user.username}
            `
            resultContainer.appendChild(searchItem);
            });
            
        }
    } catch(err) {
        console.log("something went wrong: ",err);
        alert("somethign went wrong");
    }
});

const getUserSearchPosts = async (userId) => {
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
              <button class="post-likes ${likedByUser ? "on-like": ""}" data-postid=${postId} >❤️like</button>
              <span class="likes-count">${post.likes.length}</span>
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


document.addEventListener("click", (e) => {
    if(!searchBar.contains(e.target) && !resultContainer.contains(e.target)){
        resultContainer.classList.remove("show");
    }
    if(e.target.classList.contains("user-search-option")){
          const userPosts = document.querySelector(".user-posts-container");
          getUserSearchPosts(e.target.dataset.userid)
          userPosts.classList.add("show");
    }
});


