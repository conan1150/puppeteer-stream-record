const { launch, getStream } = require("puppeteer-stream");
const fs = require("fs");

const file = fs.createWriteStream(__dirname + "/test.webm");
const file2 = fs.createWriteStream(__dirname + "/test2.webm");

async function test() {

    browser = await launch({
        args: ['--headless=chrome'],
    })

    const page = await browser.newPage();
    await page.goto("https://meet.jit.si/example1#config.prejoinPageEnabled=false");
    const stream = await getStream(page, { audio: true, video: true });
    console.log("recording");

    stream.pipe(file);
    setTimeout(async () => {
        await stream.destroy();
        file.close();
        await page.close();
        console.log("finished");
    }, 1000000 * 10);
}

async function test2() {

    browser = await launch({
        args: ['--headless=chrome'],
    })

    const page = await browser.newPage();
    await page.goto("https://meet.jit.si/example2#config.prejoinPageEnabled=false");
    const stream = await getStream(page, { audio: true, video: true });
    console.log("recording");

    stream.pipe(file2);
    setTimeout(async () => {
        await stream.destroy();
        file2.close();
        await page.close();
        console.log("finished");
    }, 1000000 * 10);
}

test();
test2();
