'use client';
import { useState } from 'react';

export default function EditLessonPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // കമ്പ്യൂട്ടറിൽ നിന്നുള്ള ഇമേജ് ഹാൻഡിൽ ചെയ്യാൻ
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // ഇമേജ് അപ്‌ലോഡ് ചെയ്യാനുള്ള API കോൾ (ഉദാഹരണത്തിന് Vercel Blob അല്ലെങ്കിൽ Supabase Storage ഉപയോഗിക്കാം)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.url); // ലഭിച്ച ഇമേജ് യു.ആർ.എൽ സെറ്റ് ചെയ്യുന്നു
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/lessons/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageUrl }),
    });

    if (res.ok) {
      alert('പാഠം വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു!');
    } else {
      alert('അപ്‌ഡേറ്റ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">പാഠം എഡിറ്റ് ചെയ്യുക & ഇമേജ് ചേർക്കുക</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">തലക്കെട്ട് (Title)</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full border p-2 rounded"
            required 
          />
        </div>

        <div>
          <label className="block font-medium">പാഠഭാഗങ്ങൾ (Content)</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="w-full border p-2 rounded h-32"
            required 
          />
        </div>

        <div>
          <label className="block font-medium">കമ്പ്യൂട്ടറിൽ നിന്ന് ഇമേജ് തിരഞ്ഞെടുക്കുക</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded" />
          {uploading && <p className="text-blue-500 text-sm">അപ്‌ലോഡ് ചെയ്യുന്നു...</p>}
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />}
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          മാറ്റങ്ങൾ സേവ് ചെയ്യുക
        </button>
      </form>
    </div>
  );
}