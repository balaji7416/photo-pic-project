
const fetchHomePosts = async () => {
    try{
        const res = await fetch(API_URL + "posts", {
            method: "GET",
        });

        const posts =  await res.json();
        const HomeFeed = document.querySelector(".posts");
        HomeFeed.innerHTML = "";

        posts.forEach(post => {
            let img_url = post.imageUrl;
            let caption = post.caption;
            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            postCard.innerHTML = `
              <img src="${img_url}" alt="image-post" class="image-post" />
              <div class="caption">${caption}</div>
            `
            HomeFeed.appendChild(postCard);
        })
    } catch(err){
        console.log("error fetching feed: ",err);
    };
}

const getUserPosts = async() => {
    const userId = localStorage.getItem("userId");
    try{
        const res = await fetch(API_URL + `posts/user/${userId}`,{
            method: "GET"
        });
        const posts = await res.json();
        userFeed = document.querySelector(".user-posts");
        userFeed.innerHTML = ""
        posts.forEach(post => {
            const image_url = post.imageUrl;
            const caption = post.caption;
            const postcard = document.createElement("div");
            postcard.classList.add("post-card");
            postcard.innerHTML= `
              <img src="${image_url}" alt="image-post" class="image-post" />
              <div class="caption">${caption}</div>
            `
            userFeed.appendChild(postcard);
        })
    } catch(err) {
        console.log("failed to fetch user Feed", err);
    }
};

 const UserPostsbtn = document.querySelector(".userPosts")
 UserPostsbtn.addEventListener("click", () => {
    getUserPosts();
 })

fetchHomePosts();