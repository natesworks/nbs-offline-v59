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
  }
];