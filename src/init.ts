import { base, isAndroid, load, player, setBase } from "./definitions.js";
import { installHooks } from "./mainHooks.js";

function waitForModule(name: string, intervalMs = 10): Promise<NativePointer> {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const handle = Process.getModuleByName(name).base;
            if (handle) {
                clearInterval(interval);
                resolve(handle);
            }
        }, intervalMs);
    });
}

(async () => {
    setBase(await waitForModule(isAndroid ? "libg.so" : "laser"));
    console.log(`libg.so loaded at: ${base}`);
    load();
    setImmediate(() => {
        installHooks();
    });
})();

for (const brawlerKey in player.ownedBrawlers) {
    const brawler = player.ownedBrawlers[brawlerKey];
    for (const skin of brawler.skins) {
        player.ownedSkins.push(skin);
    }
}