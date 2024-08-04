"use client"

import Board from "./board";
import Navbar from "./navbar";
import { SwitchCtxProvider } from "./SwitchCtx"

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