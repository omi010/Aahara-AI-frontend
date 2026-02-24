import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://aahara-ai-backend.onrender.com/login",
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      const token = response.data.access_token
      localStorage.setItem(process.env.REACT_APP_JWT_TOKEN_KEY, token);

      navigate("/dashboard")

    } catch (error) {
      setMessage("Login failed ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen shadow-2xl">

        <div className="bg-green-600 text-white p-4 text-center text-xl font-semibold">
          Aahara AI
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-lg mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 rounded-xl"
          >
            Login
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login