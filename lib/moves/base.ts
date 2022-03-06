import { Ctx, Move } from "boardgame.io";
import { OtherGroups } from "../configs/fields";
import { GameState, Player } from "../KaszebscziMol";

export const getPlayer = (G: GameState, ctx: Ctx): Player =>
  G.players[ctx.currentPlayer];

export const goToJail = (currentPlayer: Player, ctx: Ctx) => {
  currentPlayer.jail = 3;
  currentPlayer.position = 12;
  ctx.events.setStage("noAction");
};

export const rollDice: Move<GameState> = (G, ctx) => {
  G.dice = ctx.random.D6(2) as [number, number];
  const currentPlayer = getPlayer(G, ctx);
  let newPosition = currentPlayer.position + G.dice[0] + G.dice[1];

  G.dice[0] === G.dice[1] ? (G.doubles += 1) : (G.doubles = 0);
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
      const isCardField = field.group === OtherGroups.Card;
      const isGoToJail = field.group === OtherGroups.GoToJail;
      isCardField
        ? ctx.events.setActivePlayers({
            currentPlayer: "cardField",
            next: { currentPlayer: "cardAction", minMoves: 1, maxMoves: 1 },
            minMoves: 1,
            maxMoves: 1,
          })
        : isGoToJail
        ? goToJail(currentPlayer, ctx)
        : ctx.events.setActivePlayers({
            currentPlayer: "noOwner",
            next: { currentPlayer: "noAction" },
          });
    } else {
      field.owner === ctx.currentPlayer
        ? ctx.events.setStage("isOwner")
        : ctx.events.setActivePlayers({
            currentPlayer: "hasOwner",
            minMoves: 1,
            maxMoves: 1,
            next: { currentPlayer: "noAction" },
          });
    }
  } else {
    ctx.events.setStage("noAction");
  }
};

export const endTurn: Move<GameState> = (_, ctx) => ctx.events.endTurn();

export const bankrupt: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  // TEMP remove properties owned by bankrupted player
  G.bankrupts += 1;
  currentPlayer.properties = [];
  G.fields = G.fields.map(f => ({
    ...f,
    owner: f.owner === currentPlayer.id ? undefined : f.owner,
  }));
  ctx.events.pass({ remove: true });
};
