import { Offsets } from "./offsets.js";
import { Player } from "./player.js";

export let base = NULL;

export const libc = Process.getModuleByName('libc.so');;

export const malloc = new NativeFunction(libc.getExportByName('malloc'), 'pointer', ['uint']);

export const createMessageByType = new NativeFunction(base.add(Offsets.CreateMessageByType), "pointer", ["int", "int"]);
export const operator_new = new NativeFunction(base.add(Offsets.OperatorNew), "pointer", ["int"]);
export const messageManagerReceiveMessage = new NativeFunction(base.add(Offsets.MessageManagerReceiveMessage), "int", ["pointer", "pointer"]);
export const stringCtor = new NativeFunction(base.add(Offsets.StringConstructor), "pointer", ["pointer", "pointer"]);

export let player = new Player();

export function setBase(ptr : NativePointer) {
  base = ptr;
}

export const credits = `NBS Offline v1

Made by Natesworks 
Discord: dsc.gg/nbsoffline

💙THANKS TO💙

S.B:
- Making an amazing guide on reverse engineering/making Brawl Stars Offline (peterr.dev/re/brawl-stars-offline).
- Answering my questions when I didn't understand something.

xXCooBloyXx:
- Telling me how to get some of the required offsets for sendOfflineMessage.
`