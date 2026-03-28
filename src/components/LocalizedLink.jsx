import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const LocalizedLink = ({ routeKey, children, ...props }) => {
  const { getPath } = useLanguage();
  return <Link to={getPath(routeKey)} {...props}>{children}</Link>;
};

export default LocalizedLink;
