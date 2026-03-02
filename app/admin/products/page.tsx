export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <a
          href="/admin/products/add"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </a>
      </div>

      <p>No products yet.</p>
    </div>
  );
}
