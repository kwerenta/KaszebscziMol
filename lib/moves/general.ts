import { Ctx, Move } from "boardgame.io";
import { GameState, Player } from "../KaszebscziMol";

export const getPlayer = (G: GameState, ctx: Ctx) =>
  G.players[ctx.currentPlayer];

export const goToJail = (currentPlayer: Player, ctx: Ctx) => {
  currentPlayer.jail = 3;
  currentPlayer.position = 12;
  ctx.events?.setStage("noAction");
};

export const rollDice: Move<GameState> = (G, ctx) => {
  const dice = ctx.random?.Die(6, 2) || [0, 0];
  const currentPlayer = getPlayer(G, ctx);
  let newPosition = currentPlayer.position + dice[0] + dice[1];

  dice[0] === dice[1] ? (G.doubles += 1) : (G.doubles = 0);
  if (G.doubles >= 3) {
    return goToJail(currentPlayer, ctx);
  }

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
            next: { currentPlayer: "cardAction", minMoves: 1, maxMoves: 1 },
            minMoves: 1,
            maxMoves: 1,
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
            minMoves: 1,
            maxMoves: 1,
            next: { currentPlayer: "noAction" },
          });
    }
  } else {
    ctx.events?.setStage("noAction");
  }
};

const endTurn: Move<GameState> = (_, ctx) => ctx.events?.endTurn();

export const bankrupt: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  // TEMP remove properties owned by bankrupted player
  G.bankrupts += 1;
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
