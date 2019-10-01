drill = async (drill) => {
    await load(`${location.origin}/css/public.css`);

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

    $("body").push(start_loading);

    await load("comps/ki-web -pack");
}