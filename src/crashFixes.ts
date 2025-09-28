import { base } from "./definitions";
import { Offsets } from "./offsets";
import { backtrace } from "./util";

export function crashFixes() {
    Interceptor.attach(base.add(0x6b0980), {
        onEnter(args) {
            this.addr = args[0].add(160);
            this.prevVal = this.addr.readU32();
            //console.log(this.prevVal);
            this.addr.writeU32(1);
        },
        onLeave(retval) {
            this.addr.writeU32(8);
        },
    });

    const loadclass = new NativeFunction(base.add(0xf5cab8), "int", ["pointer"]);

    Interceptor.replace(base.add(0xf5cab8), new NativeCallback(function (cls: NativePointer) {
        try {
            return loadclass(cls);
        }
        catch (e) {
            //console.log(e);
            //backtrace(this.context);
            return 1;
        }
    }, "int", ["pointer"]));

    Interceptor.replace(base.add(0xcbba34), new NativeCallback(function () {
        return 0;
    }, "int", []));

    Interceptor.replace(base.add(0xc873e8), new NativeCallback(function () {
        return 0;
    }, "int", []));

    Interceptor.replace(base.add(0xc8494c), new NativeCallback(function () {
        return 0;
    }, "int", []));

    Interceptor.replace(base.add(0xcd9810), new NativeCallback(function () {
        return 0;
    }, "int", []));
}