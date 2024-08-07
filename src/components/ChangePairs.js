import { useEffect, useState } from "react";

const ChangePairs = () => {
  const [pairsTradeInfo, setPairsTradeInfo] = useState([]);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://31.210.43.210:3000");
  //   ws.onmessage = (event) => {
  //     const pairTargetInfoData = JSON.parse(event.data)["pairTargetInfo"];
  //     if (pairTargetInfoData) setPairsTradeInfo(pairTargetInfoData);
  //   };
  // }, []);

  const activeClickHandler = () => {
    if (pairsTradeInfo.active) {
      fetchData({ active: false });
    } else {
      fetchData({ active: true });
    }
  };

  // function fetchData(updatedSetting) {
  //   const newSetting = { ...pairsTradeInfo, ...updatedSetting };
  //   const request = new Request("http://31.210.43.210:3000/setting", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newSetting),
  //   });
  //   fetch(request).then(() => setPairsTradeInfo(newSetting));
  // }

  return (
    <div className="modal-box">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Target Pairs Setting !!!</h3>{" "}
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Coin Name</th>
              <th>Target</th>
              <th>Delete</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {pairsTradeInfo.map((key, index) => (
              <tr key={index}>
                <th>{key.pairName}</th>
                <th>
                  <input type="number" value={key.target} className="input input-bordered w-[100px]" />
                </th>
                <td>
                  <button className="btn btn-square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
                <td>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        onClick={activeClickHandler}
                        defaultChecked={key.active}
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modal-action"></div>
    </div>
  );
};

export default ChangePairs;
