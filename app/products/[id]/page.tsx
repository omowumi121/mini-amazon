// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { apiRequest, Product } from "@/lib/api";
// import { useCart } from "@/context/CartContext";
// import toast from "react-hot-toast";

// export default function ProductDetailsPage() {
//   const params = useParams();
//   const id = params?.id as string;

//   const { addToCart } = useCart();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         if (!id) throw new Error("Product ID is missing");

//         const numericId = Number(id);

//         if (isNaN(numericId)) {
//           throw new Error("Invalid product ID");
//         }

//         // ✅ FIXED API CALL
//         const data = await apiRequest<Product>(`/product/${numericId}`);

//         setProduct(data);
//       } catch (err: any) {
//         setError(err.message || "Product not found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!product) return;

//     addToCart(product);
//     toast.success(`${product.name} added to cart 🛒`);
//   };

//   /* ======================
//         Loading State
//      ====================== */

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   /* ======================
//         Error State
//      ====================== */

//   if (error || !product) {
//     return (
//       <div className="text-center py-20 px-4">
//         <div className="bg-red-50 inline-block p-6 rounded-2xl border border-red-100">
//           <p className="text-red-500 font-bold text-xl mb-2">Product Error</p>
//           <p className="text-gray-600 mb-4">{error}</p>

//           <button
//             onClick={() => window.location.reload()}
//             className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ======================
//         Product UI
//      ====================== */

//   return (
//     <main className="px-4 py-10 max-w-6xl mx-auto text-black">
//       <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

//         {/* Product Image */}
//         <div className="w-full md:w-1/2 h-[420px] flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="max-h-full w-auto object-contain p-6 hover:scale-105 transition-transform duration-300"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="flex-1 flex flex-col gap-6 justify-center">

//           <div>
//             <span className="text-orange-500 font-bold uppercase text-xs tracking-widest bg-orange-50 px-3 py-1 rounded">
//               {product.category || "General"}
//             </span>

//             <h1 className="text-4xl font-extrabold mt-3 text-gray-900">
//               {product.name}
//             </h1>
//           </div>

//           <p className="text-gray-600 leading-relaxed text-lg">
//             {product.description}
//           </p>

//           <div className="flex items-center gap-6">

//             <p className="text-3xl font-bold text-orange-600">
//               ₦{Number(product.price).toLocaleString()}
//             </p>

//             {product.rating !== undefined && (
//               <p className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
//                 {typeof product.rating === "object"
//                   ? product.rating.rate
//                   : product.rating} ⭐
//               </p>
//             )}

//           </div>

//           <button
//             onClick={handleAddToCart}
//             className="bg-orange-500 text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-orange-600 transition active:scale-95 shadow-lg shadow-orange-100 mt-4"
//           >
//             Add to Cart
//           </button>

//         </div>
//       </div>
//     </main>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiRequest, Product } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string; // Keep as string (matches 69b7b022...)

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) throw new Error("Product ID is missing");

        // ✅ Use the query parameter format your Render backend expects
        const data = await apiRequest<Product>(`/product?id=${id}`);

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Product not found in database");
        }

        setProduct(data);
      } catch (err: any) {
        console.error("Fetch Details Error:", err);
        setError(err.message || "Could not load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center p-20 animate-pulse text-black">Loading...</div>;

  if (error || !product) {
    return (
      <div className="text-center py-20 text-black">
        <h2 className="text-2xl font-bold text-red-600">Product Error</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.href = "/"}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <main className="px-4 py-10 max-w-6xl mx-auto text-black">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 h-[400px] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border">
          <img
            src={product.image?.replace(/['"]+/g, '') || "https://placehold.co/400"}
            alt={product.name}
            className="max-h-full object-contain p-4"
            onError={(e) => (e.currentTarget.src = "https://placehold.co/400")}
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
          <p className="text-3xl font-bold text-orange-600">₦{Number(product.price).toLocaleString()}</p>
          
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart!");
            }}
            className="w-full md:w-auto bg-orange-500 text-white py-4 px-12 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}