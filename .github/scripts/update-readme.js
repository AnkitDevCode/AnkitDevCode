const Parser = require('rss-parser');
const fs = require('fs');
const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://dev.to/feed/ankitdevcode');
  const latestPosts = feed.items.slice(0, 5).map(post => `- [${post.title}](${post.link})`).join('\n');

  const readme = fs.readFileSync('README.md', 'utf8');
  const updated = readme.replace(
    /<!-- BLOG-START -->[\s\S]*<!-- BLOG-END -->/,
    `<!-- BLOG-START -->\n${latestPosts}\n<!-- BLOG-END -->`
  );

  fs.writeFileSync('README.md', updated);
})();
