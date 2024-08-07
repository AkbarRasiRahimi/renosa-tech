const ExchangesTable = (props) => {
  //const exchanges = Array.from(props.exchangesInfo);
  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th>Exchange Name</th>
          <th>Free </th>
          <th>Total </th>
        </tr>
      </thead>
      <tbody>
        {props.exchangesInfo.map((exchange) => (
          <tr key={exchange._id}>
            <th>{exchange.name}</th>
            {exchange.free > 5 ? (
              <td className="font-bold text-green-600">
                {exchange.free.toFixed(2)}
              </td>
            ) : (
              <td className="font-bold text-red-600">
                {exchange.free.toFixed(2)}
              </td>
            )}
            {exchange.total > 5 ? (
              <td className="font-bold text-green-600">
                {exchange.total.toFixed(2)}
              </td>
            ) : (
              <td className="font-bold text-red-600">
                {exchange.total.toFixed(2)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ExchangesTable
