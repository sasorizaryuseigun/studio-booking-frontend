"use client";

import { useEffect, useContext, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BookingContext } from "@/components/BookingContext";

export default function Counter() {
  const [state, setState] = useContext(BookingContext);
  const router = useRouter();

  let sum_price = 0;
  let s_time = null;
  let e_time = null;
  for (const i in state.check) {
    if (state.check[i]) {
      if (s_time === null) {
        s_time = new Date(state.timetable[i].time);
      }
      s_time = new Date(state.timetable[i].time);
      e_time = new Date(state.timetable[i].time);
      sum_price += state.timetable[i].price;
    }
  }

  if (e_time !== null) {
    e_time.setMinutes(e_time.getMinutes() + 14);
    e_time.setSeconds(e_time.getSeconds() + 59);
  }

  function ClickSend() {
    router.push("/bookinglist");
  }

  return (
    <div className="main m-2">
      <h2>予約完了</h2>
      <p className="m-2">
        {s_time.toLocaleDateString()}
        <br />
        {s_time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}~
        {e_time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        <br />¥{sum_price}
      </p>
      <div className="m-2">
        <button onClick={ClickSend} className="btn btn-primary">
          予約一覧
        </button>
      </div>
    </div>
  );
}
