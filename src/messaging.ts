import { Offsets } from "./offsets";
import { base, createMessageByType, malloc, messageManagerReceiveMessage, operator_new } from "./definitions";
import { PiranhaMessage } from "./piranhamessage";
import { decodeString, getFactory, getMessageManagerInstance } from "./util";

export class Messaging {
    static sendOfflineMessage(id: number, payload: number[]): NativePointer {
        let version = id == 20104 ? 1 : 0;
        let message = createMessageByType(getFactory(), id);
        console.log(message);
        message.add(Offsets.Version).writeInt(version);
        PiranhaMessage.getByteStream(message).add(Offsets.PayloadSize).writeInt(payload.length);
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
        try {
            messageManagerReceiveMessage(getMessageManagerInstance(), message);
        } catch (e) {
            console.log(e);
        }
        console.log("Message received");
        return message;
    }
}