import { Ctx } from "boardgame.io";
import { Groups, Space } from "../configs/spaces";
import { GameState, Player } from "../KaszebscziMol";

export const getPlayer = (G: GameState, ctx: Ctx): Player =>
  G.players[ctx.currentPlayer];

export const goToJail = (currentPlayer: Player, ctx: Ctx) => {
  currentPlayer.jail = 3;
  currentPlayer.position = 12;
  ctx.events.setStage("noAction");
};

export const getColorGroupSpaces = (spaces: Space[], group: Groups) =>
  spaces.filter(space => space.group === group);
