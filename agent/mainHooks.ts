import { Offsets } from "./offsets.js";
import { PiranhaMessage } from "./piranhamessage.js";
import { base, player, } from "./definitions.js";
import { Messaging } from "./messaging.js";
import { LoginOkMessage } from "./packets/server/LoginOkMessage.js";
import { OwnHomeDataMessage } from "./packets/server/OwnHomeDataMessage.js";
import { LobbyInfoMessage } from "./packets/server/LobbyInfoMessage.js";

export function installHooks() {

    Interceptor.attach(base.add(Offsets.ServerConnectionUpdate),
        {
            onEnter: function (args) {
                args[0].add(Process.pointerSize).readPointer().add(Offsets.HasConnectFailed).writeU8(0);
                args[0].add(Process.pointerSize).readPointer().add(Offsets.State).writeInt(5);
            }
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

    Interceptor.replace(
        base.add(Offsets.MessagingSend),
        new NativeCallback(function (self, message) {
            let type = PiranhaMessage.getMessageType(message);

            Messaging.sendOfflineMessage(23457, LobbyInfoMessage.encode(player));

            if (type == 10108)
                return 0;

            console.log("Type:", type);

            if (type == 10100 || type == 10101) { // ClientHelloMessage
                Messaging.sendOfflineMessage(20104, LoginOkMessage.encode(player));
                Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode(player));
            }
            else if (type == 14109) { // GoHomeFromOfflinePracticeMessage
                Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode(player));
            }

            PiranhaMessage.destroyMessage(message);

            return 0;
        }, "int", ["pointer", "pointer"])
    );

    Interceptor.attach(base.add(Offsets.NativeFontFormatString),
        {
            onEnter(args) {
                args[7] = ptr(1);
            },
        });
}