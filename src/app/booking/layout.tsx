"use client";

import { BookingContext } from "@/components/BookingContext";
import { useState } from "react";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState({
    timetable: null,
    check: null,
    select: null,
  });

  return (
    <BookingContext.Provider value={[state, setState]}>
      {children}
    </BookingContext.Provider>
  );
}
