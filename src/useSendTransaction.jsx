import React, { useState, useContext } from "react";
import { LoginContext } from "./LoginContext";
import to from "await-to-js";

export function useSendTransaction() {
  const [state, setState] = useContext(LoginContext);
  const rpcSend = React.useCallback(async (d) => {
    const deroBridgeApi = state.deroBridgeApiRef.current;

    const [err, res] = await to(deroBridgeApi.wallet("start-transfer", d));
    console.log("useSendTransaction RPC res", res);
    return res.data.result.txid;
  });

  async function sendTransaction(data) {
    const rpcData = {
      scid: data.scid,
      ringsize: data.ringsize,
      transfers: data.transfers,
      sc_rpc: data.sc_rpc,
      sc: data.sc,
      fees: data.fees,
    };

    return await rpcSend(rpcData);
  }

  return [sendTransaction];
}
