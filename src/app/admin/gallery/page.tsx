"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  category: "public" | "private";
}

const defaultGallery: GalleryItem[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1745231991466-19d41014cc66?w=600&q=80", alt: "Couple embracing", category: "public" },
  { id: "2", url: "https://images.unsplash.com/photo-1515531980326-6244280b99c8?w=600&q=80", alt: "Elegant couple", category: "public" },
  { id: "3", url: "https://images.unsplash.com/photo-1515015337340-dbabb1fa63ae?w=600&q=80", alt: "Wedding couple", category: "public" },
  { id: "4", url: "https://images.unsplash.com/photo-1560461723-0fa849b3e03a?w=600&q=80", alt: "Bridal party", category: "public" },
  { id: "5", url: "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?w=600&q=80", alt: "Birthday celebration", category: "public" },
  { id: "6", url: "https://images.unsplash.com/photo-1592599457454-e6ace3370314?w=600&q=80", alt: "Wedding celebration", category: "public" },
];

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery);
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newCategory, setNewCategory] = useState<"public" | "private">("public");
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");

  function addImage() {
    if (!newUrl.trim()) return;
    const item: GalleryItem = {
      id: Date.now().toString(),
      url: newUrl.trim(),
      alt: newAlt.trim() || "Gallery image",
      category: newCategory,
    };
    setGallery([item, ...gallery]);
    setNewUrl("");
    setNewAlt("");
  }

  function removeImage(id: string) {
    setGallery(gallery.filter((g) => g.id !== id));
  }

  const filtered = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Gallery Manager</h1>

      {/* Add new image */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Image</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Image URL"
            className="md:col-span-2 border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-brand-700"
          />
          <input
            type="text"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-brand-700"
          />
          <div className="flex gap-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as "public" | "private")}
              className="flex-1 border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:border-brand-700"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <button
              onClick={addImage}
              className="bg-brand-900 text-white px-4 py-2 text-sm rounded hover:bg-brand-700 transition-colors"
            >
              ADD
            </button>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(["all", "public", "private"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs tracking-wider rounded transition-colors ${
              filter === f
                ? "bg-brand-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
        <span className="text-sm text-gray-500 self-center ml-2">
          {filtered.length} image{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative aspect-[3/4]">
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 truncate">{item.alt}</p>
              <div className="flex justify-between items-center mt-1">
                <span className={`text-[10px] tracking-wider px-2 py-0.5 rounded ${
                  item.category === "public"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {item.category.toUpperCase()}
                </span>
                <button
                  onClick={() => removeImage(item.id)}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images in this category.
        </div>
      )}
    </div>
  );
}
