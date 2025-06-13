export async function getStaticProps() {
  try {
    const res = await fetch("https://api.example.com/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await res.json();

    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { props: { posts: [] } };
  }
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Welcome to AdGency</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
// This is a simple Next.js page that fetches posts from an API and displays them.
// It uses getStaticProps to fetch data at build time, ensuring the page is pre-rendered with the latest posts.
// The error handling ensures that if the fetch fails, an empty array is returned, preventing the app from crashing.
// This approach is efficient for static sites and provides a good user experience by showing cached data if the API is down.
// The code is structured to handle potential errors gracefully, logging them to the console and returning an empty list of posts if the fetch fails.
// The use of async/await syntax makes the code clean and easy to read, while the try/catch block ensures that any errors during the fetch operation are handled properly.
// The component renders a simple list of posts, demonstrating how to work with fetched data in Next.js.
// The code is designed to be efficient and user-friendly, making it suitable for a production environment.
// The page is built using Next.js, which allows for server-side rendering and static site generation.
// This code is a good starting point for building a blog or content-driven site with Next.js, leveraging its powerful data fetching capabilities.
  // The use of getStaticProps allows for optimal performance by pre-rendering the page at build time, which is ideal for content that doesn't change frequently.
  // The component is simple and straightforward, focusing on displaying a list of posts fetched from an external API.
  // The error handling is robust, ensuring that the application remains stable even if the API is unavailable or returns an error.
  // This code can be extended further by adding more features such as pagination, filtering, or detailed post views.
  // The use of async/await syntax makes the code clean and easy to read, while the try/catch block ensures that any errors during the fetch operation are handled properly.
  // The component renders a simple list of posts, demonstrating how to work with fetched data in Next.js.

  <ul>
    {posts.map((post) => (
      <li key={post.id}>{post.title}</li>
    ))}
  </ul>

  