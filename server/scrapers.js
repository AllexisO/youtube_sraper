const puppeteer = require('puppeteer');

async function scrapeChannel(url) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const [el2] = await page.$x('//*[@id="img"]'); // Youtube avatar
    const src = await el2.getProperty('src');
    const avatarURL = await src.jsonValue();

    const [el3] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[1]/yt-formatted-string');
    const textSub = await el3.getProperty('textContent');
    const subscribers = await textSub.jsonValue();

    browser.close();

    console.log({name, avatarURL, subscribers});

    return {name, avatarURL, subscribers}

}

module.exports = {
    scrapeChannel
}