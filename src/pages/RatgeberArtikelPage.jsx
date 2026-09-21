import React from 'react';
import { useParams } from 'react-router-dom';
import RatgeberArticleLayout from '@/components/ratgeber/RatgeberArticleLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import { getRatgeberArticle } from '@/content/ratgeber';

const RatgeberArtikelPage = () => {
  const { slug } = useParams();
  const article = getRatgeberArticle(slug);

  if (!article) return <NotFoundPage />;

  return <RatgeberArticleLayout article={article} />;
};

export default RatgeberArtikelPage;
