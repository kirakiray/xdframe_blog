
drill = async (drill) => {
    await load("/css/index.css");
    drill.config({
        baseUrl: "js/"
    });
    await load("comps/ki-loading");
    await load("comps/ki-nav -pack", "comps/ki-ul -pack", "comps/ki-article-list -pack");
}