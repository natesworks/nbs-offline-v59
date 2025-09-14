import { base } from "./definitions.js";
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
        return this.getByteStream(message).add(Offsets.PayloadOffset).readS32();
    }

    static getByteStream(message: NativePointer): NativePointer {
        return message.add(Offsets.ByteStream);
    }

    static encode(message: NativePointer): NativePointer {
        let vtable = message.readPointer();
        const encode = new NativeFunction(vtable.add(Offsets.Encode).readPointer(), 'pointer', ['pointer']);
        return encode(message);
    }
}
