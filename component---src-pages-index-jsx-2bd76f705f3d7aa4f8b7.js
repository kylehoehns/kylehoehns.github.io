"use strict";(self.webpackChunkdevfolio=self.webpackChunkdevfolio||[]).push([[279],{4329:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var l=n(8156),a=n.n(l),r=n(6540),i=n(203),s=n(8776),c=n(8539);var m=e=>{let{about:t}=e;return r.createElement(c.A,{title:"About Me"},r.createElement("div",{className:"mb-6"},r.createElement("p",null,t)))},o=n(4194),d=n(4078);var p=e=>{let{posts:t}=e;return r.createElement(c.A,{title:"Latest Posts"},t.map((e=>r.createElement(d.A,{key:e.node.fields.slug,name:e.node.frontmatter.title,description:e.node.frontmatter.description,link:e.node.fields.slug,internal:!0}))),t.length>=5&&r.createElement(o.Link,{className:"text-gray-500 text-sm hover:text-black",to:"/blog"},"View all posts →"))};var u=e=>{let{experience:t}=e;return t.length?r.createElement(c.A,{title:"Experience"},t.map((e=>r.createElement(d.A,{key:e.name,name:e.name,description:e.description,link:e.link,children:e.children})))):null};var k=e=>{let{projects:t}=e;return t.length?r.createElement(c.A,{title:"Projects"},t.map((e=>r.createElement(d.A,{key:e.name,name:e.name,description:e.description,link:e.link})))):null};var E=e=>{let{skills:t}=e;return r.createElement(c.A,{title:"Skills"},t.map((e=>r.createElement(d.A,{key:e.name,name:e.name,description:e.description}))))},g=n(122);var h=e=>{let{data:t}=e;const n=a()(t,"site.siteMetadata.about",!1),l=a()(t,"site.siteMetadata.projects",!1),c=t.allMarkdownRemark.edges,o=a()(t,"site.siteMetadata.experience",!1),d=a()(t,"site.siteMetadata.skills",!1),h=!c||!c.length;return r.createElement(s.A,null,r.createElement(g.A,null),r.createElement(i.A,{metadata:t.site.siteMetadata,noBlog:h}),n&&r.createElement(m,{about:n}),l&&l.length&&r.createElement(k,{projects:l}),!h&&r.createElement(p,{posts:c}),d&&d.length&&r.createElement(E,{skills:d}),o&&o.length&&r.createElement(u,{experience:o}))}}}]);
//# sourceMappingURL=component---src-pages-index-jsx-2bd76f705f3d7aa4f8b7.js.map