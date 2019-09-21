Component({
    tag: "ki-web",
    hostlink: "./ki-web-hos.css",
    use: ["../ki-article-list -pack", "../ki-nav -pack", "../ki-ul -pack", "../ki-loading", `${location.origin}/css/ki-article.css`],
    inited() {
        this.$articleList.for = {
            targetEle: $("article").ele,
            scrollEle: this.$articleContainer.ele
        };
    }
});