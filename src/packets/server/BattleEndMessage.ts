import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { Config } from "../../config.js";
import { BattleEndData } from "../../battleenddata.js";

export class BattleEndMessage {
    static encode(player: Player, data: BattleEndData): number[] {
        let stream = new ByteStream([]);

        return stream.payload;
    }
}