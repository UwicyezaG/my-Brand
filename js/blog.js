const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const cancelButton = document.querySelector("dialog");
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
                <div class="post-thumb">
                ${blog.image}
                    // <img src="images/Illustration for cryptocurrency.jpeg" alt="">
                </div>
                <div class="post-info">
                    <div class="category-btn" id="enter">${blog.title}</div>
                    <h3 class="post-title"><a href="post.html">${blog.category}</a></h3>
                    <p class="post-body">
                    ${blog.description}
                    </p>
                    <div class="post-profile">
                         <div class="commenIcon">
                              <i class="fas fa-comment" id="comment"></i>
                         </div>
                      <div class="faire">
                         <div class="editIcon">
                              <i class="fas fa-pencil-alt" id="edit"></i>
                         </div>
                         <div class="deleteIcon">
                             <i class="fas fa-trash-alt" id="delete"></i>
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

function editBlog(blogId) {
  const blog = document.querySelector(`.blog[data-id="${blogId}"]`);
  if (blog) {
      const title = blog.querySelector('.blogTitle').textContent;
      const category = blog.querySelector('.blogCategory').textContent;
      const content = blog.querySelector('.blogContent').textContent;

      
      blogIdInput.value = blogId;
      blogTitleInput.value = title;
      blogCategoryInput.value = category;
      blogContentInput.value = content;

      openDialog('Edit Post');
  }
}

// Add event listener to blog edit icon
blogContainer.addEventListener('click', function(event) {
  const editIcon = event.target.closest('.edit-icon');
  if (editIcon) {
      const blogId = editIcon.dataset.blogId;
      editBlog(blogId);
  }
});
