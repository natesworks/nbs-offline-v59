import { Offsets } from "./offsets.js";
import { PiranhaMessage } from "./piranhamessage.js";
import { base, player, } from "./definitions.js";
import { Messaging } from "./messaging.js";
import { LoginOkMessage } from "./packets/server/LoginOkMessage.js";
import { OwnHomeDataMessage } from "./packets/server/OwnHomeDataMessage.js";

export function installHooks() {

    Interceptor.attach(base.add(Offsets.ServerConnectionUpdate),
        {
            onEnter: function (args) {
                args[0].add(Process.pointerSize).readPointer().add(Offsets.HasConnectFailed).writeU8(0);
                args[0].add(Process.pointerSize).readPointer().add(Offsets.State).writeInt(5);
            }
        });
}