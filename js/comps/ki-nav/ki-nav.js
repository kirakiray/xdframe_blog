define(async (load, exports, modules, moduleData) => {
    let [temp] = await load("./ki-nav.html", "./ki-nav.css");

    // 添加link
    temp = `<link rel="stylesheet" href="${moduleData.DIR}/ki-nav-shadow.css">\n` + temp;

    $.register({
        tag: "ki-nav",
        temp,
        proto: {
            refreshActive() {
                let { pathname } = document.location;

                // 超找拥有这个href的标签
                let target = this.que(`[href="${pathname}"]`);
                if (target) {
                    target.class.add("ki_nav_active");
                    target.removeAttr("href");
                }
            }
        },
        inited() {
            // 设置到data上
            this.queAll("a").forEach(ele => {
                ele.data.href = ele.attr("href");
            });

            // 刷新激活按钮
            this.refreshActive();
        }
    });
});