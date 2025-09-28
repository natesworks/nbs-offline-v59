import { base, malloc, stringCtor } from "./definitions";
import { Offsets } from "./offsets";

export function toHex(val: number): string {
    return "0x" + val.toString(16);
}

export function getMessageManagerInstance(): NativePointer {
    let instance = base.add(Offsets.MessageManagerInstance).readPointer();
    console.log("MessageManager::sm_pInstance", toHex(instance.sub(base).toUInt32()));
    return instance;
}

export function getMessagingInstance(): NativePointer {
    let instance = getMessageManagerInstance().add(Offsets.MessagingInstance).readPointer();
    console.log("Messaging instance", toHex(instance.sub(base).toUInt32()));
    return instance;
}

export function getFactory(): NativePointer {
    let instance = getMessagingInstance().add(Offsets.LogicLaserMessageFactoryInstance).readPointer();
    console.log("Factory instance", toHex(instance.sub(base).toUInt32()));
    return instance;
}

export function backtrace(ctx: CpuContext | undefined): void {
    const frames: any[] = Thread.backtrace(ctx, Backtracer.FUZZY);
    let lastAddr = "";
    let printed = 0;
    for (let i = 0; i < frames.length; i++) {
        const f = frames[i];
        const addrStr = (typeof f === "string" || typeof f === "number") ? String(f) : f.toString();
        if (addrStr === lastAddr) continue;
        lastAddr = addrStr;
        const address = ptr(addrStr);
        const m = Process.findModuleByAddress(address);
        if (m) {
            const off = address.sub(m.base).toString();
            console.log(`${printed.toString().padStart(2, " ")}  ${m.name} + ${off}  (${address})`);
        } else {
            console.log(`${printed.toString().padStart(2, " ")}  <unknown>  (${address})`);
        }
        printed++;
    }
}

export function decodeString(src: NativePointer): string | null {
    if (src.add(4).readInt() >= 8) {
        return src.add(8).readPointer().readUtf8String();
    }
    return src.add(8).readUtf8String();
}

export function strPtr(message: string) {
    var charPtr = malloc(message.length + 1);
    charPtr.writeUtf8String(message);
    return charPtr
}

export function createStringObject(text: string) {
    let ptr = malloc(128);
    stringCtor(ptr, strPtr(text));
    return ptr;
}

// cant use TextEncoder or TextDecoder in frida so skidded this thing
export function utf8ArrayToString(array: Uint8Array): string {
    let out = '', i = 0, len = array.length
    while (i < len) {
        let c = array[i++]
        if (c < 128) {
            out += String.fromCharCode(c)
        } else if (c > 191 && c < 224) {
            let c2 = array[i++]
            out += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        } else {
            let c2 = array[i++]
            let c3 = array[i++]
            out += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        }
    }
    return out
}

export function stringToUtf8Array(str: string): Uint8Array {
    let utf8 = []
    for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i)
        if (charcode < 0x80) {
            utf8.push(charcode)
        } else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f))
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f))
        } else {
            i++
            let surrogatePair = 0x10000 + (((charcode & 0x3ff) << 10)
                | (str.charCodeAt(i) & 0x3ff))
            utf8.push(0xf0 | (surrogatePair >> 18),
                0x80 | ((surrogatePair >> 12) & 0x3f),
                0x80 | ((surrogatePair >> 6) & 0x3f),
                0x80 | (surrogatePair & 0x3f))
        }
    }
    return new Uint8Array(utf8)
}

export function waitForModule(name: string, intervalMs = 10): Promise<NativePointer> {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const handle = Process.getModuleByName(name).base;
            if (handle) {
                clearInterval(interval);
                resolve(handle);
            }
        }, intervalMs);
    });
}