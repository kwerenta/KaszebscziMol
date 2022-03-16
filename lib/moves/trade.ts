import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Space } from "../configs/spaces";
import { GameState, Items, Player } from "../KaszebscziMol";

// Check that properties don't have houses and that the player owns them
const areTradeable = (
  spaces: Space[],
  properties: number[],
  playerID: string
) =>
  properties.every(
    property =>
      spaces[property].owner === playerID && spaces[property].houses === 0
  );

const areItemsCorrect = (
  spaces: Space[],
  players: GameState["players"],
  items: Items,
  playerID: string
) =>
  items.money >= 0 &&
  items.money <= players[playerID].money &&
  areTradeable(spaces, items.properties, playerID);

const updatePlayer = (
  spaces: Space[],
  sourcePlayer: Player,
  source: GameState["trade"]["source"],
  target: GameState["trade"]["target"]
) => {
  sourcePlayer.money =
    sourcePlayer.money + target.items.money - source.items.money;

  sourcePlayer.properties = sourcePlayer.properties.filter(
    property => !source.items.properties.includes(property)
  );
  sourcePlayer.properties = sourcePlayer.properties.concat(
    target.items.properties
  );

  target.items.properties.forEach(
    propertyID => (spaces[propertyID].owner = source.player)
  );
};

export const offer: Move<GameState> = (
  G,
  ctx,
  targetPlayerID: string,
  items: { target: Items; source: Items }
) => {
  // Check that the items meet the conditions
  if (!areItemsCorrect(G.spaces, G.players, items.source, ctx.currentPlayer))
    return INVALID_MOVE;
  if (!areItemsCorrect(G.spaces, G.players, items.target, targetPlayerID))
    return INVALID_MOVE;

  G.trade = {
    source: { player: ctx.currentPlayer, items: items.source },
    target: { player: targetPlayerID, items: items.target },
  };

  ctx.events.setPhase("trade");
};

export const acceptOffer: Move<GameState> = (G, ctx) => {
  const { source, target } = G.trade;
  const sourcePlayer = G.players[source.player];
  const targetPlayer = G.players[target.player];

  updatePlayer(G.spaces, sourcePlayer, source, target);
  updatePlayer(G.spaces, targetPlayer, target, source);

  ctx.events.endPhase();
};
export const rejectOffer: Move<GameState> = (_, ctx) => ctx.events.endPhase();
