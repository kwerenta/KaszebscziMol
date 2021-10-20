import { Ctx, Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { cards } from "./configs/cards";
import { GameState, Player } from "./KaszebscziMol";
import { groups } from "./configs/fields";

const endTurn: Move<GameState> = (_, ctx) => ctx.events?.endTurn();
const bankrupt: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  currentPlayer.bankrupt = true;
  // TEMP remove properties owned by bankrupted player
  currentPlayer.properties = [];
  G.fields = G.fields.map(f => ({
    ...f,
    owner: f.owner === currentPlayer.id ? undefined : f.owner,
  }));
  ctx.events?.pass({ remove: true });
};

export const defaultActions = {
  endTurn,
  bankrupt,
};

export const rollDice: Move<GameState> = (G, ctx) => {
  const dice = ctx.random?.Die(6, 2) || [0, 0];
  const currentPlayer = getPlayer(G, ctx);
  let newPosition = currentPlayer.position + dice[0] + dice[1];

  if (newPosition > 39) {
    currentPlayer.money += 200;
    newPosition -= 40;
  }
  currentPlayer.position = newPosition;
  const field = G.fields[newPosition];

  if (field.group) {
    if (!field.owner) {
      const isCardField = field.group === 10;
      const isGoToJail = field.group === 13;
      isCardField
        ? ctx.events?.setActivePlayers({
            currentPlayer: "cardField",
            next: { currentPlayer: "noAction" },
            moveLimit: 2,
          })
        : isGoToJail
        ? goToJail(currentPlayer, ctx)
        : ctx.events?.setActivePlayers({
            currentPlayer: "noOwner",
            next: { currentPlayer: "noAction" },
          });
    } else {
      field.owner === ctx.currentPlayer
        ? ctx.events?.setStage("isOwner")
        : ctx.events?.setActivePlayers({
            currentPlayer: "hasOwner",
            moveLimit: 1,
            next: { currentPlayer: "noAction" },
          });
    }
  } else {
    ctx.events?.setStage("noAction");
  }
};

export const bid: Move<GameState> = (G, ctx, amount: number) => {
  const currentPlayer = getPlayer(G, ctx);
  G.auction.price += amount;
  currentPlayer.money -= amount;
  ctx.events?.endTurn();
};

export const buyProperty: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = field.price || 0;
  if (currentPlayer.money < price) return INVALID_MOVE;

  field.owner = ctx.currentPlayer;
  currentPlayer.properties.push(currentPlayer.position);
  currentPlayer.money -= price;
  ctx.events?.endStage();
  return;
};

export const auction: Move<GameState> = (_, ctx) => {
  ctx.events?.setActivePlayers({
    all: "auction",
  });
};

export const pay: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const ownerPlayer =
    G.players[parseInt(G.fields[currentPlayer.position].owner || "-1")];

  const field = G.fields[currentPlayer.position];
  const currentRent = field.rent?.[field.houses ? field.houses : 0] || 0;
  if (currentPlayer.money < currentRent) return INVALID_MOVE;

  currentPlayer.money -= currentRent;
  ownerPlayer.money += currentRent;
  return;
};

export const buyHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = groups[field.group || 0].mortgage;

  if (currentPlayer.money < price || (field.houses && field.houses > 4))
    return INVALID_MOVE;

  field.houses ? field.houses++ : (field.houses = 1);
  currentPlayer.money -= price;
  ctx.events?.setStage("noAction");
};

export const sellHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = groups[field.group || 0].mortgage / 2;

  if (field.houses && field.houses < 1) return INVALID_MOVE;

  field.houses ? field.houses-- : (field.houses = 0);
  currentPlayer.money += price;
  ctx.events?.setStage?.("noAction");
};

export const drawCard: Move<GameState> = (G, ctx) => {
  // check if card is already drawn
  if (G.card > -1) return INVALID_MOVE;

  const card = ctx.random ? ctx.random?.Die(cards.length) - 1 : -1;
  G.card = card;
};

export const acceptCard: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  if (G.card < 0) return INVALID_MOVE;

  const currentCard = cards[G.card];

  switch (currentCard.action) {
    case "add":
      currentPlayer.money += currentCard.amount;
      break;

    case "substract":
      if (currentPlayer.money < currentCard.amount) return INVALID_MOVE;
      currentPlayer.money -= currentCard.amount;
      break;

    case "payAll":
      if (currentPlayer.money < currentCard.amount) return INVALID_MOVE;
      ctx.playOrder.forEach(id => {
        if (id === ctx.currentPlayer) {
          currentPlayer.money -= ctx.playOrder.length * currentCard.amount;
        } else {
          const player = G.players[parseInt(id)];
          player.money += currentCard.amount;
        }
      });
      break;
    case "getAll":
      ctx.playOrder.forEach(id => {
        if (id === ctx.currentPlayer) {
          currentPlayer.money += ctx.playOrder.length * currentCard.amount;
        } else {
          const player = G.players[parseInt(id)];

          if (player.money < currentCard.amount) {
            console.log(`Error! Player ${id} has not enough money`);
            return INVALID_MOVE;
          }
          player.money -= currentCard.amount;
        }
      });
      break;
    case "goToJail":
      goToJail(currentPlayer, ctx);
      break;
  }

  // set current card to none
  G.card = -1;
};

const goToJail = (currentPlayer: Player, ctx: Ctx) => {
  currentPlayer.jail = 3;
  currentPlayer.position = 10;
  ctx.events?.setStage("noAction");
};

const getPlayer = (G: GameState, ctx: Ctx) =>
  G.players[parseInt(ctx.currentPlayer)];
