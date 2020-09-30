import React, { useEffect, useState } from "react";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import Tmdb from "./Tmdb";
import "./App.css";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista ttoda
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegar o filme em destaque
      // pegar apenas o originails da netflix
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      // informações adicionais

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  return (
    <div className="page">
      <Header />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
