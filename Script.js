function postMessage() {
    const postText = document.getElementById("post-text").value;
    
    if (postText.trim() !== "") {
        const feed = document.querySelector(".feed");
        const newPost = document.createElement("div");
        newPost.classList.add("post");

        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");

        const profilePic = document.createElement("img");
        profilePic.src = "profile-pic.jpg"; // Replace with your profile pic URL
        profilePic.alt = "Profile Pic";

        const userName = document.createElement("h3");
        userName.textContent = "John Doe"; // Replace with dynamic user name

        const postTime = document.createElement("span");
        postTime.textContent = "Just now";

        postHeader.appendChild(profilePic);
        postHeader.appendChild(userName);
        postHeader.appendChild(postTime);

        const postContent = document.createElement("p");
        postContent.textContent = postText;

        newPost.appendChild(postHeader);
        newPost.appendChild(postContent);

        feed.prepend(newPost);
        document.getElementById("post-text").value = ""; // Clear the text area
    } else {
        alert("Please write something to post!");
    }
}