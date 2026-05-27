import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-black text-foreground mb-3">Blog</h1>
      <p className="text-muted-foreground mb-12">
        Insights on transportation, travel, and what makes a ride worth booking.
      </p>

      <div className="space-y-10">
        {blogPosts.map((post) => (
          <article key={post.slug} className="border-b border-border pb-10 last:border-0">
            <Link to={`/blog/${post.slug}`} className="group block">
              <div className="overflow-hidden rounded-xl mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {post.date} · {post.readTime}
              </p>
              <h2 className="text-xl font-bold text-foreground group-hover:opacity-70 transition-opacity mb-2">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
