drill = async (drill) => {
    // await load(`${location.origin}/css/public.css`); 

    drill.config({
        baseUrl: `${location.origin}/js/`
    });
    await load("comps/ki-loading");

    // 添加loading
    let start_loading = $(`
    <div class="start_loading">
        <ki-loading></ki-loading>
    </div>
    `);

    // 添加初始loading
    $("body").push(start_loading);

    // 加载ki-web组件
    await load("comps/ki-web -pack");

    let kiweb = $("ki-web");

    // 加载初始数据并设置顶顶部标签
    await kiweb.loadTopNav();

    await kiweb.loadLeftNav();

    //  隐藏Loading
    start_loading.display = "none";
}