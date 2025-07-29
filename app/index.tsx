import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/sign-up" />; //foi preciso fazer isso, pois se chamar <Home> diretamente, ele vai dar problema com o carregamento do Layout, pois ele só carrega se for feito via rota do expo-router, não diretamente como estava sendo feito;
}

// import React from "react";

// import Home from "./(auth)/sign-in";

// export default function Index() {
//   return <Home />
// }
