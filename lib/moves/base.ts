import { Move } from "boardgame.io";
import { Stage } from "boardgame.io/core";
import { Stages } from ".";
import { MortgageStatus, OtherGroups } from "../configs/spaces";
import { GameState } from "../KaszebscziMol";
import { getPlayer, goToJail } from "./utils";

export const rollDice: Move<GameState> = (G, ctx) => {
  G.dice = ctx.random.D6(2) as [number, number];
  const currentPlayer = getPlayer(G, ctx);
  let newPosition = currentPlayer.position + G.dice[0] + G.dice[1];
  const isDouble = G.dice[0] === G.dice[1];

  // End the turn if the player in jail
  // didn't roll a double
  if (currentPlayer.jail > 0 && !isDouble) {
    ctx.events.endTurn();
    return;
  }

  isDouble && currentPlayer.jail === 0 ? (G.doubles += 1) : (G.doubles = 0);
  if (G.doubles >= 3) {
    G.doubles = 0;
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

  if (
    space.owner === ctx.currentPlayer ||
    space.mortgage !== MortgageStatus.Unmortgaged
  ) {
    ctx.events.setStage("noAction");
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
  const currentSpace = G.spaces[currentPlayer.position];
  const stage = (ctx.activePlayers[ctx.currentPlayer] ||
    ctx.phase ||
    "rollDice") as Stages;

  ctx.events.pass({ remove: true });

  let newPlayer = "";
  // Check if player owes another player
  if (stage === "hasOwner") {
    newPlayer = currentSpace.owner;
  }
  // Check if player has any properties to auction
  else if (currentPlayer.properties.length > 0) {
    G.auction.player =
      ctx.playOrder[(ctx.playOrderPos + 1) % ctx.playOrder.length];
    G.auction.properties = [...currentPlayer.properties];
    ctx.events.setPhase("auction");
  }

  currentPlayer.properties.forEach(spaceIndex => {
    const space = G.spaces[spaceIndex];

    // Add buildings back to the bank
    space.houses === 5
      ? (G.buildings.hotels += 1)
      : (G.buildings.houses += space.houses);
    space.houses = 0;

    if (newPlayer !== "") {
      space.owner = newPlayer;
      G.players[newPlayer].properties.push(spaceIndex);
      return;
    }

    space.mortgage = MortgageStatus.Unmortgaged;
  });

  G.bankrupts += 1;
};

export const trade: Move<GameState> = (G, ctx) => {
  G.temp.stage = ctx.activePlayers?.[ctx.currentPlayer] || Stage.NULL;
  ctx.events.setStage("tradeSetup");
};

export const manageProperties: Move<GameState> = (G, ctx) => {
  ctx.events.setStage("propertyManagment");
};
