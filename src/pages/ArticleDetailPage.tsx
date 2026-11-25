import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useDemoData();

  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug && p.status === 'Published').slice(0, 3);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#123B56]">Article Not Found</h1>
        <p className="mt-3 text-[#708090]">
          The requested health resource could not be found.
        </p>
        <Link
          to="/health-resources"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#123B56] px-5 py-2.5 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Health Resources
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />

      <article className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/health-resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#168C91] hover:text-[#123B56]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Health Resources
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#708090]">
            <span className="rounded-full bg-[#F3F7F9] px-3 py-1 font-semibold text-[#168C91]">
              {post.category}
            </span>
            <span>{post.read_time}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-extrabold text-[#123B56] sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E4EBEF]">
            <img
              src={post.featured_image}
              alt={post.title}
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#E4EBEF] bg-[#F3F7F9] p-4 text-xs text-[#263746] sm:text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]" aria-hidden="true" />
            <p>
              This educational article is part of the website demonstration. It is not personalised
              medical advice and must be reviewed by qualified clinical staff prior to publication.
            </p>
          </div>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#263746]">
            {paragraphs.map((block, index) => {
              if (block.startsWith('### ')) {
                return (
                  <h2
                    key={index}
                    className="pt-3 font-heading text-xl font-bold text-[#123B56]"
                  >
                    {block.replace('### ', '')}
                  </h2>
                );
              }
              if (block.startsWith('- ')) {
                const items = block.split('\n').map((line) => line.replace(/^- /, ''));
                return (
                  <ul key={index} className="list-disc space-y-2 pl-6 text-[#263746]">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/\*\*/g, '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{block.replace(/\*/g, '')}</p>;
            })}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="border-t border-[#E4EBEF] bg-[#F3F7F9] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-[#123B56]">Related Articles</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E4EBEF] bg-white p-6"
                >
                  <div>
                    <span className="text-xs font-semibold text-[#168C91]">{item.category}</span>
                    <h3 className="mt-2 font-heading text-lg font-bold text-[#123B56]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#708090]">{item.excerpt}</p>
                  </div>
                  <Link
                    to={`/health-resources/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#123B56] hover:text-[#168C91]"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
