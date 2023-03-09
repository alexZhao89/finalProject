import React, { useState } from "react";
import "./styles.css";
import Header from "./component/Header";
import { TABS } from "./constants";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import MovieCardDetails from "./component/MovieCardDetails";
import Login from "./component/Login";
import Context from "./Context";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [currentTab, setCurrentTab] = useState(TABS.HOME);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    setIsUsernameClicked(!isUsernameClicked);
  };
  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  const handleHeartClick = () => {};

  const contextValue = {
    user,
    loggedIn,
    isUsernameClicked
    // activeTabInfo: [activeTab, setActiveTab],
    // likedListInfo: [likedList, setLikedList],
    // ratedListInfo: [ratedList, setRatedList],
    // activeMovieIdInfo: [activeMovieId, setActiveMovieId]
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setLoggedIn(!loggedIn);
  };
  const handleLogout = () => {
    setLoggedIn(!loggedIn);
    setIsUsernameClicked(!isUsernameClicked);
    setUser({});
    navigate("/HOME");
  };

  return (
    <div>
      <Context.Provider value={contextValue}>
        <Header
          activeTab={currentTab}
          onTabClick={handleTabClick}
          handleLogout={handleLogout}
          handleUsernameClick={handleUsernameClick}
        />
        <Routes>
          <Route path="/" element={<Home currentTab={currentTab} />} />
          <Route path="/HOME" element={<Home currentTab={currentTab} />} />
          {/* <Route path={TABS.FAVORITE} element={<FAVORITE />} />
        <Route path={TABS.RATED} element={<RATED />} /> */}
          <Route path="/movies/:id" element={<MovieCardDetails />} />
          <Route
            path="/login"
            element={<Login handleLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </Context.Provider>
    </div>
  );
}
