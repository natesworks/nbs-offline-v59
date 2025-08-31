import { Offsets } from "./offsets.js";
import { Player } from "./player.js";

export const base = Module.getBaseAddress("libg.so");

export const malloc = new NativeFunction(Module.getExportByName('libc.so', 'malloc'), 'pointer', ['uint']);

export const createMessageByType = new NativeFunction(base.add(Offsets.CreateMessageByType), "pointer", ["int", "int"]);
export const operator_new = new NativeFunction(base.add(Offsets.OperatorNew), "pointer", ["int"]);
export const messageManagerReceiveMessage = new NativeFunction(base.add(Offsets.MessageManagerReceiveMessage), "int", ["pointer", "pointer"]);
export const stringCtor = new NativeFunction(base.add(Offsets.StringConstructor), "pointer", ["pointer", "pointer"]);

export let player = new Player();

export const credits = `NBS Offline v2.2

Made by Natesworks 
Contact: contact@natesworks.com
Discord: dsc.gg/nbsoffline

💙THANKS TO💙

S.B:
- Making an amazing guide on reverse engineering/making Brawl Stars Offline (peterr.dev/re/brawl-stars-offline).
- Answering my questions when I didn't understand something.

xXCooBloyXx:
- Telling me how to get some of the required offsets for sendOfflineMessage.
`