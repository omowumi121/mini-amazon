// "use client";

// import { useState } from "react";
// import { apiRequest } from "@/lib/api";
// import toast from "react-hot-toast";

// export default function AdminAddProduct() {
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     price: 0,
//     description: "",
//     image: "",
//     category: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. STRIP QUOTES: Removes accidental " or ' characters that cause %22 image errors
//       const cleanImageUrl = form.image.replace(/['"]+/g, '').trim();

//       // 2. BACKEND MATCH: Using the exact /product/add endpoint
//       await apiRequest("/product/add", {
//         method: "POST",
//         body: JSON.stringify({
//           ...form,
//           image: cleanImageUrl,
//           price: Number(form.price),
//         }),
//       });

//       toast.success("Product created!");

//       // 3. HARD REFRESH: Forces the browser to fetch fresh data for the management list
//       window.location.href = "/admin/products"; 
      
//     } catch (err: any) {
//       toast.error(err.message || "Failed to create product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="p-8 max-w-2xl mx-auto text-white">
//       <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-1">
//           <label className="text-sm font-medium">Product Name</label>
//           <input
//             type="text"
//             placeholder="e.g. Wireless Headphones"
//             className="w-full border p-2 rounded text-white"
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium">Image URL</label>
//           <input
//             type="text"
//             placeholder="https://example.com/image.jpg"
//             className="w-full border p-2 rounded text-white"
//             onChange={(e) => setForm({ ...form, image: e.target.value })}
//             required
//           />
//         </div>

//         {form.image && (
//           <div className="relative w-40 h-40 border rounded-lg overflow-hidden bg-white shadow-inner">
//             <img
//               // Preview sanitization to match the saved data logic
//               src={form.image.replace(/['"]+/g, '')}
//               alt="Preview"
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = "https://placehold.co/150";
//               }}
//             />
//           </div>
//         )}

//         <div className="space-y-1">
//           <label className="text-sm font-medium">Price ($)</label>
//           <input
//             type="number"
//             placeholder="99.99"
//             className="w-full border p-2 rounded text-white"
//             onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
//             required
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="text-sm font-medium">Description</label>
//           <textarea
//             placeholder="Tell customers about the product..."
//             className="w-full border p-2 rounded text-white min-h-[100px]"
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold disabled:bg-amber-50 transition-colors shadow-md"
//         >
//           {loading ? "Creating..." : "Create Product"}
//         </button>
//       </form>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/api"; // Using the new helper
import toast from "react-hot-toast";

const CATEGORIES = [
  "Electronics", "Clothing", "Home & Garden", 
  "Accessories", "Books", "Beauty"
];

export default function AdminAddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.category) {
      return toast.error("Please select a category");
    }

    setLoading(true);

    try {
      // We clean the data here to match exactly what worked on your Edit page
      await addProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        image: form.image.replace(/['"]+/g, '').trim(),
        price: Number(form.price), // Essential: must be a number, not string
      });

      toast.success("Product created successfully!");
      
      // Force a refresh so the new product appears in the list immediately
      router.push("/admin/products");
      router.refresh();
      
    } catch (err: any) {
      console.error("Add Product Error:", err);
      toast.error(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold">Product Name</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg bg-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold">Category</label>
            <select
              required
              className="w-full border p-2 rounded-lg bg-white"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full border p-2 rounded-lg bg-white"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold">Image URL</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg bg-white"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            required
            rows={4}
            className="w-full border p-2 rounded-lg bg-white"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold disabled:bg-gray-400 transition-all"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </main>
  );
}

