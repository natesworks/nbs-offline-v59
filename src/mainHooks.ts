import { Offsets } from "./offsets";
import { base, } from "./definitions";
import { installOfflineHooks } from "./offline";
import { Config } from "./config";
import { backtrace, decodeString } from "./util";
import { crashFixes } from "./crashFixes";
import { PiranhaMessage } from "./piranhamessage";

export function installHooks() {
    Interceptor.attach(base.add(0xae0eac),
        {
            onLeave(retval) {
                console.log("ByteStream::readString", decodeString(retval));
            },
        });

    Interceptor.attach(base.add(0xae2034),
        {
            onLeave(retval) {
                if (retval.toInt32() == 7171) {
                    console.log("Breakpoint hit");
                    retval.replace(ptr(0));
                }
            },
        });

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
                retval.replace(ptr(1));
            },
        });

    Interceptor.attach(base.add(Offsets.IsDev),
        {
            onLeave(retval) {
                retval.replace(ptr(1));
            },
        });

    if (Config.offlineBattles)
        Interceptor.attach(base.add(Offsets.HomePageStartGame),
            {
                onEnter: function (args) {
                    args[3] = ptr(3);
                }
            });

    /*
    Interceptor.replace(base.add(Offsets.LogicCharacterServerHasUlti), new NativeCallback(function (a1 : NativePointer) {
        return 1;
    }, "bool", ["pointer"]));
    */

    /*
    Interceptor.attach(base.add(Offsets.NativeFontFormatString),
        {
            onEnter(args) {
                args[7] = ptr(1);
            },
        });
    */

    crashFixes();
    if (Config.offline) installOfflineHooks();
    console.log("Done");
}