// "use client";

// import { useOrders } from "@/context/OrderContext";
// import Link from "next/link";

// export default function OrdersPage() {
//   const { orders } = useOrders();

//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-20 px-4 text-black">
//         <div className="text-6xl mb-4">📦</div>
//         <h2 className="text-2xl font-bold">No orders yet</h2>
//         <p className="text-gray-500 mt-2">When you buy items, they will appear here.</p>
//         <Link 
//           href="/" 
//           className="mt-6 inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
//         >
//           Start Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto py-12 px-4 text-black">
//       <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Orders</h1>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div 
//             key={order.id} 
//             className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
//           >
//             {/* Order Header */}
//             <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4">
//               <div className="flex gap-8">
//                 <div>
//                   <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Order Placed</p>
//                   <p className="text-sm font-medium">{order.date}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Total</p>
//                   <p className="text-sm font-bold text-orange-600">
//                     ₦{Number(order.total || 0).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-xs uppercase font-bold text-gray-500 tracking-wider text-right">Order #</p>
//                 <p className="text-sm text-gray-600 font-mono">{order.id}</p>
//               </div>
//             </div>

//             {/* Order Items List */}
//             <div className="p-6">
//               <div className="space-y-4">
//                 {order.items.map((item: any, index: number) => (
//                   <div key={index} className="flex items-center gap-4">
//                     {/* Item Image with Sanitization */}
//                     <div className="w-16 h-16 bg-gray-50 rounded-lg border flex-shrink-0 overflow-hidden">
//                       <img 
//                         src={item.image?.replace(/['"]+/g, '') || "https://placehold.co/100"} 
//                         alt={item.name || item.title}
//                         className="w-full h-full object-contain p-2"
//                         onError={(e) => (e.currentTarget.src = "https://placehold.co/100")}
//                       />
//                     </div>
                    
//                     <div className="flex-1">
//                       {/* Displays 'name' primarily, with 'title' as a fallback for old data */}
//                       <h4 className="font-bold text-gray-900 line-clamp-1">
//                         {item.name || item.title || "Unknown Product"}
//                       </h4>
//                       <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-bold text-gray-900">
//                         ₦{Number(item.price || 0).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Order Status Badge */}
//               <div className="mt-6 pt-6 border-t flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <span className={`w-2.5 h-2.5 rounded-full ${order.status === 'Completed' ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`}></span>
//                   <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">
//                     {order.status || "Processing"}
//                   </span>
//                 </div>
//                 <button className="text-orange-500 text-sm font-bold hover:text-orange-600 transition underline underline-offset-4">
//                   View Receipt
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect } from "react";
import { useOrders } from "@/context/OrderContext";
import Link from "next/link";

export default function OrdersPage() {
  const { orders, fetchOrders, loading } = useOrders();

  // Fetch fresh orders from the backend every time this page loads
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-500 font-medium">Fetching your orders from the server...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 px-4 text-black">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold">No orders found</h2>
        <p className="text-gray-500 mt-2">Your backend hasn't recorded any orders for this account yet.</p>
        <Link 
          href="/" 
          className="mt-6 inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-bold"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Order History</h1>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div 
            key={order._id || order.id} 
            className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <div>
                <p className="text-xs uppercase font-bold text-gray-400">Status</p>
                <span className="text-sm font-bold text-green-600 uppercase">
                  {order.status || "Confirmed"}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase font-bold text-gray-400">Order Ref</p>
                <p className="text-sm font-mono text-gray-600">{order._id || order.id}</p>
              </div>
            </div>

            {/* In your current backend, 'getorders' might return IDs or full objects. 
                If it only returns IDs, we'll need to show a simplified list. */}
            <div className="p-6">
              <p className="text-gray-700">
                This order contains <span className="font-bold">{order.products?.length || 0}</span> items.
              </p>
              <div className="mt-4 flex gap-2">
                {order.products?.map((prodId: string, i: number) => (
                  <span key={i} className="bg-gray-100 text-[10px] px-2 py-1 rounded border">
                    ID: ...{prodId.slice(-6)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}