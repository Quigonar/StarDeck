import { PlayerI } from "./player.interface";
import { PlanetsI } from "./planets.interface";

export interface winnerI {
    winnerPerPlanet: PlayerI[],
    winner: PlayerI
    pointsPerPlanet: number[],
    pointsRivalPerPlanet: number[],
    planetsOnMatch: PlanetsI[],
    loser: PlayerI
}