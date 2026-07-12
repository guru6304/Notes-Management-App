import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header({ openModal }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-white shadow-sm px-4 py-3 d-flex justify-content-between align-items-center">
      <h4 className="mb-0 fw-bold">My Notes</h4>
      <div className="d-flex align-items-center">
        <button className="btn btn-primary me-4" onClick={openModal}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Note
        </button>

        <div
          className="rounded-circle bg-primary text-white fw-bold d-flex justify-content-center align-items-center"
          style={{
            width: 45,
            height: 45,
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <span className="mx-3 fw-semibold">{user?.name}</span>

        <button className="btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right fs-4"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
