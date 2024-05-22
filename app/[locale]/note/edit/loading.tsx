export default function EditSkeleton() {
  return (
    <div
      className="note-editor skeleton-container"
      role="progressbar"
      aria-busy="true"
    >
      <div className="note-editor-form">
        <div className="skeleton v-stack" style={{ height: "3rem" }}></div>
        <div className="skeleton v-stack" style={{ height: "100%" }}></div>
      </div>
      <div className="note-editor-preview">
        <div className="note-editor-menu">
          <div
            className="skeleton skeleton--button"
            style={{ width: "8em", height: "2.5em" }}
          ></div>
          <div
            className="skeleton skeleton--button"
            style={{ width: "8em", height: "2.5em", marginInline: "12px 0" }}
          ></div>
        </div>
        <div
          className="note-title skeleton"
          style={{ width: "65%", height: "3rem", marginInline: "12px 1em" }}
        ></div>
        <div className="note-preview">
          <div className="skeleton v-stack" style={{ height: "1.5em" }}></div>
          <div className="skeleton v-stack" style={{ height: "1.5em" }}></div>
          <div className="skeleton v-stack" style={{ height: "1.5em" }}></div>
          <div className="skeleton v-stack" style={{ height: "1.5em" }}></div>
          <div className="skeleton v-stack" style={{ height: "1.5em" }}></div>
        </div>
      </div>
    </div>
  );
}
