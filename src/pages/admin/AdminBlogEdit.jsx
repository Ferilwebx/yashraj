import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';

export default function AdminBlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', content: '', excerpt: '', slug: '', featured_image: '',
    seo_title: '', seo_description: '', seo_keywords: '', status: 'draft', author: '',
  });

  useEffect(() => {
    if (!isNew) load();
  }, [id]);

  const load = async () => {
    try {
      const post = await base44.entities.BlogPost.get(id);
      setForm({ title: post.title || '', content: post.content || '', excerpt: post.excerpt || '', slug: post.slug || '', featured_image: post.featured_image || '', seo_title: post.seo_title || '', seo_description: post.seo_description || '', seo_keywords: post.seo_keywords || '', status: post.status || 'draft', author: post.author || '' });
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const update = (k, v) => setForm({ ...form, [k]: v });

  const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const handleSlug = (v) => update('slug', slugify(v));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    update('featured_image', file_url);
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    try {
      const data = { ...form, status: publish ? 'published' : form.status, published_date: publish && !form.published_date ? new Date().toISOString() : form.published_date };
      if (isNew) {
        await base44.entities.BlogPost.create(data);
      } else {
        await base44.entities.BlogPost.update(id, data);
      }
      navigate('/admin/blog');
    } catch (err) { console.error(err); alert('Error saving post.'); } finally { setSaving(false); }
  };

  if (loading) return <div className="p-8 text-slate-400">Loading...</div>;

  const inputClass = "w-full bg-white border border-slate-200 text-sm px-3 py-2.5 rounded-md focus:outline-none focus:border-rose-500";
  const labelClass = "text-xs text-slate-500 block mb-1.5 font-medium";

  return (
    <div className="p-8 max-w-4xl">
      <Link to="/admin/blog" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{isNew ? 'New Blog Post' : 'Edit Post'}</h1>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Title *</label>
          <input value={form.title} onChange={e => { update('title', e.target.value); if (isNew || !form.slug) handleSlug(e.target.value); }} className={inputClass} placeholder="Post title" />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input value={form.slug} onChange={e => handleSlug(e.target.value)} className={inputClass} placeholder="url-slug" />
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea value={form.excerpt} onChange={e => update('excerpt', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Short summary..." />
        </div>
        <div>
          <label className={labelClass}>Content</label>
          <textarea value={form.content} onChange={e => update('content', e.target.value)} rows={12} className={`${inputClass} resize-y font-mono text-xs`} placeholder="Write your post content here..." />
        </div>

        {/* Featured Image */}
        <div>
          <label className={labelClass}>Featured Image</label>
          {form.featured_image ? (
            <div className="relative inline-block">
              <img src={form.featured_image} alt="Featured" className="h-32 rounded-md border border-slate-200" />
              <button onClick={() => update('featured_image', '')} className="absolute -top-2 -right-2 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center"><X className="w-3.5 h-3.5" /></button>
            </div>
          ) : (
            <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 text-sm text-slate-500 rounded-md cursor-pointer hover:border-rose-500 transition-colors w-fit">
              <Upload className="w-4 h-4" /> Upload Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* SEO Fields */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>SEO Title</label>
              <input value={form.seo_title} onChange={e => update('seo_title', e.target.value)} className={inputClass} placeholder="SEO title (defaults to post title)" />
            </div>
            <div>
              <label className={labelClass}>SEO Description</label>
              <textarea value={form.seo_description} onChange={e => update('seo_description', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Meta description for search engines" />
            </div>
            <div>
              <label className={labelClass}>SEO Keywords</label>
              <input value={form.seo_keywords} onChange={e => update('seo_keywords', e.target.value)} className={inputClass} placeholder="comma, separated, keywords" />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Author</label>
          <input value={form.author} onChange={e => update('author', e.target.value)} className={inputClass} placeholder="Author name" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-rose-600/40 text-slate-700 text-xs font-semibold rounded-md transition-colors">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-md transition-colors">
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}