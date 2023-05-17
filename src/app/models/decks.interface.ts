import { CardsI } from "./cards.interface";

export interface DecksI {
    id: string;
    nombre: string;
    cartas: CardsI[];
    estado: boolean;
  }