Component({
    tag: "ki-article-list",
    use: ["../ki-ul -pack"],
    data: {
        _scrollEle: "",
        _oldScrollBinding: "",
        _scrollTimer: "",
        for: ""
    },
    proto: {
        // 更新列表数据
        refreshActive() {
            let target = this._target.ele;

            // 判断当前的滚动值
            let { clientHeight, scrollTop, scrollHeight } = this._scrollEle.ele;

            // 获取每个title距离顶部的高度
            let titles = this._target.queAll('h1,h2,h3,h4,h5,h6');

            let eleTops = titles.map(t => {
                return t.ele.offsetTop;
            });

            // 根据区间范围
            let goodTop = scrollTop + (clientHeight / 2) + 100;
            let tarIndex;
            eleTops.some((top, index) => {
                if (goodTop > top) {
                    tarIndex = index;
                }
            });

            // 修正active
            let activeEle = this.$kiul.que(".kiul_active");
            activeEle && (activeEle.class.remove("kiul_active"));

            this.$kiul[tarIndex].class.add("kiul_active");

            console.log(goodTop, eleTops);
        },
        reduceRefreshActive() {
            if (this._scrollTimer) {
                return;
            }
            this._scrollTimer = 1;
            setTimeout(() => {
                this.refreshActive();
                this._scrollTimer = 0;
            }, 200)
        }
    },
    watch: {
        for(e, val) {
            if (!val) {
                return;
            }

            let targetEle, scrollEle;

            let valType = typeof val;

            switch (valType) {
                case "string":
                    // 获取数据的容器
                    targetEle = $(val);

                    // 滚动容器
                    scrollEle = targetEle;
                    break;
                case "object":
                    targetEle = $(val.targetEle);
                    scrollEle = $(val.scrollEle);
                    break;
            }

            // 获取所有标题
            let titles = targetEle.queAll('h1,h2,h3,h4,h5,h6');

            // 清空列表并填充新元素
            this.$kiul.empty();

            titles.forEach(e => {
                this.$kiul.push(`<a>${e.text}</a>`);
            });

            // 挂载_target
            this._target = targetEle;

            let bindFun;
            scrollEle.on("scroll", bindFun = e => {
                this.reduceRefreshActive();
            });

            if (this._scrollEle) {
                this._scrollEle.off("scroll", this._oldScrollBinding);
            }

            this._scrollEle = scrollEle;
            this._oldScrollBinding = bindFun;

            // 刷新装填
            this.refreshActive();
        }
    },
    inited() {
        this.$kiul.on("click", "a", e => {
            let index = e.delegateTarget.index;
            let titles = this._target.queAll('h1,h2,h3,h4,h5,h6');
            let targetTitle = titles[index];
            targetTitle.ele.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    },
    attached() {
        this.reduceRefreshActive();
    }
});