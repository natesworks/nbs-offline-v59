import { isAndroid } from "./platform";

export const Offsets = {
    ServerConnectionUpdate: isAndroid ? 0x6c2090 : 0x0,
    HasConnectFailed: Process.pointerSize,
    State: isAndroid ? 24 : 0,
    GetMessageType: Process.pointerSize * 5,
    Destruct: Process.pointerSize * 7,
    Encode: 2 * Process.pointerSize,
    Decode: 3 * Process.pointerSize,
    MessageManagerReceiveMessage: isAndroid ? 0x6b6b08 : 0x0,
    HomePageStartGame: isAndroid ? 0x7eca28 : 0x0,
    MessagingSend: isAndroid ? 0xc32cbc : 0x0,
    MessageManagerSendMessage: isAndroid ? 0x6b6934 : 0x0,
    NativeFontFormatString: isAndroid ? 0x0 : 0x0,
    MessageManagerInstance: isAndroid ? 0x109b910 : 0x0,
    CreateMessageByType: isAndroid ? 0x9a71e0 : 0x0,

    Version: isAndroid ? 136 : 0,
    ByteStream: Process.pointerSize,
    ByteStreamOffset: isAndroid ? 20 : 0,
    PayloadSize: isAndroid ? 24 : 0,
    PayloadPtr: isAndroid ? 56 : 0,

    OperatorNew: isAndroid ? 0xf63880 : 0x0,
    StringConstructor: isAndroid ? 0xc44060 : 0x0,
    IsDev: isAndroid ? 0x86cf94 : 0x0,
    IsDeveloperBuild: isAndroid ? 0x86d008 : 0x0,
    IsProd: isAndroid ? 0x86cfa8 : 0x0,

    DebuggerError: isAndroid ? 0xae2bc4 : 0x0,
    DebuggerWarning: isAndroid ? 0xae2b48 : 0x0,

    StringTableGetString: isAndroid ? 0x0 : 0x0,
    MoieClipGetTextFieldByName: isAndroid ? 0x0 : 0x0,
    TextFieldSetText: isAndroid ? 0x0 : 0x0,
    MovieClipGetMovieClipByName: isAndroid ? 0x0 : 0x0,
    GameButtonConstructor: isAndroid ? 0x0 : 0x0,
    ResourceManagerGetMovieClip: isAndroid ? 0x0 : 0x0,
    CustomButtonSetMovieClip: isAndroid ? 0x0 : 0x0,
    CustomButtonSetButtonListener: isAndroid ? 0x0 : 0x0,
    MovieClipHelperSetTextAndScaleIfNecassery: isAndroid ? 0x0 : 0x0,
    MovieClipSetChildVisible: isAndroid ? 0x0 : 0x0,
    ScreenGetWidth: isAndroid ? 0x0 : 0x0,
    ScreenGetHeight: isAndroid ? 0x0 : 0x0,
    GUIShowFloaterTextAtDefaultPos: isAndroid ? 0x0 : 0x0,
    GUIInstance: isAndroid ? 0x109b2a0 : 0x0,
    GameMainInstance: isAndroid ? 0x3fc778 : 0x0,

    SettingsGetSelectedLanguage: isAndroid ? 0x0 : 0x0,
    LogicVersionIsChinaVersion: isAndroid ? 0x0 : 0x0,

    LogicCharacterServerHasUlti: isAndroid ? 0x96f24c : 0x0,

    MessagingInstance: isAndroid ? 72 : 0,
    LogicLaserMessageFactoryInstance: isAndroid ? 368 : 0,
    MessagingSetFactory: isAndroid ? 0xc33e94 : 0x0,

    MessagingEncryptAndWrite: isAndroid ? 0xc34bf8 : 0x0,

    LogicDailyDataGetIntValue: isAndroid ? 0x9e0ee8 : 0x0,
    LogicClientAvatarIsTutorialState: isAndroid ? 0x873dec : 0x0,
    HomeModeGetPlayerAvatar: isAndroid ? 0x0a23f44 : 0x0,

    LogicConfDataIsModuloOn: isAndroid ? 0x9ddff4 : 0x0
};
