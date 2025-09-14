import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { Config } from "../../config.js";
import { BattleEndData } from "../../battleenddata.js";

export class BattleEndMessage {
    static encode(player: Player, data: BattleEndData): number[] {
        let stream = new ByteStream([]);
        // todo
        stream.writeLong(player.id[0], player.id[1]);
        stream.writeLong(player.id[0], player.id[1]);
        stream.writeVint(data.gamemode);
        stream.writeVint(data.rank);
        stream.writeVint(0); // tokens gained
        stream.writeVint(player.trophies);
        console.log("BattleEndMessage size:", stream.payload.length);
        return stream.payload;
    }
}