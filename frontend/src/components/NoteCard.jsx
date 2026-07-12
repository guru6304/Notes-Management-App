function NoteCard({
  note,

  onEdit,

  onDelete,
}) {
  const colors = ["#6C4CF1", "#22C55E", "#F97316", "#EC4899", "#3B82F6"];

  const color = colors[note.id % colors.length];

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderTop: `5px solid ${color}`,

        borderRadius: "16px",
      }}
    >
      <div className="card-body">
        <h5>{note.title}</h5>

        <p className="text-muted">{note.description}</p>
      </div>

      <div className="card-footer bg-white border-0 d-flex justify-content-between">
        <small>{new Date(note.created_at).toLocaleDateString()}</small>

        <div>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => onEdit(note)}
          >
            <i className="bi bi-pencil"></i>
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(note)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;