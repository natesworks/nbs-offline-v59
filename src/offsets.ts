const IsAndroid = Process.platform === "linux";

export const Offsets = {
    ServerConnectionUpdate: IsAndroid ? 0x45fa98 : 0x1fa618,
    HasConnectFailed: Process.pointerSize,
    State: IsAndroid ? 16 : 24,
    GetMessageType: Process.pointerSize * 5,
    Destruct: Process.pointerSize * 7,
    Decode: 3 * Process.pointerSize,
    MessageManagerReceiveMessage: IsAndroid ? 0x45318c : 0x11b4478,
    HomePageStartGame: IsAndroid ? 0x58aba8 : 0x11b465c,
    MessagingSend: IsAndroid ? 0x9b05fc : 0x11ef8,
    MessageManagerSendMessage: IsAndroid ? 0x452fd0 : 0x1f0b98,
    NativeFontFormatString: 0x0, // todo
    MessageManagerInstance: IsAndroid ? 0xda52e4 : 0x11828d8,
    CreateMessageByType: IsAndroid ? 0x6f1b90 : 0x3ecd4c,
    LogicLaserMessageFactory: IsAndroid ? 0xce0a9a : 0x101891e,

    Version: IsAndroid ? 84 : 136,
    ByteStream: Process.pointerSize,
    PayloadSize: IsAndroid ? 20 : 24,
    PayloadPtr: IsAndroid ? 44 : 56,

    OperatorNew: IsAndroid ? 0xcb6380 : 0xe0095c,
    StringConstructor: IsAndroid ? 0x9c428c : 0xdcfacc,
    IsDev: IsAndroid ? 0x5ecbc8 : 0x32fbe8,

    DebuggerError: IsAndroid ? 0x813fa0 : 0xc01930,
    StringTableGetString: 0x5d4eb8,
    MoieClipGetTextFieldByName: 0x7d0ce4,
    TextFieldSetText: 0x7ff96c,
    MovieClipGetMovieClipByName: 0x7d0920,
    GameButtonConstructor: 0x2a5410,
    ResourceManagerGetMovieClip: 0x7a28e4,
    CustomButtonSetMovieClip: 0x803ba0,
    CustomButtonSetButtonListener: 0x803ce8,
};