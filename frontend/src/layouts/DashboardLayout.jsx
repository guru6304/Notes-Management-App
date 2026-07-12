import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout({
  children,
  openModal,
}) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background: "#f5f7fb",

          minHeight: "100vh",
        }}
      >
        <Header openModal={openModal} />

        <div className="container-fluid py-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
