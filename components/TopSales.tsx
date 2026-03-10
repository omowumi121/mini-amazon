"use client"

type Product = {
  id: number
  title: string
  price: number
  oldPrice?: number
  img: string
}

const products: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 12000,
    oldPrice: 18000,
    img: "/topsales1.jpg",
  },
  {
    id: 2,
    title: "Rechargeable Mini Fan",
    price: 8500,
    oldPrice: 12000,
    img: "/topsales2.jpg",
  },
  {
    id: 3,
    title: "Smart Watch Series 9",
    price: 45000,
    oldPrice: 60000,
    img: "/topsales3.jpg",
  },
  {
    id: 4,
    title: "Dubia latest Abaya",
    price: 380000,
    oldPrice: 400000,
    img: "/topsales4.jpg",
  },
  {
    id: 5,
    title: "Portable Bluetooth Speaker",
    price: 16000,
    oldPrice: 21000,
    img: "/topsales5.jpg",
  },
  {
    id: 6,
    title: "LED Ring Light",
    price: 17000,
    oldPrice: 20000,
    img: "/topsales6.jpg",
  },
]

export default function TopSales() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-xl font-bold mb-6">
          Top Sales
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-md p-2 hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
            >

              {/* Image */}
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-36 object-cover rounded-md"
                />

                {/* Discount badge */}
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  -20%
                </span>
              </div>

              {/* Title */}
              <p className="text-sm mt-2 line-clamp-2">
                {product.title}
              </p>

              {/* Price */}
              <p className="text-orange-500 font-bold text-sm mt-1">
                ₦{product.price.toLocaleString()}
              </p>

              {/* Old Price */}
              {product.oldPrice && (
                <p className="text-gray-400 text-xs line-through">
                  ₦{product.oldPrice.toLocaleString()}
                </p>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
