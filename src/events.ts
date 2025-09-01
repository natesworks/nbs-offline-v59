interface LogicGemOffer {
  id: number;
  amount: number;
  csvID: number[];
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
  slot: number;
  timeToEnd: number;
  tokens: number;
  mapID: number;
  claimedTokens: number[];
  championShipInfo?: ChampionShipInfo;
}

export const events: Event[] = [
  {
    slot: 2,
    timeToEnd: 1738226512.052918,
    tokens: 10,
    mapID: 774,
    claimedTokens: []
  },
  {
    slot: 1,
    timeToEnd: 1738269712.0646296,
    tokens: 10,
    mapID: 808,
    claimedTokens: []
  },
  {
    slot: 4,
    timeToEnd: 1738269712.075367,
    tokens: 10,
    mapID: 719,
    claimedTokens: []
  },
  {
    slot: 5,
    timeToEnd: 1738269712.0861027,
    tokens: 10,
    mapID: 775,
    claimedTokens: []
  },
  {
    slot: 6,
    timeToEnd: 1727536357.3456142,
    tokens: 10,
    mapID: 638,
    claimedTokens: []
  },
  {
    slot: 11,
    timeToEnd: 1727536357.3456142,
    tokens: 10,
    mapID: 7,
    claimedTokens: []
  },
  {
    slot: 20,
    timeToEnd: 1727536357.3456142,
    tokens: 10,
    mapID: 636,
    claimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        csvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    slot: 21,
    timeToEnd: 1727536357.3456142,
    tokens: 10,
    mapID: 22,
    claimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        csvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    slot: 22,
    timeToEnd: 1727536357.3456142,
    tokens: 10,
    mapID: 19,
    claimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        csvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    slot: 23,
    timeToEnd: 1727536357.3456142,
    tokens: 10,
    mapID: 548,
    claimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        csvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(82040537547002ae2f85da04fd223c423aaf7618",
        scFile: "/d35569bd-80ec-4007-82c0-b0bd9b6381b3_challenge_brawloween2024.sc"
      }
    }
  },
  {
    slot: 36,
    timeToEnd: 2427536357.3456144,
    tokens: 10,
    mapID: 548,
    claimedTokens: [],
    championShipInfo: {
      MaxWins: 3,
      ChoronosTextEntry: "GRUESOME!",
      LogicGemOffer: {
        id: 4,
        amount: 1,
        csvID: [0, 0],
        skinID: 959
      },
      chronosFileEntry: {
        scName: "(1a1d6744f7dfb7bcfa54e3876c944b1da9d075db",
        scFile: "/3f8dc547-1aed-4d85-81b0-32ead16f7474_collab_toystory.sc"
      }
    }
  }
];