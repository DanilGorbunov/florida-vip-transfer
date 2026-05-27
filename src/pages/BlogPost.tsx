import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { getBlogPost } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={post.date}
      />
      <Navigation />
      <div className="max-w-2xl mx-auto px-6 py-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <p className="text-xs text-muted-foreground mb-3">
          {post.date} · {post.readTime}
        </p>
        <h1 className="text-3xl font-black text-foreground mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="overflow-hidden rounded-xl mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="space-y-5">
          {post.content.map((block, i) =>
            block.type === "list" ? (
              <ul key={i} className="list-disc list-inside space-y-1.5 ml-2 text-foreground/80">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={i} className="text-foreground/80 leading-relaxed">
                {block.text}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
