import { Offsets } from "./offsets.js";
import { base, createMessageByType, factory, malloc, messageManagerReceiveMessage, operator_new } from "./definitions.js";
import { PiranhaMessage } from "./piranhamessage.js";
import { decodeString, getFactory, getMessageManagerInstance } from "./util.js";

export class Messaging {
    static sendOfflineMessage(id: number, payload: number[]): NativePointer {
        let version = id == 20104 ? 1 : 0;
        let message = createMessageByType(factory, id);
        console.log(message);
        message.add(Offsets.Version).writeInt(version);
        const payloadLength = PiranhaMessage.getByteStream(message).add(Offsets.PayloadSize);
        payloadLength.writeInt(payload.length);
        if (payload.length > 0) {
            let payloadPtr = operator_new(payload.length).writeByteArray(payload);
            PiranhaMessage.getByteStream(message).add(Offsets.PayloadPtr).writePointer(payloadPtr);
        }
        let decode = message
            .readPointer()
            .add(Offsets.Decode)
            .readPointer();
        console.log("Decode function:", decode.sub(base));
        let decodeFn = new NativeFunction(
            decode,
            "int",
            ["pointer"]
        );
        let res = decodeFn(message);
        console.log("Message decoded with return value", res);
        if (id == 20104) {
            try {
                messageManagerReceiveMessage(getMessageManagerInstance(), message);
            } catch (e) { }
        }
        messageManagerReceiveMessage(getMessageManagerInstance(), message);
        console.log("Message received");
        return message;
    }
}