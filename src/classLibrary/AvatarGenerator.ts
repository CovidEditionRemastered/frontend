export function GenerateAvatar(name: string): string {

    const c = document.createElement("canvas");
    c.width = 200;
    c.height = 200;
    const ctx = c.getContext("2d")!;

    const colors = ['rgb(226, 156, 226)', 'rgb(192, 233, 180)', 'rgb(229, 164, 167)', 'rgb(160, 194, 227)'
        , 'rgb(226, 184, 156)', 'rgb(173, 226, 156)', 'rgb(184, 209, 234)'];
    ctx.fillStyle = colors.Random()!;
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.font = "100px Roboto";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(name.split(" ").Map(x => x.Take()).join("").toUpperCase().Take(2), 100, 110);
    return c.toDataURL('jpeg');
}