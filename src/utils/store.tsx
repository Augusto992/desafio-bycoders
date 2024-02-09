import { atom } from 'recoil';
import { CardInfo } from "../types/general";

export const cardsState = atom({
  key: 'cardsInfo',
  default: null as CardInfo[] | null,
});