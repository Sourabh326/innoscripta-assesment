import React from "react";

const Multimedia = ({ media }) => {
  return (
    media.type === "image" && (
      <div className="media-item">
        <img
          src={media.url}
          alt={media.caption || "Media"}
          className="media-image"
        />
        {media.caption && <p className="media-caption">{media.caption}</p>}
        <p className="media-info">
          <span>Format: {media.format}</span> |{" "}
          <span>Type: {media.subtype}</span>
        </p>
        {media.copyright && <p className="copyright">© {media.copyright}</p>}
      </div>
    )
  );
};

export default Multimedia;
