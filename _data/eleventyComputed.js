module.exports = {
  jsonLd: (data) => {
    // 글(post.njk 레이아웃)에만 자동으로 Article 구조화 데이터를 적용.
    // 홈 화면 등 다른 페이지가 자체 jsonLd를 지정했다면 그대로 둠.
    if (data.layout !== "post.njk") return data.jsonLd;
    if (!data.category || !data.title) return undefined;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description || data.site.tagline,
      author: {
        "@type": "Person",
        name: data.author || data.site.ownerName,
      },
      datePublished: data.date ? new Date(data.date).toISOString() : undefined,
      url: data.site.url + data.page.url,
      publisher: {
        "@type": "Organization",
        name: data.site.name,
      },
    };
  },
};
