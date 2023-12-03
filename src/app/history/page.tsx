"use client";

export default function Counter() {
  const start = new Date();
  const history = [{ start: start, end: start, price: 2000 }];

  return (
    <div className="main">
      <div className="m-2 border p-2">
        {history ? (
          <table className="table">
            <tbody>
              {history.map((value, index) => (
                <tr>
                  <td>
                    <input className="form-check-input" type="checkbox"></input>
                  </td>
                  <td>{value.start.toLocaleString()}</td>
                  <td>{value.end.toLocaleString()}</td>
                  <td>¥{value.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="m-0">予約がありません</p>
        )}
      </div>
    </div>
  );
}
