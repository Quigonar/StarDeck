import { CardsI } from "./cards.interface";
import { PlanetsI } from "./planets.interface";
import { PlayerI } from "./player.interface";
import { TurnI } from "./turn.interface";

export interface completeTurnI {
    infoPartida: TurnI,
    cartasManoUsuario: CardsI[],
    cartasDeckUsuario: CardsI[],
    cartasManoRival: CardsI[],
    cartasDeckRival: CardsI[],
    cartasPlanetas: CardsI[][],
    cartasRivalPlanetas: CardsI[][],
    planetasEnPartida: PlanetsI[],
    rival: PlayerI
}