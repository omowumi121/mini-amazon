// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { apiRequest, Product } from "@/lib/api";
// import toast from "react-hot-toast";

// export default function AdminEditProduct() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: "",
//     category: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // 1. DATA FETCHING: Call the single product API to handle refreshes
//   useEffect(() => {
//     const fetchCurrentProduct = async () => {
//       try {
//         // Backend requires the ID as a query parameter
//         const data = await apiRequest<Product>(`/product?id=${id}`);
//         if (data) {
//           setForm({
//             name: data.name,
//             description: data.description,
//             price: data.price.toString(),
//             image: data.image,
//             category: data.category || "",
//           });
//         }
//       } catch (err: any) {
//         toast.error("Could not load product data");
//         console.error(err);
//       } finally {
//         setFetching(false);
//       }
//     };

//     if (id) fetchCurrentProduct();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 2. SANITIZATION: Clean the image URL before updating
//       const cleanImageUrl = form.image.replace(/['"]+/g, '').trim();

//       await apiRequest("/product/update", {
//         method: "POST",
//         body: JSON.stringify({
//           id: id, // Ensure the ID is passed for the update
//           ...form,
//           image: cleanImageUrl,
//           price: Number(form.price),
//         }),
//       });

//       toast.success("Product updated successfully");
      
//       // 3. HARD REDIRECT: Ensure the management list shows the changes
//       window.location.href = "/admin/products"; 
//     } catch (err: any) {
//       toast.error(err.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) return (
//     <div className="flex items-center justify-center h-[60vh]">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 text-black">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>

//         <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium mb-1">Product Name</label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//               rows={4}
//               className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Price ($)</label>
//             <input
//               type="number"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//               className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Image URL</label>
//             <input
//               type="text"
//               value={form.image}
//               onChange={(e) => setForm({ ...form, image: e.target.value })}
//               className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
//               required
//             />
//             {form.image && (
//               <img
//                 src={form.image.replace(/['"]+/g, '')}
//                 alt="Preview"
//                 className="mt-3 w-40 h-40 object-cover rounded border"
//                 onError={(e) => (e.currentTarget.src = "https://placehold.co/150")}
//               />
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Category</label>
//             <input
//               type="text"
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//               className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
//             />
//           </div>

//           <div className="flex gap-4 mt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition disabled:bg-gray-400 font-bold"
//             >
//               {loading ? "Updating..." : "Save Changes"}
//             </button>
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="flex-1 bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiRequest, Product } from "@/lib/api";
import toast from "react-hot-toast";

// Define your fixed categories here
const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Accessories",
  "Books",
  "Beauty",
];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "", 
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiRequest<Product>(`/product?id=${params.id}`);
        if (data) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            price: data.price?.toString() || "",
            image: data.image?.replace(/['"]+/g, '') || "",
            category: data.category || "", 
          });
        }
      } catch (err: any) {
        toast.error("Could not find that product.");
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProduct();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const payload = {
        ...formData,
        id: Number(params.id),
        price: Number(formData.price),
      };

      await apiRequest(`/product/update?id=${params.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message || "Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-black">Loading...</div>;

  return (
    <main className="p-6 max-w-2xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              required
              step="0.01"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={updating}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-400 transition"
          >
            {updating ? "Saving..." : "Update Product"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}