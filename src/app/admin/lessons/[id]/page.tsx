'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function EditLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [lessonId, setLessonId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setLessonId(p.id);
      fetch(`/api/lessons/${p.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.lesson) {
            setTitle(data.lesson.title || '');
            setContent(data.lesson.content || '');
            setKeyPoints(data.lesson.keyPoints || '');
            setVideoUrl(data.lesson.videoUrl || '');
            setImageUrl(data.lesson.imageUrl || '');
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  }, [params]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert('ഇമേജ് അപ്‌ലോഡ് പരാജയപ്പെട്ടു.');
      }
    } catch (err) {
      console.error("Upload error", err);
      alert('ഇമേജ് അപ്‌ലോഡ് ചെയ്യുന്നതിൽ തടസം നേരിട്ടു.');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/lessons/${lessonId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, keyPoints, videoUrl, imageUrl }),
    });

    if (res.ok) {
      alert('പാഠം വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു! ✅');
      router.push('/admin/lessons');
    } else {
      alert('അപ്‌ഡേറ്റ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ❌');
    }
  };

  if (loading) return <div className="p-6 text-center">ലോഡ് ചെയ്യുന്നു...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">പാഠം എഡിറ്റ് ചെയ്യുക</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">തലക്കെട്ട് (Title)</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">പാഠഭാഗങ്ങൾ (Content)</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="w-full border p-2 rounded h-32 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">പ്രധാന പോയിന്റുകൾ (Key Points)</label>
          <input 
            type="text" 
            value={keyPoints} 
            onChange={(e) => setKeyPoints(e.target.value)} 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">വീഡിയോ ലിങ്ക് (Video URL)</label>
          <input 
            type="text" 
            value={videoUrl} 
            onChange={(e) => setVideoUrl(e.target.value)} 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">കമ്പ്യൂട്ടർ/മൊബൈലിൽ നിന്ന് ഇമേജ് അപ്‌ലോഡ് ചെയ്യുക</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="w-full border p-2 rounded bg-gray-50" 
          />
          {uploading && <p className="text-blue-500 text-sm mt-1">ഇമേജ് അപ്‌ലോഡ് ചെയ്യുന്നു...</p>}
          
          <input 
            type="text" 
            placeholder="അല്ലെങ്കിൽ ഇമേജ് URL ഇവിടെ നൽകാം"
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            className="w-full border p-2 rounded mt-2 text-sm text-gray-600"
          />

          {imageUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">പ്രിവ്യൂ:</p>
              <img src={imageUrl} alt="Lesson Preview" className="h-32 object-cover rounded border" />
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium">
            മാറ്റങ്ങൾ സേവ് ചെയ്യുക (Update)
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/admin/lessons')} 
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-medium"
          >
            പിന്നോട്ട് പോവുക
          </button>
        </div>
      </form>
    </div>
  );
}