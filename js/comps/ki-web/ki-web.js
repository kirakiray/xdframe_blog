Component({
    tag: "ki-web",
    temp: true,
    link: true,
    hostlink: "./ki-web-hos.css",
    use: ["../ki-nav -pack", "../ki-ul -pack", "../ki-loading", `${location.origin}/css/ki-article.css`],
    data: {
        leftNav: "show",
        articleAslide: "show",
        lang: "cn"
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
            let indexTemp = await fetch(`/${this.lang}/index.html`);
            indexTemp = await indexTemp.text();
            let navArr = /\<nav class="top_nav">[\w\W]+<\/nav>/.exec(indexTemp);
            if (navArr) {
                let navEle = $(navArr[0]);

                // 修正地址的根路径
                navEle.queAll("a").forEach(aEle => {
                    let href = aEle.attr("href");
                    href = `/${this.lang}/${href}`;

                    // 设置href属性
                    aEle.attr("href", href);
                    aEle.attr("backHref", href);
                });

                this.$topNavContent.html = navEle.html;

                // 刷新 
                this.$topNavContent.parent.refreshActive()
            }
        },
        async loadLeftNav(opt = {}) {
            let leftNavTemp = await fetch(`/${this.lang}/${opt.libName}/index.html`);
            leftNavTemp = await leftNavTemp.text();
            let navArr = /\<nav class="left_nav">[\w\W]+<\/nav>/.exec(leftNavTemp);
            if (navArr) {
                let navEle = $(navArr[0]);
                this.$leftNav.que("ki-ul").html = navEle.html;
            }

            // 获取连接
            let pathArr = /.+\/(.*)/.exec(document.location.href);
            let pName = pathArr[1];
            (!pName) && (pName = "index.html")

            // 添加激活状态
            let tarEle = this.$leftNav.que(`a[href$="${pName}"]`);
            if (tarEle) {
                tarEle.class.add("kiul_active");
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