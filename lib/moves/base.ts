import { Ctx, Move } from "boardgame.io";
import { OtherGroups } from "../configs/spaces";
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
  const space = G.spaces[newPosition];

  if (!space.owner) {
    switch (space.group) {
      case OtherGroups.Card:
        ctx.events.setActivePlayers({
          currentPlayer: "cardSpace",
          maxMoves: 1,
          next: { currentPlayer: "cardAction" },
        });
        return;

      case OtherGroups.GoToJail:
        goToJail(currentPlayer, ctx);
        return;

      case OtherGroups.Start:
      case OtherGroups.CarPark:
        ctx.events.setStage("noAction");
        return;

      case OtherGroups.Jail:
        ctx.events.setStage("noAction");
        return;

      case OtherGroups.Tax:
        // TEMP
        currentPlayer.money -= 200;
        ctx.events.setStage("noAction");
        return;
    }

    ctx.events.setActivePlayers({
      currentPlayer: "noOwner",
      next: { currentPlayer: "noAction" },
    });
    return;
  }

  if (space.owner === ctx.currentPlayer) {
    ctx.events.setStage("isOwner");
    return;
  }

  ctx.events.setActivePlayers({
    currentPlayer: "hasOwner",
    next: { currentPlayer: "noAction" },
  });
};

export const endTurn: Move<GameState> = (_, ctx) => ctx.events.endTurn();

export const bankrupt: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  // TEMP remove properties owned by bankrupted player
  G.bankrupts += 1;
  currentPlayer.properties = [];
  G.spaces = G.spaces.map(s =>
    !s.price
      ? s
      : {
          ...s,
          owner: s.owner === ctx.currentPlayer ? "" : s.owner,
          houses: 0,
          mortgage: false,
          rent: s.rent,
          price: s.price,
        }
  );
  ctx.events.pass({ remove: true });
};
