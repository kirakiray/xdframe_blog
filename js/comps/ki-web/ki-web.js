Component({
    tag: "ki-web",
    temp: true,
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
    async inited() {
        // 请求首页的nav数据
        let indexTemp = await fetch(`/cn/index.html`);
        indexTemp = await indexTemp.text();
        let navArr = /\<nav>[\w\W]+<\/nav>/.exec(indexTemp);
        if (navArr) {
            let navEle = $(navArr[0]);

            // 修正地址的根路径
            navEle.queAll("a").forEach(aEle => {
                let href = aEle.attr("href");
                aEle.attr("href", `/cn/${href}`);
            });

            this.$topNavContent.html = navEle.html;
        }
    },
    async onload({ load }) {
        await load("../ki-article-list -pack");
    }
});