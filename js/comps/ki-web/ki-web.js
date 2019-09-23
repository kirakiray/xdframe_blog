Component({
    tag: "ki-web",
    hostlink: "./ki-web-hos.css",
    use: ["../ki-nav -pack", "../ki-ul -pack", "../ki-loading", `${location.origin}/css/ki-article.css`],
    data: {
        leftNav: "show",
        articleAslide: "show"
    },
    watch: {
        articleAslide(e, val) {
            if (val == "none") {
                this.$rightCon.display = "none";
            } else {
                this.$rightCon.display = "";
                this.$articleList.for = {
                    targetEle: $("article").ele,
                    scrollEle: this.$articleContainer.ele
                };
            }
        },
        leftNav(e, val) {
            if (val == "none") {
                this.$leftNav.display = "none";
            } else {
                this.$leftNav.display = "";
            }
        }
    },
    async onload({ load }) {
        await load("../ki-article-list -pack");
    }
});