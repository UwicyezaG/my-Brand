function AllBlogs() {
  const blogContainer = document.getElementById("blogContainer");

  fetch("https://my-brand-api-arwz.onrender.com/api/blog/posts/allblog", {})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((blogs) => {
      const blogHTML = blogs
        ?.map((blog) => {
          return `
          <article class="post">
          <input type="hidden" class="blogId" value="${blog.id}">
          <div class="post-thumb">
              <img src="  ${blog.image}" alt="">
              <img src="images/Illustration for cryptocurrency.jpeg" alt="">
          </div>
          <div class="post-info">
              <div class="category-btn" id="enter">${blog.title}</div>
              <h3 class="post-title"><a href="post.html">${blog.category}</a></h3>
              <p class="post-body">${blog.description}</p>
              <div class="post-profile">
                  <div class="commentIcon" style="display: none;">
                      <button type="submit" id="theComment"><i class="fas fa-comment" id="comment"></i>Comments</button>
                  </div>
                  <div class="faire">
                      <div class="editIcon">
                          <button  type="submit" id="editComment">Edit<i class="fas fa-pencil-alt" id="edit"></i></button>
                      </div>
                      <div class="deleteIcon">
                          <button  type="submit" id="deleteComment">Delete<i class="fas fa-trash-alt" id="delete"></i></button>
                      </div>
                  </div>
              </div>
          </div>
      </article>
                `;
        })
        .join("");

      blogContainer.innerHTML = blogHTML;
      console.log(blogs);
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error);
    });
}

document.addEventListener("DOMContentLoaded", AllBlogs());

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#addNewButton");
const cancelButton = document.querySelector("#cancelButton");
const blogform = document.getElementById("newblog");

blogform.addEventListener("click", (event) => {
  event.stopPropagation();
});

showButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

blogform.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("blogTitle").value;
  const category = document.getElementById("blogCategory").value;
  const image = document.getElementById("thumb").value;
  const description = document.getElementById("blogContent").value;

  const data = { title, category, image, description };
  console.log(image);
  fetch("https://my-brand-api-arwz.onrender.com/api/blog/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch((message) => alert(message));
});

document.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".deleteButton");
  if (deleteButton) {
    event.stopPropagation();

    const blogId = deleteButton.closest(".post").querySelector(".blogId").value;

    if (confirm("Are you sure you want to delete this blog post?")) {
      fetch(
        `https://my-brand-api-arwz.onrender.com/api/blog/posts/removeblog/${blogId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the blog post");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);

          deleteButton.closest(".post").remove();
        })
        .catch((error) => {
          console.error("Error deleting blog post:", error);
          alert("Error deleting blog post. Please try again later.");
        });
    }
  }
});
