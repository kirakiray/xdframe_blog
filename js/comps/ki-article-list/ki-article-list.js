Component({
    tag: "ki-article-list",
    useComps: ["../ki-ul -pack"],
    proto: {
        // 更新列表数据
        refreshActive() {
            let target = this._target.ele;

            // 判断当前的滚动值
            let scrollTop = target.scrollTop;
            let scrollHeight = target.scrollHeight;
            
            debugger
        }
    },
    watch: {
        for(e, val) {
            // 获取元素
            let targetEle = $(val);

            // 获取所有标题
            let titles = targetEle.queAll('h1,h2,h3,h4,h5,h6');

            // 清空列表并填充新元素
            this.$kiul.empty();

            titles.forEach(e => {
                this.$kiul.push(`<a>${e.text}</a>`);
            });

            // 挂载_target
            this._target = targetEle;

            // 刷新装填
            this.refreshActive();
        }
    }
});