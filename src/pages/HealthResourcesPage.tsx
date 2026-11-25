import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Info, Search } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useDemoData } from '../context/DemoDataContext';

export const HealthResourcesPage: React.FC = () => {
  const { blogPosts } = useDemoData();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const publishedPosts = useMemo(
    () => blogPosts.filter((p) => p.status === 'Published'),
    [blogPosts]
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(publishedPosts.map((p) => p.category)))],
    [publishedPosts]
  );

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return publishedPosts.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [publishedPosts, search, category]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      <SEO
        title="Health Resources"
        description="Educational articles on laboratory testing, health screening, and diagnostic ultrasound preparation from Omega Medical Laboratory & Scan Center."
      />

      <section className="bg-[#123B56] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Patient Education &amp; Insights
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Health Resources
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Educational guides on preparing for laboratory investigations, understanding screening
            panels, and what to expect before diagnostic imaging.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F7F9] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#E4EBEF] bg-white p-4 text-xs text-[#708090] sm:text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#168C91]" aria-hidden="true" />
            <p>
              <strong>Educational Notice:</strong> Articles below are demonstration health education
              content. They are subject to clinical review before publication and do not constitute
              personalised medical advice.
            </p>
          </div>

          {/* Search & Categories */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    category === cat
                      ? 'bg-[#123B56] text-white'
                      : 'border border-[#E4EBEF] bg-white text-[#263746] hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#708090]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                aria-label="Search health articles"
                className="w-full rounded-xl border border-[#E4EBEF] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#168C91] focus:outline-none"
              />
            </div>
          </div>

          {/* Featured Article */}
          {featuredPost && (
            <article className="mt-8 grid overflow-hidden rounded-2xl border border-[#E4EBEF] bg-white shadow-sm lg:grid-cols-12">
              <div className="h-64 bg-slate-100 lg:col-span-5 lg:h-auto">
                <img
                  src={featuredPost.featured_image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-7 lg:col-span-7 lg:p-10">
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-[#F3F7F9] px-3 py-1 font-semibold text-[#168C91]">
                      Featured • {featuredPost.category}
                    </span>
                    <span className="text-[#708090]">{featuredPost.read_time}</span>
                  </div>
                  <h2 className="mt-4 font-heading text-2xl font-bold text-[#123B56] sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#708090] sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[#E4EBEF] pt-5">
                  <span className="text-xs text-[#708090]">{featuredPost.author}</span>
                  <Link
                    to={`/health-resources/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#123B56] hover:text-[#168C91]"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Article Grid */}
          {filteredPosts.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-[#E4EBEF] bg-white p-12 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-[#708090]" aria-hidden="true" />
              <p className="mt-3 font-heading text-lg font-bold text-[#123B56]">
                No articles match your search
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E4EBEF] bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#168C91]">{post.category}</span>
                        <span className="text-[#708090]">{post.read_time}</span>
                      </div>
                      <h3 className="mt-3 font-heading text-lg font-bold text-[#123B56]">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#708090]">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="border-t border-[#E4EBEF] px-6 py-4">
                    <Link
                      to={`/health-resources/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#123B56] hover:text-[#168C91]"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
