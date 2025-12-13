import Topbar from "../Components/layout/Topbar";
import Sidebar from "../Components/layout/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Dashboard
            </h2>
            <p className="text-gray-600">
              Welcome to the Crowd Management System Dashboard
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

