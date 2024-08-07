import { useEffect, useState } from 'react'
import {
  getExchangeList,
  deleteExchange,
  activeExchange,
} from '@/actions/exchange-actions'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin4Line } from 'react-icons/ri'

const ExchangesList = ({ exchangeEvent, editEvent }) => {
  const [exchanges, setExchanges] = useState([])

  useEffect(() => {
    getExchangeList().then((data) => setExchanges(data))
  }, [exchangeEvent])

  const deleteExchangeHandler = async (id) => {
    await deleteExchange(id)
    getExchangeList().then((data) => setExchanges(data))
  }

  const activeExchangeHandler = async (id, active) => {
    await activeExchange(id, active)
    getExchangeList().then((data) => setExchanges(data))
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl sm:w-96">
      <div className="card-body p-6">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Exchange Name</th>
              <th>Active </th>
              <th className="text-center">Tools </th>
            </tr>
          </thead>
          <tbody>
            {exchanges.map((exchange) => (
              <tr key={exchange._id}>
                <th>{exchange.name}</th>
                <td
                  className={`font-bold ${exchange?.active ? 'text-green-600' : 'text-red-600'}`}>
                  {exchange?.active ? 'Yes' : 'No'}
                </td>
                <td className="flex justify-center text-stone-600">
                  <ul className="menu menu-horizontal menu-xs rounded-xl bg-base-200">
                    <li>
                      <div className="tooltip" onClick={() => editEvent(exchange)}>
                        <FiEdit size={20} />
                      </div>
                    </li>
                    <li>
                      <div
                        className="tooltip"
                        onClick={() =>
                          activeExchangeHandler(exchange._id, !exchange?.active)
                        }>
                        <IoIosCheckmarkCircleOutline
                          size={22}
                          color={exchange?.active ? 'green' : 'red'}
                        />
                      </div>
                    </li>
                    <li>
                      <div>
                        <div
                          className=" tooltip"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              'Are you sure you want to delete this exchange?'
                            )
                            if (confirmDelete) {
                              deleteExchangeHandler(exchange._id)
                            }
                          }}
                        >
                          <RiDeleteBin4Line size={20} />
                        </div>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExchangesList
