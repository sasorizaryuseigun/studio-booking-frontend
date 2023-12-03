"use client";

import { useEffect, useContext, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";
import { allowContextMenu } from "@fullcalendar/common";
import axios from "axios";
import https from "https";

import { BookingContext } from "@/components/BookingContext";

export default function Counter() {
  const [state, setState] = useContext(BookingContext);
  const router = useRouter();

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK_ORIGIN + "/api";
  axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

  function CheckClick(n) {
    const new_check = state.check.concat();
    new_check[n] = !state.check[n];
    let start = NaN;
    let end = NaN;
    for (const i in new_check) {
      if (new_check[i]) {
        if (isNaN(start)) {
          start = Number(i);
        }
        end = Number(i);
      }
    }

    let flag = true;
    for (let i = start; i <= end; i++) {
      if (flag) {
        if (state.timetable[i].booking) {
          flag = false;
        } else {
          new_check[i] = true;
        }
      } else {
        new_check[i] = false;
      }
    }
    setState({ ...state, check: new_check });
  }

  function ClickSend() {
    router.push("/booking/check");
  }

  const calendarRef = useRef(null);

  function selectTask(value) {
    const endDate = new Date(value.start);
    endDate.setDate(endDate.getDate() + 1);
    if (endDate.getTime() < value.end.getTime()) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.select(value.start, endDate);
      return;
    }
    if (!state.select || value.start.getTime() != state.select.getTime()) {
      const b_time = new Date(state.select);
      setState({ ...state, select: new Date(value.start) });
      axios
        .get(`/timetable/${value.start.toLocaleDateString("sv-SE")}`)
        .then((rec) => {
          setState({
            timetable: rec.data,
            check: Array(rec.data.length).fill(false),
            select: new Date(value.start),
          });
        })
        .catch((e) => {
          setState({ ...state, select: b_time });
          alert(e);
        });
    }
  }

  function unselectTask(value) {
    const endDate = new Date(state.select);
    endDate.setDate(endDate.getDate() + 1);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.select(state.select, endDate);
  }

  useEffect(() => {
    if (state.select) {
      const calendarApi = calendarRef.current.getApi();
      const endDate = new Date(state.select);
      endDate.setDate(endDate.getDate() + 1);
      calendarApi.select(state.select, endDate);
    }
  });

  return (
    <div className="main">
      <div className="m-2 border p-2">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, bootstrap5Plugin, interactionPlugin]}
          initialView="dayGridMonth"
          themeSystem="bootstrap5"
          selectable={true}
          select={selectTask}
          unselect={unselectTask}
          unselectAuto={false}
          selectLongPressDelay={0}
        />
      </div>
      <div className="m-2 border p-2">
        {state.timetable ? (
          <table className="table">
            <tbody>
              {" "}
              {state.timetable.map((value, index) => (
                <tr>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={state.check[index]}
                      onClick={() => CheckClick(index)}
                      disabled={value.booking}
                    ></input>
                  </td>
                  <td>
                    {new Date(value.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  {value.booking ? <td>×</td> : <td>〇</td>}
                  <td>¥{value.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>日付を選択</p>
        )}
      </div>
      <div className="m-2">
        <button onClick={ClickSend} className="btn btn-primary">
          予約確認
        </button>
      </div>
    </div>
  );
}
