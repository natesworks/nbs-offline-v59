interface LogicGemOffer {
  id: number;
  amount: number;
  CsvID: number[];
  skinID: number;
}

interface ChronosFileEntry {
  scName: string;
  scFile: string;
}

interface ChampionShipInfo {
  MaxWins: number;
  ChoronosTextEntry: string;
  LogicGemOffer: LogicGemOffer;
  chronosFileEntry: ChronosFileEntry;
}

interface Event {
  Slot: number;
  TimeToEnd: number;
  Tokens: number;
  MapID: number;
  ClaimedTokens: number[];
  championShipInfo?: ChampionShipInfo;
}

interface Root {
  events: Event[];
}

export const events: Event[] = [
  {
    Slot: 2,
    TimeToEnd: 1738226512.052918,
    Tokens: 10,
    MapID: 774,
    ClaimedTokens: []
  },
  {
    Slot: 1,
    TimeToEnd: 1738269712.0646296,
    Tokens: 10,
    MapID: 808,
    ClaimedTokens: []
  },
  {
    Slot: 4,
    TimeToEnd: 1738269712.075367,
    Tokens: 10,
    MapID: 719,
    ClaimedTokens: []
  },
  {
    Slot: 5,
    TimeToEnd: 1738269712.0861027,
    Tokens: 10,
    MapID: 775,
    ClaimedTokens: []
  },
  {
    Slot: 6,
    TimeToEnd: 1727536357.3456142,
    Tokens: 10,
    MapID: 638,
    ClaimedTokens: []
  },
  {
    Slot: 11,
    TimeToEnd: 1727536357.3456142,
    Tokens: 10,
    MapID: 7,
    ClaimedTokens: []
  },
  {
    Slot: 20,
    TimeToEnd: 1727536357.3456142,
    Tokens: 10,
    MapID: 636,
    ClaimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        CsvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    Slot: 21,
    TimeToEnd: 1727536357.3456142,
    Tokens: 10,
    MapID: 22,
    ClaimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        CsvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    Slot: 22,
    TimeToEnd: 1727536357.3456142,
    Tokens: 10,
    MapID: 19,
    ClaimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        CsvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    Slot: 23,
    TimeToEnd: 1727536357.3456142,
    Tokens: 10,
    MapID: 548,
    ClaimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        CsvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    Slot: 36,
    TimeToEnd: 2427536357.3456144,
    Tokens: 10,
    MapID: 548,
    ClaimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        CsvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(1a1d6744f7dfb7bcfa54e3876c944b1da9d075db",
        scFile: "/3f8dc547-1aed-4d85-81b0-32ead16f7474_collab_toystory.sc"
      }
    }
  }
];