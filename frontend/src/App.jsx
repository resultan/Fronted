import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import RegistrationTable from "./components/RegistrationTable";

function StatCard({ title, value, description, icon, color }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-xl ${color}`}>
          {icon}
        </div>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-slate-800">
        {value}
      </h3>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

function App() {
  const statistics = [
    {
      title: "Total Registrations",
      value: "25",
      description: "All sample registrations",
      icon: "📋",
      color: "bg-blue-100",
    },
    {
      title: "Approved",
      value: "14",
      description: "Successfully approved",
      icon: "✓",
      color: "bg-green-100",
    },
    {
      title: "Pending",
      value: "8",
      description: "Waiting for review",
      icon: "◷",
      color: "bg-yellow-100",
    },
    {
      title: "Rejected",
      value: "3",
      description: "Rejected applications",
      icon: "✕",
      color: "bg-red-100",
    },
    {
      title: "Total Car Shows",
      value: "5",
      description: "Sample car show events",
      icon: "🚗",
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Header />

        <main id="dashboard" className="p-6 lg:p-8">
          <section className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome to Car Show Registration!
            </h1>

            <p className="mt-2 text-slate-500">
              Here's an overview of your car show registration system.
            </p>
          </section>

          <section className="mb-8">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-800">
                Dashboard Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Summary of registration activities
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {statistics.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>
          </section>

          <RegistrationTable />
        </main>
      </div>
    </div>
  );
}

export default App;
