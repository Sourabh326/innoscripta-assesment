import React from "react";
import Multimedia from "./Multimedia";
import "../assets/css/multimedia.css";

const ArticleItem = ({
  title,
  source,
  description,
  url,
  publishedAt,
  author,
  subsection,
  multimedia,
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString();

  return (
    <div className="article-item">

      {/* Main Section */}
      <p className="date">Published on: {formattedDate}</p>
      <h2>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h2>
      {source && <p className="source">Source: {source}</p>}
      {author && <p className="author">Author: {author}</p>}

      <p className="description">{description}</p>


      {/* Multimedia Section */}
      <div className="multimedia-gallery">
        {multimedia &&
          multimedia.length > 0 &&
          multimedia.map((media, index) => (
            <Multimedia key={index} media={media} />
          ))}
      </div>


      {/* Footer Section */}
      <div className="article-footer">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more-button"
        >
          Read More
        </a>
        {subsection && <p className="subsection">Subsection: {subsection}</p>}
      </div>
    </div>
  );
};

export default ArticleItem;
