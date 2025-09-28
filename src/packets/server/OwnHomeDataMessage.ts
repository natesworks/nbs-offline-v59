import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { events } from "../../events.js";

export class OwnHomeDataMessage {
    static encode(player: Player): number[] {
        let stream = new ByteStream([]);
        // OwnHomeDataMessage is not done yet. I tested using stream.writeHexa
        return stream.payload;
    }
}