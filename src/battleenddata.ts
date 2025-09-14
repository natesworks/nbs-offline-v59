import { Hero } from "./hero";
import { Long } from "./long";

export class BattleEndData {
    gamemode: number;
    result: number;
    rank: number;
    mapID: Long;
    heroes: Hero[];

    constructor(gamemode: number, result: number, rank: number, mapID: Long, heroes: Hero[]) {
        this.gamemode = gamemode;
        this.result = result;
        this.rank = rank;
        this.mapID = mapID;
        this.heroes = heroes;
    }
}