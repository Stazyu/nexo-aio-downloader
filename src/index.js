const instagramDownloader = require('./lib/instagram');
const facebookDownloader = require('./lib/facebook');
const { youtubeDownloader, youtubePlaylistDownloader } = require('./lib/youtube');
const twitterDownloader = require('./lib/twitter');
const tiktokDownloader = require('./lib/tiktok');
const gdriveDownloader = require('./lib/gdrive');
const sfileDownloader = require('./lib/sfile');
const { pixivDownloader, pixivBacthDownloader } = require('./lib/pixiv');
const snackDownloader = require('./lib/snack');
const bilibiliDownloader = require('./lib/bilibili');
const capcutDownloader = require('./lib/capcut');
const pinterest = require('./lib/pinterest');
const megaDownloader = require('./lib/mega');

const allInOne = async (url, { proxy = null, cookie = null} = {}) => {
    try {
        const supportedSites = {
            facebook: /https?:\/\/(www\.)?facebook\.com|https?:\/\/m\.facebook\.com|https?:\/\/fb\.watch/,
            scdl: /https?:\/\/(www\.)?soundcloud\.com|https?:\/\/m\.soundcloud\.com/,
            instagram: /https?:\/\/(www\.)?instagram\.com/,
            tiktok: /https?:\/\/(www\.)?tiktok\.com|https?:\/\/vt\.tiktok\.com|https?:\/\/vm\.tiktok\.com/,
            youtube: /https?:\/\/(www\.)?youtube\.com|https?:\/\/m\.youtube\.com|https?:\/\/youtu\.be/,
            sfile: /https?:\/\/sfile\.mobi/,
            mediafire: /https?:\/\/(www\.)?mediafire\.com/,
            twitter: /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/.+/,
            gdrive: /https?:\/\/drive\.google\.com/,
            pixiv: /https?:\/\/(www\.)?pixiv\.net/,
            snack: /https?:\/\/(www\.)?snack\.com/,
            mega: /https?:\/\/mega\.nz/,
            bilibili: /https?:\/\/(www\.)?bilibili\.tv/,
            capcut: /https?:\/\/(?:www\.)?capcut\.com\/t\/[a-zA-Z0-9]+/,
            pinterest: /^https?:\/\/(?:www\.)?(?:pinterest|pinterestcn)\.[\w.]+\/|^https?:\/\/pin\.it\/[\w.-]+/,
        };

        const sites = Object.keys(supportedSites).find(key => supportedSites[key].test(url));
        if (!sites) throw new Error('Unsupported site');

        switch (sites) {
            case 'instagram':
                return await instagramDownloader(url, proxy);
            case 'facebook':
                return await facebookDownloader(url, proxy);
            case 'youtube':
                return await youtubeDownloader(url);
            case 'tiktok':
                return await tiktokDownloader(url);
            case 'sfile':
                return await sfileDownloader(url);
            case 'gdrive':
                return await gdriveDownloader(url);
            case 'twitter':
                return await twitterDownloader(url);
            case 'pixiv':
                return await pixivDownloader(url, cookie);
            case 'snack':
                return await snackDownloader(url);
            case 'mega':
                return await megaDownloader(url);
            case 'bilibili':
                return await bilibiliDownloader(url);
            case 'capcut':
                return await capcutDownloader(url);
            case 'pinterest':
                return await pinterest.download(url);
            default:
                throw new Error('Unsupported site');
        }

    } catch (error) {
        console.error('An error occurred:', error);
        throw error
    }
}

module.exports = {
    aio: allInOne,
    bilibili: bilibiliDownloader,
    capcut: capcutDownloader,
    facebook: facebookDownloader,
    gdrive: gdriveDownloader,
    instagram: instagramDownloader,
    mega: megaDownloader,
    pinterest: pinterest,
    pixiv: pixivDownloader,
    pixivBatch: pixivBacthDownloader,
    sfile: sfileDownloader,
    snack: snackDownloader,
    tiktok: tiktokDownloader,
    twitter: twitterDownloader,
    youtube: youtubeDownloader,
    youtubePlaylist: youtubePlaylistDownloader,
}
