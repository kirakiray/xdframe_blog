Component({
    tag: "ki-web",
    hostlink: "./ki-web-hos.css",
    use: ["../ki-article-list -pack", "../ki-nav -pack", "../ki-ul -pack", "../ki-loading", `${location.origin}/css/ki-article.css`],
    data: {
        leftNav: "show",
        articleAslide: "show"
    },
    watch: {
        articleAslide(e, val) {
            if (val == "none") {
                this.$articleList.display = "none";
            } else {
                this.$articleList.for = {
                    targetEle: $("article").ele,
                    scrollEle: this.$articleContainer.ele
                };
            }
        }
    },
    inited() {
    }
});