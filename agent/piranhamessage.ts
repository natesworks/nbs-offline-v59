import { Offsets } from "./offsets.js";

export class PiranhaMessage {
    static getMessageType(message: NativePointer): number { // why is it number not int :rage:
        let vtable = message.readPointer();
        let getMessageType = new NativeFunction(vtable.add(Offsets.GetMessageType).readPointer(), 'int', []);
        return getMessageType();
    }

    static destroyMessage(message: NativePointer): void {
        let vtable = message.readPointer();
        let destroyMessage = new NativeFunction(vtable.add(Offsets.Destruct).readPointer(), 'void', ['pointer']);
        return destroyMessage(message); // no need to ret but looks better imo
    }

    static getMessageLength(message : NativePointer) : number {
        return message.add(Offsets.MessageLength).readS32();
    }

    static getByteStream(message : NativePointer) : NativePointer { // probably the first time ever i type the 'S' in ByteStream capital
        return message.add(Offsets.ByteStream);
    }
}
