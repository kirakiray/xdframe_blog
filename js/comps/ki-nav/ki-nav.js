Component({
    tag: "ki-nav",
    temp: true,
    link: true,
    hostlink: "./ki-nav-host.css",
    proto: {
        refreshActive() {
            let { pathname } = document.location;

            let reArr = /(.+)\/.*/.exec(pathname);
            if (reArr) {
                let tarExec = reArr[1];


                // 还原所有href
                this.queAll("a").forEach(aEle => {
                    aEle.attr("href", aEle.attr("backHref"));
                });

                // 超找拥有这个href的标签
                let target = this.que(`[href^="${tarExec}"]`);
                if (target) {
                    target.class.add("ki_nav_active");
                    target.removeAttr("href");
                }
            }
        }
    },
    inited() {
        // 设置到data上
        this.queAll("a").forEach(ele => {
            ele.data.href = ele.attr("href");
        });
    },
    shadowLink: true
});