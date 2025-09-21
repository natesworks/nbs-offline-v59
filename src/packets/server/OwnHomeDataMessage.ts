import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { events } from "../../events.js";

export class OwnHomeDataMessage {
    static encode(player: Player): number[] {
        console.log("bruh");
        console.log("Lengthx:", Array.from(new Uint8Array(File.readAllBytes("/data/local/tmp/ohd.bin"))).length);
        return Array.from(new Uint8Array(File.readAllBytes("/data/local/tmp/ohd.bin")));
    }
}