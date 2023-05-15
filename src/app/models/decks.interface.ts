import { CardsI } from "./cards.interface";

export interface DecksI {
    Id: string;
    Nombre: string;
    Cartas: CardsI[];
    Estado: boolean;
  }