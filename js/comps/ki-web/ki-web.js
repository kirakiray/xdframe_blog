Component({
    tag: "ki-web",
    hostlink: "./ki-web-hos.css",
    useComps: ["../ki-article-list -pack", "../ki-nav -pack", "../ki-ul -pack", "../ki-loading", `${location.origin}/css/ki-article.css`],
});