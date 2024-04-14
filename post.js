// Function to fetch and display all blog posts on user interface
function AllBlogs() {
    const blogContainer = document.getElementById("blogContainer");
  
    fetch("https://my-brand-api-arwz.onrender.com/api/blog/posts/allblog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((blogs) => {
        const blogHTML = blogs.map((blog) => {
          return `
            <article class="post">
              <div class="post-thumb">
                <img src="${blog.image}" alt="">
              </div>
              <div class="post-info">
                <h3 class="post-title">${blog.title}</h3>
                <p class="post-body">${blog.description}</p>
                <button class="readButton" data-blog-id="${blog.id}">Read</button>
              </div>
            </article>
          `;
        }).join("");
  
        blogContainer.innerHTML = blogHTML;
  
        // Add event listener to each "Read" button
        document.querySelectorAll('.readButton').forEach(button => {
          button.addEventListener('click', () => {
            const blogId = button.getAttribute('data-blog-id');
            // Redirect to individual post page with blogId as parameter
            window.location.href = `post.html?id=${blogId}`;
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }
  
  document.addEventListener("DOMContentLoaded", AllBlogs);
  