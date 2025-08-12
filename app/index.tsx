import { Redirect, useRouter } from "expo-router";

export default function Index() {
  //aqui vamos fazer a verificação se ele tem seção já ou não

  return (
    <Redirect href="/sign-in" />
  )
}


// import React from "react";

// import Home from "./(auth)/sign-in";

// export default function Index() {
//   return <Home />
// }
