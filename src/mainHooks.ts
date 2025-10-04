import { Offsets } from "./offsets";
import { base, } from "./definitions";
import { installOfflineHooks } from "./offline";
import { Config } from "./config";
import { backtrace, decodeString, nop } from "./util";
import { PiranhaMessage } from "./piranhamessage";

export function installHooks() {
    Interceptor.attach(base.add(Offsets.LogicDailyDataGetIntValue),
        {
            onEnter(args) {
                let key = args[1].toInt32();
                if (key == 15) {
                    this.replacement = ptr(0);
                }
            },
            onLeave(retval) {
                if (this.replacement) retval.replace(this.replacement);
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
                    console.log("xd");
                    args[3] = ptr(3);
                }
            });

    Interceptor.attach(base.add(0x67f7c4),
        {
            onEnter(args) {
                backtrace(this.context);
            },
        })

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

    Interceptor.replace(base.add(0x6b0980), new NativeCallback(function (self) {
        self.add(160).writeS32(4); // switch mode mode always to 4 i guess
        return self;
    }, "pointer", ["pointer"]));

    Interceptor.attach(base.add(Offsets.LogicConfDataIsModuloOn),
        {
            onEnter(args) {
                let id = args[2].toUInt32();
                //console.log(id);
                if (id == 141) { // HomeMode::isTutorialAndReengageTrackerEnabled
                    this.value = 0;
                }
            },
            onLeave(retval) {
                if (this.value) retval.replace(ptr(this.value));
            },
        });


    Interceptor.attach(base.add(0x67f7c4),
        {
            onEnter(args) {
                backtrace(this.context);
            },
        })

    Interceptor.replace(base.add(0xa364ac), new NativeCallback(function () {
        return 0xFFFFFFFF;
    }, "int", []));

    if (Config.offline) installOfflineHooks();
    console.log("Done");
}