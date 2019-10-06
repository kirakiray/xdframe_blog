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
    proto: {
        // 加载nav数据
        async loadTopNav() {
            // 请求首页的nav数据
            let indexTemp = await fetch(`/cn/index.html`);
            indexTemp = await indexTemp.text();
            let navArr = /\<nav class="top_nav">[\w\W]+<\/nav>/.exec(indexTemp);
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
        async loadLeftNav() {
            let leftNavTemp = await fetch(`/cn/xdframe/index.html`);
            leftNavTemp = await leftNavTemp.text();
            let navArr = /\<nav class="left_nav">[\w\W]+<\/nav>/.exec(leftNavTemp);
            if (navArr) {
                let navEle = $(navArr[0]);
                this.$leftNav.que("ki-ul").html = navEle.html;
            }

            // 获取连接
            let pathArr = /.+\/(.+)/.exec(document.location.href);

            // 添加激活状态
            if (pathArr) {
                let tarEle = this.$leftNav.que(`a[href$="${pathArr[1]}"]`);
                if (tarEle) {
                    tarEle.class.add("kiul_active");
                    // debugger
                }
            }
        }
    },
    // inited() {
    //     this.loadTopNav();
    // },
    async onload({ load }) {
        await load("../ki-article-list -pack");
    }
});