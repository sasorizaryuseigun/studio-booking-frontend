"use client";

import { useEffect, useContext, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import https from "https";

import { BookingContext } from "@/components/BookingContext";

export default function Counter() {
  const [state, setState] = useContext(BookingContext);
  const router = useRouter();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK_ORIGIN + "/api";
  axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  axios.defaults.withCredentials = true;

  let sum_price = 0;
  let s_time = null;
  let e_time = null;
  for (const i in state.check) {
    if (state.check[i]) {
      if (s_time === null) {
        s_time = new Date(state.timetable[i].time);
      }
      e_time = new Date(state.timetable[i].time);
      sum_price += state.timetable[i].price;
    }
  }

  if (e_time !== null) {
    e_time.setMinutes(e_time.getMinutes() + 14);
    e_time.setSeconds(e_time.getSeconds() + 59);
  }

  function ClickSend() {
    axios
      .post("/booking/", {
        start: s_time.toISOString(),
        end: e_time.toISOString(),
      })
      .then((rec) => {
        router.push("/booking/completion");
      })
      .catch((e) => {
        alert(e);
      });
  }

  return (
    <div className="main m-2">
      <h2>予約内容確認</h2>
      <p className="m-2">
        {s_time.toLocaleDateString()}
        <br />
        {s_time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}~
        {e_time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        <br />¥{sum_price}
      </p>
      <div className="m-2">
        <button onClick={ClickSend} classNam="btn btn-primary">
          予約
        </button>
      </div>
    </div>
  );
}
