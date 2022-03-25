import { useState } from "react";
import { Space } from "../../lib/configs/spaces";
import { GameState, Player, TradeItems } from "../../lib/KaszebscziMol";
import { MoveButton } from "../Button/MoveButton";
import { Modal } from "./Modal";

interface Props {
  handleOffer: (items: Record<"offers" | "wants", TradeItems>) => void;
  spaces: Space[];
  players: GameState["players"];
  trade: GameState["trade"];
}

export const MakeOfferModal = ({
  handleOffer,
  players,
  spaces,
  trade,
}: Props) => {
  const offersPlayer: Player = players[trade.offers.player];
  const wantsPlayer: Player = players[trade.wants.player];

  const [offersLeft, setOffersLeft] = useState({
    properties: offersPlayer.properties,
    money: offersPlayer.money,
  });
  const [wantsLeft, setWantsLeft] = useState({
    properties: wantsPlayer.properties,
    money: wantsPlayer.money,
  });

  const [offersItems, setOffersItems] = useState({ ...trade.offers.items });
  const [wantsItems, setWantsItems] = useState({ ...trade.wants.items });

  const add = (prevItems: TradeItems, property: number): TradeItems => ({
    ...prevItems,
    properties: [...prevItems.properties, property],
  });

  const remove = (prevItems: TradeItems, property: number): TradeItems => ({
    ...prevItems,
    properties: prevItems.properties.filter(p => p !== property),
  });

  const addProperty = (player: "wants" | "offers", property: number) => {
    if (player === "wants") {
      setWantsLeft(prevItems => remove(prevItems, property));
      setWantsItems(prevItems => add(prevItems, property));
      return;
    }
    setOffersLeft(prevItems => remove(prevItems, property));
    setOffersItems(prevItems => add(prevItems, property));
  };

  const removeProperty = (player: "wants" | "offers", property: number) => {
    if (player === "wants") {
      setWantsLeft(prevItems => add(prevItems, property));
      setWantsItems(prevItems => remove(prevItems, property));
      return;
    }
    setOffersLeft(prevItems => add(prevItems, property));
    setOffersItems(prevItems => remove(prevItems, property));
  };

  return (
    <Modal show>
      <div className="dark:bg-blue-gray-dark container flex gap-4 rounded-lg bg-gray-100 p-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="bg-blue-gray-light rounded-md">
            <h2 className="text-center text-lg font-bold">Twoja oferta</h2>
            <label htmlFor="offersMoney">Pieniądze</label>
            <input
              onChange={e =>
                setOffersItems(prevItems => ({
                  ...prevItems,
                  money: parseInt(e.target.value),
                }))
              }
              id="offersMoney"
              className="mx-2 rounded-md text-gray-800"
              type="number"
              value={offersItems.money}
              step={1}
              min={0}
              max={offersLeft.money}
            />
            $
            <ul className="flex-1">
              {offersItems.properties.map(propertyIndex => {
                const space = spaces[propertyIndex];
                return (
                  <li
                    className="cursor-pointer rounded-md p-2 text-lg hover:bg-black/30 dark:hover:bg-white/30"
                    onClick={() => removeProperty("offers", propertyIndex)}
                    key={space.name}
                  >
                    {space.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-blue-gray-light rounded-md">
            <h2 className="text-center text-lg font-bold">
              Twoje nieruchomości
            </h2>
            <ul className="flex-1">
              {offersLeft.properties.map(propertyIndex => {
                const space = spaces[propertyIndex];
                return (
                  <li
                    className="cursor-pointer rounded-md p-2 text-lg hover:bg-black/30 dark:hover:bg-white/30"
                    onClick={() => addProperty("offers", propertyIndex)}
                    key={space.name}
                  >
                    {space.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <MoveButton
            color="green"
            text="Złóż ofertę"
            disabled={
              offersItems.properties.length === 0 &&
              wantsItems.properties.length === 0 &&
              offersItems.money === 0 &&
              wantsItems.money === 0
            }
            moveFn={() =>
              handleOffer({
                offers: offersItems,
                wants: wantsItems,
              })
            }
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="bg-blue-gray-light rounded-md">
            <h2 className="text-center text-lg font-bold">Otrzymasz</h2>
            <label htmlFor="wantsMoney">Pieniądze</label>
            <input
              onChange={e =>
                setWantsItems(prevItems => ({
                  ...prevItems,
                  money: parseInt(e.target.value),
                }))
              }
              id="wantsMoney"
              className="mx-2 rounded-md text-gray-800"
              type="number"
              value={wantsItems.money}
              step={1}
              min={0}
              max={wantsLeft.money}
            />
            $
            <ul className="flex-1">
              {wantsItems.properties.map(propertyIndex => {
                const space = spaces[propertyIndex];
                return (
                  <li
                    className="cursor-pointer rounded-md p-2 text-lg hover:bg-black/30 dark:hover:bg-white/30"
                    onClick={() => removeProperty("wants", propertyIndex)}
                    key={space.name}
                  >
                    {space.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-blue-gray-light rounded-md">
            <h2 className="text-center text-lg font-bold">
              Nieruchomości gracza {wantsPlayer.name}
            </h2>
            <ul className="flex-1">
              {wantsLeft.properties.map(propertyIndex => {
                const space = spaces[propertyIndex];
                return (
                  <li
                    className="cursor-pointer rounded-md p-2 text-lg hover:bg-black/30 dark:hover:bg-white/30"
                    onClick={() => addProperty("wants", propertyIndex)}
                    key={space.name}
                  >
                    {space.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};
