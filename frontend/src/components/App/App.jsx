import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import mainApi from "../../utils/MainApi.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import Login from "../Login/Login.jsx";
import Signup from "../Signup/Signup.jsx";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";
import ModalMovieInfo from "../ModalMovieInfo/ModalMovieInfo";
import Preloader from "../Preloader/Preloader.jsx";
import Movies from "../Pages/Movies.jsx";
import Series from "../Pages/Series.jsx";
import MyWatchList from "../Pages/MyWatchList.jsx";
import About from "../Pages/About.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import apiMovies from "../../utils/StreamWhereApi.js";
import ModalNotification from "../ModalNotification/ModalNotification.jsx";
import "./App.css";

export default function App() {

  //Login local
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    avatar: "https://i.pravatar.cc/150"  // Establecer una foto de perfil predeterminada
  });

  const [myWatchList, setMyWatchList] = useState([]);
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [modalNotification, setModalNotification] = useState({
    message: "",
    type: "success",
    visible: false
  });


  //Preloader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Cargar lista guardada al iniciar
  useEffect(() => {
  async function fetchWatchlist() {
    try {
      const items = await mainApi.getWatchlist();
      setMyWatchList(items);
    } catch (err) {
      console.error("Error al cargar watchlist:", err);
    }
  }

  if (isLoggedIn) {
    fetchWatchlist();
  }
}, [isLoggedIn]);


  // Guardar automáticamente cuando cambie
  useEffect(() => {
    localStorage.setItem("myWatchList", JSON.stringify(myWatchList));
  }, [myWatchList]);

  // Peliculas y series
  useEffect(() => {
    async function loadData() {
      // Verificar si los datos ya están en el cache local
      const cachedMovies = localStorage.getItem("popularMovies");
      const cachedSeries = localStorage.getItem("popularSeries");

      if (cachedMovies && cachedSeries) {
        setPopularMovies(JSON.parse(cachedMovies));
        setPopularSeries(JSON.parse(cachedSeries));
        setIsLoadingData(false);
        return;
      }

      const moviesData = await apiMovies.getPopularMovies();
      const seriesData = await apiMovies.getPopularSeries();

      // Guardar los datos en localStorage
      localStorage.setItem("popularMovies", JSON.stringify(moviesData));
      localStorage.setItem("popularSeries", JSON.stringify(seriesData));

      setPopularMovies(moviesData);
      setPopularSeries(seriesData);
      setIsLoadingData(false);
    }
    loadData();
  }, []);

  // Guardar datos para el usuario
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);


  // Handlers (Funciones)
  // Función para manejar los resultados de búsqueda
  const handleSearchResults = (data) => {
    setSearchResults(data);
    localStorage.setItem("searchResults", JSON.stringify(data));
  };

  async function handleLogin() {
  try {
    const userInfo = await mainApi.getCurrentUser();
    setUserData(userInfo);

    setIsLoggedIn(true);
    localStorage.setItem("loggedIn", "true");

    showNotification("Sesión iniciada correctamente", "success");
  } catch (err) {
    showNotification("Error cargando usuario", "error");
  }
}


  function handleLogout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("myWatchList");
  localStorage.removeItem("searchResults");
  localStorage.removeItem("user");

  setUserData({});
  setIsLoggedIn(false);

  showNotification("Sesión cerrada correctamente", "warning");
}


  function handleOpenProfile() {
    setIsProfileOpen(true);
  }

  function handleCloseProfile() {
    setIsProfileOpen(false);
  }

  function handleCloseMovie() {
    setSelectedMovie(null);
    setIsModalOpen(false);
  }

  function handleViewMore(movie) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  // Cambia estado en Card en WatchList Pendiente, viendo y visto
  async function handleToggleSeen(id) {
  const statusChange = {
    pendiente: "viendo",
    viendo: "vista",
    vista: "pendiente"
  };

  const originalItem = myWatchList.find(item => item.id === id);
  if (!originalItem) return;

  const newStatus = statusChange[originalItem.status];

  try {
    const updatedItem = await mainApi.updateWatchlistItem({
      id,
      status: newStatus
    });

    const updatedList = myWatchList.map(item =>
      item.id === id ? { ...item, status: updatedItem.status } : item
    );

    setMyWatchList(updatedList);
    showNotification(`Película ${originalItem.title} ahora está en estado: ${newStatus}`, "success");
  } catch (err) {
    showNotification("Error al actualizar el estado", "error");
    console.error(err);
  }
}


  // Eliminar card en WatchList
async function handleDelete(id) {
  try {
    await mainApi.deleteFromWatchlist(id);
    setMyWatchList(prev => prev.filter(item => item.id !== id));
    showNotification("Película removida correctamente", "success");
  } catch (err) {
    showNotification("Error al eliminar la película", "error");
    console.error(err);
  }
}


  // Añadir a MyWatchList
  async function handleAddToMyWatchList(item) {
  if (!item) return;

  const newItem = {
    ...item,
    type: item.type || (item.media_type === "tv" ? "series" : "movies"),
    status: "pendiente"
  };

  const exists = myWatchList.some(
    (i) => i.type === newItem.type && i.id === newItem.id
  );

  if (exists) {
    showNotification("Ya está en tu lista", "warning");
    return;
  }

  try {
    const addedItem = await mainApi.addToWatchlist(newItem);
    setMyWatchList(prev => [...prev, addedItem]);
    showNotification("Película agregada a tu lista", "success");
  } catch (err) {
    showNotification("Error al agregar la película", "error");
    console.error(err);
  }
}


  // Actualiza la foto de perfil en el estado
  function handleChangeAvatar(newAvatarUrl) {
    setUserData((prevData) => ({
      ...prevData,
      avatar: newAvatarUrl,
    }));
  }

  // Actualiza la información del usuario (correo, contraseña)
  function handleUpdateUserInfo(updatedUser) {
    setUserData(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));  // Guarda los cambios en localStorage
  }

  function showNotification(message, type = "success") {
    setModalNotification({ message, type, isOpen: true });
  }


  return (
    <Router>
      <ScrollToTop />
      <Preloader hidden={!isLoading} />
      <div className="app">

        <Header
          isLoggedIn={isLoggedIn}
          onProfileClick={handleOpenProfile}
          onLogout={handleLogout}
        />
        <Routes>

          <Route
            path="/"
            element={
              <Main
                movies={popularMovies.slice(0, 12)}
                series={popularSeries.slice(0, 12)}
                searchResults={searchResults}
                onResults={handleSearchResults}
                onViewMore={handleViewMore}
                onAddToMyWatchList={handleAddToMyWatchList}
                isLoading={isLoadingData}
                setIsLoading={setIsLoading}
                setIsSearching={setIsSearching}
                showNotification={showNotification}
              />}
          />

          <Route
            path="/peliculas"
            element={
              <Movies
                movies={popularMovies}
                onViewMore={handleViewMore}
                isLoading={isLoadingData}
                setIsLoading={setIsLoading}
                onAddToMyWatchList={handleAddToMyWatchList}
                showNotification={showNotification}

              />}
          />

          <Route
            path="/series"
            element={
              <Series
                series={popularSeries}
                onViewMore={handleViewMore}
                isLoading={isLoadingData}
                setIsLoading={setIsLoading}
                onAddToMyWatchList={handleAddToMyWatchList}
                showNotification={showNotification}

              />}
          />

          <Route
            path="/login"
            element={isLoggedIn ?
              <Navigate to="/" /> :
              <Login
                onLogin={handleLogin}
                showNotification={showNotification}
              />}
          />

          <Route
            path="/signup"
            element={isLoggedIn ?
              <Navigate to="/" /> :
              <Signup
                onSignup={handleLogin}
                showNotification={showNotification}
              />}
          />

          <Route
            path="/mi-lista"
            element={
              isLoggedIn ? (
                <MyWatchList
                  items={myWatchList}
                  onToggleSeen={handleToggleSeen}
                  onDelete={handleDelete}
                  setIsLoading={setIsLoading}
                  showActions={true}
                  showNotification={showNotification}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/acerca" element={<About />} />

        </Routes>

        <Footer />

        <ModalEditProfile
          isOpen={isProfileOpen}
          onClose={handleCloseProfile}
          userData={userData}
          onUpdateUserInfo={handleUpdateUserInfo}
          onChangeAvatar={handleChangeAvatar}

        />

        <ModalMovieInfo
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseMovie}
          onAddToMyWatchList={handleAddToMyWatchList}
          isLoggedIn={isLoggedIn}
          showNotification={showNotification}
        />

        <ModalNotification
          isOpen={modalNotification.isOpen}
          message={modalNotification.message}
          type={modalNotification.type}
          onClose={() => setModalNotification(prev => ({ ...prev, isOpen: false }))}
        />

      </div>
    </Router>
  );
}
