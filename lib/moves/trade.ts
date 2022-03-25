import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Space } from "../configs/spaces";
import { GameState, TradeItems, Player, Trade } from "../KaszebscziMol";

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
  items: TradeItems,
  playerID: string
) =>
  items.money >= 0 &&
  items.money <= players[playerID].money &&
  areTradeable(spaces, items.properties, playerID);

const updatePlayer = (
  spaces: Space[],
  player: Player,
  loses: Trade,
  gets: Trade
) => {
  player.money = player.money + gets.items.money - loses.items.money;

  player.properties = player.properties.filter(
    property => !loses.items.properties.includes(property)
  );
  player.properties = player.properties.concat(gets.items.properties);

  loses.items.properties.forEach(
    propertyID => (spaces[propertyID].owner = gets.player)
  );
};

export const selectPlayer: Move<GameState> = (G, ctx, playerID: string) => {
  G.trade.offers.player = ctx.currentPlayer;
  G.trade.wants.player = playerID;
  ctx.events.setPhase("trade");
};

export const makeOffer: Move<GameState> = (
  G,
  ctx,
  items: Record<"offers" | "wants", TradeItems>
) => {
  const { offers, wants } = G.trade;

  if (
    offers.player === "" ||
    wants.player === "" ||
    offers.player !== ctx.currentPlayer
  )
    return INVALID_MOVE;

  // Check if trade items are empty
  if (
    items.offers.money === 0 &&
    items.offers.properties.length === 0 &&
    items.wants.money === 0 &&
    items.wants.properties.length === 0
  )
    return INVALID_MOVE;

  // Check if the players have enough money and that
  // they own properties that are without buildings
  if (!areItemsCorrect(G.spaces, G.players, items.offers, offers.player))
    return INVALID_MOVE;
  if (!areItemsCorrect(G.spaces, G.players, items.wants, wants.player))
    return INVALID_MOVE;

  G.trade.offers.items = items.offers;
  G.trade.wants.items = items.wants;
};

export const acceptOffer: Move<GameState> = (G, ctx) => {
  const { offers, wants } = G.trade;
  const offersPlayer = G.players[offers.player];
  const wantsPlayer = G.players[wants.player];

  updatePlayer(G.spaces, offersPlayer, offers, wants);
  updatePlayer(G.spaces, wantsPlayer, wants, offers);

  ctx.events.endPhase();
};
export const rejectOffer: Move<GameState> = (_, ctx) => ctx.events.endPhase();
