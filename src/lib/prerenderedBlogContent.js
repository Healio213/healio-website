const prerenderedBlogContent = {
  listHtml: '',
  articleHtml: '',
};

export const capturePrerenderedBlogContent = (rootElement) => {
  if (!rootElement) return;

  const list = rootElement.querySelector('[data-prerendered-blog-list]');
  const article = rootElement.querySelector(
    '[data-prerendered-blog-article], [data-static-blog-article]',
  );

  prerenderedBlogContent.listHtml = list?.outerHTML || '';
  prerenderedBlogContent.articleHtml = article?.outerHTML || '';
};

export const getPrerenderedBlogListHtml = () => prerenderedBlogContent.listHtml;

export const getPrerenderedBlogArticleHtml = () => prerenderedBlogContent.articleHtml;
