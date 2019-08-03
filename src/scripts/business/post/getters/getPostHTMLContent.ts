import * as marked from 'marked';

import { Post } from '@/restful';

const renderer = new marked.Renderer();

renderer.image = (href: string, title: string, text: string) => {
    return `
        <img src="${href}" alt="${title}" style="max-width: 100%;" />
    `;
};

marked.setOptions({
    'baseUrl': null,
    'breaks': false,
    'gfm': true,
    'headerIds': true,
    'headerPrefix': '',
    'highlight': null,
    'langPrefix': 'language-',
    'mangle': true,
    'pedantic': false,
    'sanitize': false,
    'sanitizer': null,
    'silent': false,
    'smartLists': false,
    'smartypants': false,
    'tables': true,
    'xhtml': false,
    renderer: renderer
});

export const getPostHTMLContent = (post: Post) => {
    if (!post.content) {
        return 'No content!';
    }

    return marked(post.content);
};