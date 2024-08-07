import { useEffect, useState } from 'react'
import { getPairList, deletePair, activePair } from '@/actions/pair-actions'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin4Line } from 'react-icons/ri'

const PairsList = ({ pairEvent, editEvent }) => {
  const [pairs, setPairs] = useState([])

  useEffect(() => {
    getPairList().then((data) => setPairs(data))
  }, [pairEvent])

  const deletePairHandler = async (id) => {
    await deletePair(id)
    getPairList().then((data) => setPairs(data))
  }

  const activePairHandler = async (id, active) => {
    await activePair(id, active)
    getPairList().then((data) => setPairs(data))
  }

  return (
    <div className="card w-screen bg-base-100 shadow-xl sm:w-96">
      <div className="card-body p-6">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Pair Name</th>
              <th>target </th>
              <th>Active </th>
              <th className="text-center">Tools </th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((pair) => (
              <tr key={pair._id}>
                <th>{pair.name}</th>
                <td
                  className={`font-bold ${pair?.active ? 'text-green-600' : 'text-red-600'}`}>
                  {pair?.target}
                </td>
                <td
                  className={`font-bold ${pair?.active ? 'text-green-600' : 'text-red-600'}`}>
                  {pair?.active ? 'Yes' : 'No'}
                </td>
                <td className="flex min-w-max items-center justify-center text-stone-600">
                  <ul className="menu menu-horizontal menu-xs rounded-xl bg-base-200">
                    <li>
                      <div className="tooltip" onClick={() => editEvent(pair)}>
                        <FiEdit size={20} />
                      </div>
                    </li>
                    <li>
                      <div
                        className="tooltip"
                        onClick={() =>
                          activePairHandler(pair._id, !pair?.active)
                        }>
                        <IoIosCheckmarkCircleOutline
                          size={22}
                          color={pair?.active ? 'green' : 'red'}
                        />
                      </div>
                    </li>
                    <li>
                      <div>
                        <div
                          className="tooltip"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              'Are you sure you want to delete this pair?'
                            )
                            if (confirmDelete) {
                              deletePairHandler(pair._id)
                            }
                          }}>
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

export default PairsList
