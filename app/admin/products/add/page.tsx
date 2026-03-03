"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import Image from "next/image";

export default function AdminAddProduct() {
  const { addProduct } = useProducts();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    rating: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addProduct({
      id: Date.now().toString(), // better than length+1
      title: form.title,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image, // <-- your image path remains intact
      category: form.category,
      rating: parseFloat(form.rating || "0"),
    });

    router.push("/admin/products");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form
        className="flex flex-col gap-4 max-w-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (e.g., /images/headphone.jpg)"
          value={form.image}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        {/* Image Preview */}
        {form.image && (
          <div className="relative w-40 h-40 border rounded overflow-hidden">
            <Image
              src={form.image}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (0 - 5)"
          value={form.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
