
function Sidebar() {
  const navigation = [
    { name: "Dashboard", icon: "▦", href: "#dashboard" },
    { name: "Registrations", icon: "▤", href: "#registrations" },
    { name: "Car Shows", icon: "🚗", href: "#car-shows" },
    { name: "Reports", icon: "▥", href: "#reports" },
    { name: "Settings", icon: "⚙", href: "#settings" },
  ];

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-slate-900 text-white min-h-screen">
      <div className="border-b border-slate-700 px-6 py-6">
        <h1 className="text-xl font-bold">
          <span className="text-blue-400">Car</span>Show
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Registration System
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-2">
          {navigation.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-700 p-5">
        <p className="text-xs text-slate-400">
          Car Show Registration
        </p>
        <p className="mt-1 text-sm font-medium">
          Admin Dashboard
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
