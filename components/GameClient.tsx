import { Ctx, Game } from "boardgame.io";
import { Client } from "boardgame.io/react";
import { GameState, SetupData } from "../lib/KaszebscziMol";

const wrapGame = (game: Game, setupData: SetupData): Game<GameState, Ctx> => ({
  ...game,
  setup: (ctx: Ctx) => game.setup(ctx, setupData),
});

export type ClientProps = Parameters<typeof Client>[0] & {
  setupData?: SetupData;
};

export const GameClient = ({ setupData, ...props }: ClientProps) => {
  const wrappedGame = setupData ? wrapGame(props.game, setupData) : props.game;
  const ClientComponent = Client({ ...props, game: wrappedGame });

  return <ClientComponent />;
};
