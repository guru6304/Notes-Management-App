import { useEffect, useState } from "react";

function NoteModal({ show, closeModal, saveNote, selectedNote }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (selectedNote) {
      setFormData({
        title: selectedNote.title,
        description: selectedNote.description,
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [selectedNote]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = {
      title: "",
      description: "",
    };

    if (!formData.title.trim()) validation.title = "Title is required";

    if (!formData.description.trim())
      validation.description = "Description is required";

    setErrors(validation);

    if (validation.title || validation.description) return;

    saveNote(formData);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{selectedNote ? "Edit Note" : "Create Note"}</h5>

            <button className="btn-close" onClick={closeModal}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                className={`form-control mb-3 ${errors.title ? "is-invalid" : ""}`}
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />

              <div className="invalid-feedback">{errors.title}</div>

              <textarea
                rows="5"
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <div className="invalid-feedback">{errors.description}</div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button className="btn btn-primary">
                {selectedNote ? "Update Note" : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
