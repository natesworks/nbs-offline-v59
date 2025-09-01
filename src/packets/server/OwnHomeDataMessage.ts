import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { events } from "../../events.js";

export class OwnHomeDataMessage {
    static encode(player: Player): number[] {
        let stream = new ByteStream([]);
        const currentTime = Date.now() / 1000 + 3600 * 4;
        console.log("Encoding OHD");

        stream.writeVint(1688816070);
        stream.writeVint(1191532375);
        stream.writeVint(2023189);
        stream.writeVint(73530);

        stream.writeVint(player.trophies);
        stream.writeVint(player.highestTrophies);
        stream.writeVint(player.highestTrophies);
        stream.writeVint(player.trophyRoadTier);
        stream.writeVint(player.xp);

        stream.writeDataReference(28, player.thumbnail);
        stream.writeDataReference(43, player.namecolor);
        stream.writeVint(26);
        for (let i = 0; i < 26; i++)
            stream.writeVint(i);

        stream.writeVint(0); // selected skins
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(player.ownedSkins.length);
        player.ownedSkins.forEach((x) => stream.writeDataReference(29, x));
        stream.writeVint(1080)
        for (let i = 0; i < 1080; i++)
            stream.writeDataReference(29, i);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(player.highestTrophies);
        stream.writeVint(0);
        stream.writeVint(2);
        stream.writeBoolean(true);
        stream.writeVint(player.tokenDoublers);
        stream.writeVint(335442);
        stream.writeVint(1001442);
        stream.writeVint(5778642);
        stream.writeVint(0);

        stream.writeVint(120);
        stream.writeVint(200);
        stream.writeVint(0);

        stream.writeBoolean(true);
        stream.writeVint(2);
        stream.writeVint(2);
        stream.writeVint(2);
        stream.writeVint(0);
        stream.writeVint(0);

        stream.writeVint(0); // shop offers
        stream.writeVint(20);
        stream.writeVint(1428);

        stream.writeVint(0);

        stream.writeVint(1);
        stream.writeVint(30);

        stream.writeByte(player.selectedBrawlers.length);
        for (const brawler of player.selectedBrawlers) {
            stream.writeDataReference(16, brawler);
        }
        stream.writeString(player.region);
        stream.writeString(player.supportedCreator);

        stream.writeVint(22); // int values
        stream.writeDataReference(2, 1);
        stream.writeDataReference(3, 0); /// tokens gained
        stream.writeDataReference(4, 0); // trophies gained
        stream.writeDataReference(6, 0); // demo account
        stream.writeDataReference(7, 0); // invites blocked
        stream.writeDataReference(8, 0); // star points gained
        stream.writeDataReference(9, 1); // shop star points
        stream.writeDataReference(10, 0); // power play trophies gained
        stream.writeDataReference(12, 1);
        stream.writeDataReference(14, 0); // coins gained
        stream.writeDataReference(15, 1); // social age
        stream.writeDataReference(16, 1);
        stream.writeDataReference(17, 0); // team chat muted
        stream.writeDataReference(18, 0); // esports button
        stream.writeDataReference(19, 0); // championship lives buy popup
        stream.writeDataReference(20, 0); // gems gained
        stream.writeDataReference(21, 1); // looking for team state
        stream.writeDataReference(22, 1);
        stream.writeDataReference(23, 0); // club trophies gained
        stream.writeDataReference(24, 1); // have already watched club league animation
        stream.writeDataReference(32447, 28);
        stream.writeDataReference(16, 5);

        stream.writeVint(0);

        // brawl pass
        let pass32LVL = 0;
        let pass64LVL = 0;
        let pass96LVL = 0;

        let free32LVL = 0;
        let free64LVL = 0;
        let free96LVL = 0;

        for (const level of player.brawlPassFreeLevel) {
            if (level < 30) {
                free32LVL += 2 ** (level + 2);
            }
            if (level > 30) {
                free64LVL += 2 ** (level - 30);
            }
            if (level > 61) {
                free96LVL += 1 ** (level - 61);
            }
        }

        for (const level of player.brawlPassLevel) {
            if (level < 30) {
                pass32LVL += 2 ** (level + 2);
            }
            if (level > 29) {
                pass64LVL += 2 ** (level - 30);
            }
            if (level > 60) {
                pass96LVL += 1 ** (level - 61);
            }
        }

        // season data
        stream.writeVint(1);
        stream.writeVint(34); // season
        stream.writeVint(player.passTokens);
        stream.writeBoolean(player.brawlPassActive);
        stream.writeVint(0);
        stream.writeBoolean(false);

        stream.writeBoolean(true);
        stream.writeInt(pass32LVL);
        stream.writeInt(pass64LVL);
        stream.writeInt(pass96LVL);
        stream.writeInt(0);

        stream.writeBoolean(true);
        stream.writeInt(free32LVL);
        stream.writeInt(free64LVL);
        stream.writeInt(free96LVL);
        stream.writeInt(0);

        stream.writeBoolean(player.brawlPassPlusActive);
        stream.writeBoolean(true);
        stream.writeInt(0);
        stream.writeInt(0);
        stream.writeInt(0);
        stream.writeInt(0);

        stream.writeBoolean(true);
        stream.writeVint(0);
        stream.writeVint(1);
        stream.writeVint(2);
        stream.writeVint(0);

        stream.writeBoolean(true);
        stream.writeVint(player.ownedThumbnails.length + player.ownedPins.length + 1);
        player.ownedThumbnails.forEach((x) => {
            stream.writeDataReference(28, x);
            stream.writeVint(0);
        });
        player.ownedPins.forEach((x) => {
            stream.writeDataReference(52, x);
            stream.writeVint(0);
        });
        stream.writeDataReference(28, 186);
        stream.writeVint(0);

        stream.writeBoolean(false); // powerleague data

        stream.writeInt(0);
        stream.writeVint(0);
        stream.writeDataReference(16, player.favouriteBrawler);
        stream.writeBoolean(false);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);

        stream.writeVint(2023189);

        // events
        stream.writeVint(40);
        for (let i = 0; i < 40; i++)
            stream.writeVint(i);

        stream.writeVint(events.length);

        for (const event of events) {
            stream.writeVint(-1);
            stream.writeVint(event.Slot);
            stream.writeVint(event.Slot);
            stream.writeVint(0);
            stream.writeVint(Math.floor(event.TimeToEnd) - currentTime);
            stream.writeVint(10);
            stream.writeDataReference(15, event.MapID);
            stream.writeVint(-1);
            stream.writeVint(2); // MapStatus
            stream.writeString("");
            stream.writeVint(0);
            stream.writeVint(0);

            if ([20, 21, 22, 23, 24, 35, 36].includes(event.Slot) && event.championShipInfo) {
                stream.writeVint(event.championShipInfo.MaxWins);
            } else {
                stream.writeVint(0);
            }

            stream.writeVint(0); // Modifiers
            stream.writeVint(0); // Wins
            stream.writeVint(6);
            stream.writeBoolean(false); // MapMaker map structure array
            stream.writeVint(0);
            stream.writeBoolean(false); // Power League array entry
            stream.writeVint(0);
            stream.writeVint(0);

            if ([20, 21, 22, 23, 24, 35, 36].includes(event.Slot) && event.championShipInfo) {
                stream.writeBoolean(true); // ChoronosTextEntry
                stream.writeString(event.championShipInfo.ChoronosTextEntry);
                stream.writeVint(0);
            } else {
                stream.writeBoolean(false);
            }

            stream.writeBoolean(false);
            stream.writeBoolean(false);

            if ([20, 21, 22, 23, 24].includes(event.Slot) && event.championShipInfo) {
                stream.writeBoolean(true); // LogicGemOffer
                const offer = event.championShipInfo.LogicGemOffer;
                stream.writeVint(offer.id);
                stream.writeVint(offer.amount);
                stream.writeDataReference(offer.CsvID[0], offer.CsvID[1]);
                stream.writeVint(offer.skinID);
            } else {
                stream.writeBoolean(false);
            }

            stream.writeVint(1);
            stream.writeVint(6);

            if ([20, 21, 22, 23, 24, 35, 36].includes(event.Slot) && event.championShipInfo) {
                stream.writeBoolean(true); // ChronosFileEntry
                const entry = event.championShipInfo.chronosFileEntry;
                stream.writeString(entry.scName);
                stream.writeString(entry.scFile);
            }

            stream.writeBoolean(false); // ChoronosFileEntry::encode
            stream.writeBoolean(false);
            stream.writeVint(-1);
            stream.writeVint(0);
            stream.writeVint(0);
            stream.writeVint(0);
            stream.writeBoolean(false);
            stream.writeBoolean(false);
            stream.writeBoolean(false);
            stream.writeBoolean(false);
        }

        stream.writeVint(0);

        const brawlerUpgradeCost = [20, 35, 75, 140, 290, 480, 800, 1250, 1875, 2800];
        const shopCoinsPrice = [20, 50, 140, 280];
        const shopCoinsAmount = [150, 400, 1200, 2600];

        stream.writeVint(brawlerUpgradeCost.length);
        for (const cost of brawlerUpgradeCost) {
            stream.writeVint(cost);
        }
        stream.writeVint(shopCoinsPrice.length);
        for (const price of shopCoinsPrice) {
            stream.writeVint(price);
        }
        stream.writeVint(shopCoinsAmount.length);
        for (const amount of shopCoinsAmount) {
            stream.writeVint(amount);
        }

        stream.writeVint(0);

        // int value entry
        stream.writeVint(6);
        stream.writeDataReference(41000117, 1); // theme id
        stream.writeDataReference(89, 6);
        stream.writeDataReference(22, 0);
        stream.writeDataReference(36, 1);
        stream.writeDataReference(73, 1);
        stream.writeDataReference(16, 5);

        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);

        stream.writeLong(player.id[0], player.id[1]);

        stream.writeVint(0); // notification count; looks like crash is after this (not specifically next part)

        stream.writeVint(1);
        stream.writeBoolean(false);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeVint(0);

        stream.writeBoolean(true); // starr road

        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0); // todo: unlocking brawler

        stream.writeVint(0);

        stream.writeVint(0);
        stream.writeVint(0);

        // mastery
        stream.writeVint(Object.keys(player.ownedBrawlers).length);
        for (const [brawlerID, brawlerData] of Object.entries(player.ownedBrawlers)) {
            stream.writeVint(brawlerData.masteryPoints);  // Mastery Points
            stream.writeVint(brawlerData.masteryClaimed); // Claimed Rewards
            stream.writeDataReference(16, Number(brawlerID)); // Brawler ID (convert string key to number)
        }

        // battle card
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeBoolean(false);

        stream.writeVint(0); // brawler battle cards

        // starr drop data
        stream.writeVint(14);
        stream.writeVint(0);
        stream.writeInt(-1435281534);
        stream.writeVint(0); // progression step in battles
        stream.writeVint(0);
        stream.writeVint(86400 * 24);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeBoolean(false);

        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeVint(0);
        stream.writeBoolean(false);

        // end LogicClientHome

        stream.writeVlong(player.id[0], player.id[1]);
        stream.writeVlong(player.id[0], player.id[1]);
        stream.writeVlong(player.id[0], player.id[1]);
        stream.writeString(player.name);
        stream.writeBoolean(player.registered);
        stream.writeInt(-1);

        stream.writeVint(23);
        const unlockedBrawler = Object.values(player.ownedBrawlers).map(i => i.cardID);
        stream.writeVint(unlockedBrawler.length + 3);
        for (const x of unlockedBrawler) {
            stream.writeDataReference(23, x);
            stream.writeVint(-1);
            stream.writeVint(1);
        }

        stream.writeDataReference(5, 8);
        stream.writeVint(-1);
        stream.writeVint(player.coins);

        stream.writeDataReference(5, 8);
        stream.writeVint(-1);
        stream.writeVint(player.coins);

        stream.writeDataReference(5, 21);
        stream.writeVint(-1);
        stream.writeVint(-1); // todo star road

        stream.writeDataReference(5, 23);
        stream.writeVint(-1);
        stream.writeVint(player.bling);

        stream.writeVint(Object.keys(player.ownedBrawlers).length);
        for (const [brawlerID, brawlerData] of Object.entries(player.ownedBrawlers)) {
            stream.writeDataReference(16, Number(brawlerID));
            stream.writeVint(-1);
            stream.writeVint(brawlerData.trophies);
        }

        stream.writeVint(Object.keys(player.ownedBrawlers).length);
        for (const [brawlerID, brawlerData] of Object.entries(player.ownedBrawlers)) {
            stream.writeDataReference(16, Number(brawlerID));
            stream.writeVint(-1);
            stream.writeVint(brawlerData.highestTrophies);
        }


        stream.writeVint(0);

        stream.writeVint(0);

        stream.writeVint(Object.keys(player.ownedBrawlers).length);
        for (const [brawlerID, brawlerData] of Object.entries(player.ownedBrawlers)) {
            stream.writeDataReference(16, Number(brawlerID));
            stream.writeVint(-1);
            stream.writeVint(brawlerData.powerlevel);
        }

        stream.writeVint(0); // hero star power gadget and hyper

        stream.writeVint(Object.keys(player.ownedBrawlers).length);
        for (const [brawlerID, brawlerData] of Object.entries(player.ownedBrawlers)) {
            stream.writeDataReference(16, Number(brawlerID));
            stream.writeVint(-1);
            stream.writeVint(brawlerData.state);
        }

        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(0);

        stream.writeVint(player.gems);
        stream.writeVint(player.gems);
        stream.writeVint(player.level);
        stream.writeVint(100);
        stream.writeVint(0);
        stream.writeVint(100); // battle count
        stream.writeVint(10); // win count
        stream.writeVint(80); // lose count
        stream.writeVint(50); // win/lose streak
        stream.writeVint(0);
        stream.writeVint(2); // tutorial state
        stream.writeVint(12);
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeString("");
        stream.writeVint(0);
        stream.writeVint(0);
        stream.writeVint(1);

        return stream.payload;
    }
}