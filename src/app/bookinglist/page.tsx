"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import https from "https";

export default function Counter() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK_ORIGIN + "/api";
  axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const [state, setState] = useState({ bookings: [] });

  useEffect(() => {
    axios
      .get("/booking/")
      .then((rec) => {
        setState({ ...state, bookings: rec.data });
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  return (
    <div className="main m-2">
      <h2>予約一覧</h2>
      <div>
        {state.bookings.map((value, index) => (
          <p className="m-2">
            {new Date(value.start).toLocaleDateString()}
            <br />
            {new Date(value.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            ~
            {new Date(value.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        ))}
      </div>
    </div>
  );
}
