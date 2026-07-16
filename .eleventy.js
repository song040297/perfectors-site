const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItContainer = require("markdown-it-container");

function pad(n) { return String(n).padStart(2, "0"); }

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("robots.txt");

  const md = markdownIt({ html: true, breaks: true, linkify: true })
    .use(markdownItAnchor, {
      slugify: (s) =>
        encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-")),
    })
    .use(markdownItContainer, "tip", {
      render: function (tokens, idx) {
        return tokens[idx].nesting === 1
          ? '<div class="tip-box">💡 '
          : "</div>";
      },
    });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("readableDate", (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
  });

  eleventyConfig.addFilter("readingTime", (contentHtml) => {
    if (!contentHtml) return 1;
    const text = contentHtml.replace(/<[^>]+>/g, "");
    const charCount = text.length;
    return Math.max(1, Math.round(charCount / 500));
  });

  // 렌더링된 본문 HTML에서 h2/h3 제목을 뽑아 목차(TOC)를 만드는 필터
  eleventyConfig.addFilter("toc", (contentHtml) => {
    if (!contentHtml) return "";
    const headingRegex = /<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
    const items = [];
    let match;
    while ((match = headingRegex.exec(contentHtml)) !== null) {
      items.push({
        level: match[1],
        id: match[2],
        text: match[3].replace(/<[^>]+>/g, ""),
      });
    }
    if (items.length < 2) return "";
    let html = '<div class="post-toc"><div class="toc-label">📑 목차</div><ol>';
    items.forEach((item) => {
      const cls = item.level === "3" ? ' class="toc-h3"' : "";
      html += `<li${cls}><a href="#${item.id}">${item.text}</a></li>`;
    });
    html += "</ol></div>";
    return html;
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("content/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
