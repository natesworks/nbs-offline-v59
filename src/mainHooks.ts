import { Offsets } from "./offsets";
import { PiranhaMessage } from "./piranhamessage";
import { base, messagingSend, player, stringCtor, } from "./definitions";
import { Messaging } from "./messaging";
import { LoginOkMessage } from "./packets/server/LoginOkMessage";
import { OwnHomeDataMessage } from "./packets/server/OwnHomeDataMessage";
import { createStringObject, decodeString, strPtr } from "./util";
import { BattleEndMessage } from "./packets/server/BattleEndMessage";
import { ByteStream } from "./bytestream";
import { AskForBattleEndMessage } from "./packets/client/AskForBattleEndMessage";
import { isAndroid } from "./platform";

export function installHooks() {
    Interceptor.attach(base.add(Offsets.DebuggerError),
        {
            onEnter(args) {
                console.log("ERROR:", args[0].readCString());
            },
        });

    Interceptor.attach(base.add(Offsets.DebuggerWarning),
        {
            onEnter(args) {
                console.log("WARN:", args[0].readCString());
            },
        });

    Interceptor.attach(base.add(Offsets.IsDeveloperBuild),
        {
            onLeave(retval) {
                retval.replace(ptr(1));
            },
        });

    Interceptor.attach(base.add(Offsets.IsProd),
        {
            onLeave(retval) {
                retval.replace(ptr(0));
            },
        });

    Interceptor.attach(base.add(Offsets.MessageManagerReceiveMessage),
        {
            onLeave: function (retval) {
                retval.replace(ptr(1));
            }
        });

    Interceptor.attach(base.add(Offsets.HomePageStartGame),
        {
            onEnter: function (args) {
                args[3] = ptr(3);
            }
        });

    Interceptor.replace(base.add(Offsets.MessageManagerSendMessage), new NativeCallback(function (messageManager: NativePointer, message: NativePointer) {
        let messaging = messageManager.add(Offsets.Messaging).readPointer();
        PiranhaMessage.encode(message);
        messagingSend(messaging.add(Offsets.Messaging), message);

        return 1;
    }, "int", ["pointer", "pointer"]));

    Interceptor.replace(
        base.add(Offsets.MessagingSend),
        new NativeCallback(function (self, message) {

            let type = PiranhaMessage.getMessageType(message);
            let length = PiranhaMessage.getEncodingLength(message);

            console.log("Type:", type);
            console.log("Length:", length);
            let payloadPtr = PiranhaMessage.getByteStream(message).add(Offsets.PayloadPtr).readPointer();
            let payload: ArrayBuffer | null = null;
            try {
                payload = payloadPtr.readByteArray(length);
            } catch {
                payloadPtr = PiranhaMessage.getByteStream(message).add(Offsets.PayloadPtr).readPointer();
                payload = payloadPtr.readByteArray(length);
            }

            if (type == 10100) { // ifs > switch
                Messaging.sendOfflineMessage(20104, LoginOkMessage.encode(player));
                Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode(player));
            }

            if (payload !== null && length != 0) {
                let stream = new ByteStream(Array.from(new Uint8Array(payload)));
                console.log("Stream dump:", hexdump(payload));

                if (type == 17750) {
                    Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode(player));
                } else if (type == 14110) { // erm execute shouldn't have these args :nerd:
                    //AskForBattleEndMessage.execute(player, stream);
                }
            }

            PiranhaMessage.destroyMessage(message);

            return 0;
        }, "int", ["pointer", "pointer"])
    );

    /*
    Interceptor.attach(base.add(Offsets.NativeFontFormatString),
        {
            onEnter(args) {
                args[7] = ptr(1);
            },
        });
    */

    console.log("Done");
}