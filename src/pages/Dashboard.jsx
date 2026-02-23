import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const fetchMeals = async () => {
    const token = localStorage.getItem("token")

    try {
      const response = await axios.get(
        "https://aahara-ai-backend.onrender.com/meals",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(response.data)
      setMessage("Meals fetched ✅")

    } catch (error) {
      setMessage("Unauthorized ❌")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen shadow-2xl">

        <div className="bg-green-600 text-white p-4 text-center text-xl font-semibold">
          Dashboard
        </div>

        <div className="p-6">

          <button
            onClick={fetchMeals}
            className="w-full bg-blue-600 text-white py-2 rounded-xl"
          >
            Fetch Meals (Protected)
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-xl mt-3"
          >
            Logout
          </button>

          {message && (
            <p className="mt-4 text-center text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard