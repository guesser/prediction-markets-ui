import { Account } from "@solana/web3.js"
import { CONNECT } from "./types"

export const connect = () => {
  let account = new Account()
  return {
    type: CONNECT
  }
}