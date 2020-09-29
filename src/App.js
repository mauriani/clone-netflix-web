import React, { useEffect } from "react";
import Tmdb from "./Tmdb";

export default () => {
  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista ttoda
      let list = await Tmdb.getHomeList();
      console.log(list);
    };
    loadAll();
  }, []);
  return (
    <div>
      <p>teste</p>
    </div>
  );
};
