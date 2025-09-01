import { Offsets } from "./offsets.js";
import { base, createMessageByType, malloc, messageManagerReceiveMessage, operator_new } from "./definitions.js";
import { PiranhaMessage } from "./piranhamessage.js";
import { decodeString, getMessageManagerInstance } from "./util.js";

export class Messaging {
    static sendOfflineMessage(id: number, payload: number[]): NativePointer {
        let version = id == 20104 ? 1 : 0;
        const factory = Memory.alloc(512);
        factory.writePointer(base.add(Offsets.LogicLaserMessageFactory));
        let message = createMessageByType(factory, id);
        message.add(Offsets.Version).writeS32(version);
        const payloadLength = PiranhaMessage.getByteStream(message).add(Offsets.PayloadSize);
        Memory.protect(payloadLength, 4, 'rw-');
        payloadLength.writeS32(payload.length);
        if (payload.length > 0) {
            let payloadPtr = operator_new(payload.length).writeByteArray(payload);
            PiranhaMessage.getByteStream(message).add(Offsets.PayloadPtr).writePointer(payloadPtr);
        }
        let decode = new NativeFunction(
            message
                .readPointer()
                .add(Offsets.Decode)
                .readPointer(),
            "void",
            ["pointer"]
        );
        decode(message);
        console.log("Message decoded succesfully");
        messageManagerReceiveMessage(getMessageManagerInstance(), message);
        console.log("Message received");
        return message;
    }
}