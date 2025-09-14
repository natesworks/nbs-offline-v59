import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { Config } from "../../config.js";
import { Hero } from "../../hero.js";
import { BattleEndData } from "../../battleenddata.js";

export class AskForBattleEndMessage {
    static decode(player: Player, stream: ByteStream): BattleEndData {
        let gamemode = stream.readVint();
        let result = stream.readVint();
        let rank = stream.readVint();
        let mapID = stream.readDataReference();
        let heroes: Hero[] = [];
        let heroCount = stream.readVint();
        for (let i = 0; i < heroCount; i++) {
            // ugly ass code
            heroes.push(new Hero(stream.readDataReference(), stream.readDataReference(), stream.readVint(), stream.readBoolean(), stream.readString()));
        }

        console.log("AskBattleEndMessage:", JSON.stringify(heroes, null, 2));
        return new BattleEndData(gamemode, result, rank, mapID, heroes);
    }
}