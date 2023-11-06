import React from "react";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";
import StudyScreen from "./StudyScreen";

import {Route} from "react-router-dom"
import DeckScreen from "./DeckScreen";
import DeckEdit from "./DeckEdit";
import CardEdit from "./CardEdit";
import CardCreate from "./CardCreate";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import DeckCreate from "./DeckCreate";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/decks/new" exact={true}>
            <DeckCreate />
          </Route>
          <Route path="/decks/:deckId" exact={true}>
            <DeckScreen />
          </Route>
          <Route path="/decks/:deckId/edit" exact={true}>
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyScreen />
          </Route>
          <Route path="/decks/:deckId/cards/new" exact={true}>
            <CardCreate />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit" exact={true}>
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
