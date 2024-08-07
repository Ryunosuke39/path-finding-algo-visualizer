"use client"

import Board from "./components/board";
import Navbar from "./components/navbar";
import { SwitchCtxProvider } from "./components/SwitchCtx"

export default function Page(){

  return (
    <div>
      <SwitchCtxProvider>
          <Navbar />
          <Board />
      </SwitchCtxProvider>
    </div>
  )
}