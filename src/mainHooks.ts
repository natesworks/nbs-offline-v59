import { Offsets } from "./offsets.js";
import { PiranhaMessage } from "./piranhamessage.js";
import { base, isAndroid, player, stringCtor, } from "./definitions.js";
import { Messaging } from "./messaging.js";
import { LoginOkMessage } from "./packets/server/LoginOkMessage.js";
import { OwnHomeDataMessage } from "./packets/server/OwnHomeDataMessage.js";
import { createStringObject, decodeString, strPtr } from "./util.js";

export function installHooks() {
    Interceptor.attach(base.add(Offsets.DebuggerError),
        {
            onEnter(args) {
                console.log("ERROR:", args[0].readCString());
            },
        });

    Interceptor.attach(base.add(Offsets.ServerConnectionUpdate),
        {
            onEnter: function (args) {
                args[0].add(Process.pointerSize).readPointer().add(Offsets.HasConnectFailed).writeU8(0);
                args[0].add(Process.pointerSize).readPointer().add(Offsets.State).writeInt(5);
            }
        });

    Interceptor.attach(base.add(Offsets.IsAuthenticated),
        {
            onLeave(retval) {
                console.log(retval.readS32());
                retval.replace(ptr(0));
            },
        })

    Interceptor.attach(base.add(Offsets.IsDev),
        {
            onLeave(retval) {
                retval.replace(ptr(1));
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

    Interceptor.attach(base.add(Offsets.IsAuthenticated),
        {
            onLeave(retval) {
                console.log(retval.readS32());
            },
        });

    Interceptor.replace(base.add(Offsets.MessagingSendMessage), new NativeCallback(function (a1: NativePointer, message: NativePointer) {
        let type = PiranhaMessage.getMessageType(message);
        console.log(type);
        if (type == 17750) {
            Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode(player));
        }
        return 1;
    }, "int", ["pointer", "pointer"]));

    Interceptor.replace(
        base.add(Offsets.MessagingSend),
        new NativeCallback(function (self, message) {

            /*
            let type = PiranhaMessage.getMessageType(message);
            let length = PiranhaMessage.getEncodingLength(message);

            console.log("Type:", type);
            console.log("Length:", length);
            */

            Messaging.sendOfflineMessage(20104, LoginOkMessage.encode(player));
            Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode(player));

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