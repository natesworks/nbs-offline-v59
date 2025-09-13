import { Offsets } from "./offsets.js";

export class PiranhaMessage {
    static getMessageType(message: NativePointer): number {
        let vtable = message.readPointer();
        let getMessageType = new NativeFunction(vtable.add(Offsets.GetMessageType).readPointer(), 'int', []);
        return getMessageType();
    }

    static destroyMessage(message: NativePointer): void {
        let vtable = message.readPointer();
        let destroyMessage = new NativeFunction(vtable.add(Offsets.Destruct).readPointer(), 'void', ['pointer']);
        return destroyMessage(message); // no need to ret but looks better imo
    }

    static getEncodingLength(message: NativePointer): number {
        return this.getByteStream(message).add(Offsets.PayloadSize).readS32();
    }

    static getByteStream(message : NativePointer) : NativePointer {
        return message.add(Offsets.ByteStream);
    }
}
