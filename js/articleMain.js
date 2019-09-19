drill = async (drill) => {
    await load(`${location.origin}/css/public.css`);
    
    drill.config({
        baseUrl: `${location.origin}/js/`
    });
    await load("comps/ki-loading");
    await load("comps/ki-web -pack");
}