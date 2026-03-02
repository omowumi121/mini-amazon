export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg">Total Products</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg">Total Orders</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg">Revenue</h2>
          <p className="text-2xl font-bold">$0</p>
        </div>
      </div>
    </div>
  );
}
