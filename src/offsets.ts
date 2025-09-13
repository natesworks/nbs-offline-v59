import { isAndroid } from "./definitions";

export const Offsets = {
    ServerConnectionUpdate: isAndroid ? 0x45fa98 : 0x1fa618,
    HasConnectFailed: Process.pointerSize,
    State: isAndroid ? 16 : 24,
    GetMessageType: Process.pointerSize * 5,
    Destruct: Process.pointerSize * 7,
    Decode: 3 * Process.pointerSize,
    MessageManagerReceiveMessage: isAndroid ? 0x45318c : 0x1f0c48,
    HomePageStartGame: isAndroid ? 0x58aba8 : 0x2e18c4,
    MessagingSend: isAndroid ? 0x9b05fc : 0x0dbdc40,
    MessagingSendMessage: isAndroid ? 0x452fd0 : 0x1f0b98,
    NativeFontFormatString: 0x0, // todo
    MessageManagerInstance: isAndroid ? 0xda52e4 : 0x11828d8,
    CreateMessageByType: isAndroid ? 0x6f1b90 : 0x3ecd4c,
    LogicLaserMessageFactory: isAndroid ? 0xce0a9a : 0x101891e,

    Version: isAndroid ? 84 : 136,
    ByteStream: Process.pointerSize,
    PayloadSize: isAndroid ? 20 : 24,
    PayloadPtr: isAndroid ? 44 : 56,

    OperatorNew: isAndroid ? 0xcb6380 : 0xe0095c,
    StringConstructor: isAndroid ? 0x9c428c : 0xdcfacc,
    IsDev: isAndroid ? 0x5ecbc8 : 0x32fbe8,

    DebuggerError: isAndroid ? 0x813fa0 : 0xc0191c,
    StringTableGetString: 0x5d4eb8,
    MoieClipGetTextFieldByName: 0x7d0ce4,
    TextFieldSetText: 0x7ff96c,
    MovieClipGetMovieClipByName: 0x7d0920,
    GameButtonConstructor: 0x2a5410,
    ResourceManagerGetMovieClip: 0x7a28e4,
    CustomButtonSetMovieClip: 0x803ba0,
    CustomButtonSetButtonListener: 0x803ce8,

    SettingsGetSelectedLanguage: isAndroid ? 0x0 : 0xda44,
    LogicVersionIsChinaVersion: isAndroid ? 0x0 : 0x31d710
};