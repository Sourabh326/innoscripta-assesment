import React from 'react';
import ArticleItem from './ArticleItem';
import "../assets/css/articles-list.css";

const ArticleList = ({ articles }) => {

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <ArticleItem
          key={index}
          title={article.title}
          source={article.source}
          description={article.description}
          url={article.url}
          publishedAt={article.publishedAt}
          author={article.author}
          subsection={article.subsection}
          multimedia={article.multimedia}
        />
      ))}
    </div>
  );
};

export default ArticleList;
