function Sidebar() {
  return (
    <div
      className="text-white"
      style={{
        width: "240px",

        minHeight: "100vh",

        background: "linear-gradient(180deg,#5A45E6,#3B2DB5)",
      }}
    >
      <div className="text-center py-4">
        <i
          className="bi bi-journal-text"
          style={{
            fontSize: "50px",
          }}
        ></i>

        <h4 className="mt-3">Notes</h4>

        <small>Management</small>
      </div>

      <hr />

      <div
        className="px-4 py-3"
        style={{
          background: "rgba(255,255,255,.15)",
        }}
      >
        <i className="bi bi-stickies me-2"></i>
        All Notes
      </div>
    </div>
  );
}

export default Sidebar;
