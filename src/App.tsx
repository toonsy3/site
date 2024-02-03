import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface Message {
  id: number
  server: string,
  message: string,
  timestamp: string,
}

function App() {
  const [uuid, setUuid] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSearchChange = (event: any) => {
    event.preventDefault();
    setUuid(event.target.value);
    fetchMessages(event.target.value);
  }

  const fetchMessages = async (uuid: String) => {
    const response = await fetch(`http://localhost:8080/messages/${uuid}`);
    const { status, data } = await response.json();

    if (status == "error") {
      return setMessages([])
    };

    setMessages(data);
  }

  return (
    <>
      <div className="flex h-screen justify-center bg-slate-900 p-4">
        <div className="mx-auto border-4 border-black p-4 bg-slate-800 w-[1100px] rounded-xl">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch className="w-10 h-10 text-gray-900" aria-hidden="true" />
            </div>
            <input
              id="search"
              type="search"
              placeholder="Search UUID"
              value={uuid}
              onChange={handleSearchChange}
              className="block w-full p-4 ps-16 text-[30px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <button type="submit" className="text-white text-[30px] absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
          <div>
            <div className="flex flex-col mt-4 max-h-[800px]">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-black">
                      <thead className="bg-gray-50">
                        <tr className="bg-blue-700 text-black">
                          <th scope="col" className="font-bold px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                            ID
                          </th>
                          <th scope="col" className="font-bold px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                            Server
                          </th>
                          <th scope="col" className="font-bold px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                            Message
                          </th>
                          <th scope="col" className="font-bold px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                            Timestamp
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700 bg-gray-600">
                        {messages.map((message, index) => (
                          <tr className="text-black text-md" key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{message.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{message.server}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{message.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium italic">{new Date(message.timestamp).toLocaleString()}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
