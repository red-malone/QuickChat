import React,{useContext,useState} from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)


  const {login}=useContext(AuthContext);

  const toggleState = () => {
    // toggle between Sign Up and Login and reset the submitted flag
    setCurrState(prev => prev === "Sign Up" ? "Login" : "Sign Up")
    setIsDataSubmitted(false)
  }

  const resetForm = () => {
    setFullName("")
    setEmail("")
    setPassword("")
    setBio("")
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = { fullName, email, password, bio };
    if (currState === "Sign Up") {
      (async () => {
        const res = await login('signup', payload);
        if (res && res.success) {
          setIsDataSubmitted(true);
        }
      })();
      return;
    }
    login('login', { email, password });
}

  return (
<div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-6 sm:gap-12 lg:gap-20 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
         <img src={assets.logo_big} alt="" className="w-[min(30vw,300px)]"/>
      <form onSubmit={handleSubmit} className="w-96 border border-gray-600 bg-white/5 text-white p-8 flex flex-col gap-5 rounded-2xl shadow-2xl">
        {/* Header — clicking arrow toggles the form type */}
        <div className="flex items-center justify-between gap-6">
          <h2 className="font-semibold text-3xl">{currState}</h2>
          <button type="button" onClick={toggleState} aria-label="Toggle login signup" className="p-2 rounded-lg hover:bg-white/10 transition">
            <img src={assets.arrow_icon} alt="toggle" className="w-6 cursor-pointer"/>
          </button>
        </div>

        {/* If user just submitted sign up show a success message with action to go to login */}
        {currState === "Sign Up" && isDataSubmitted ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-green-400">Registration successful for <strong>{fullName || email}</strong>.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); resetForm(); }} className="flex-1 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition font-medium">Go to Login</button>
              <button type="button" onClick={() => { setIsDataSubmitted(false); resetForm(); }} className="px-4 py-2 rounded-lg border border-gray-500 hover:border-gray-300 transition">Edit</button>
            </div>
          </div>
        ) : (
          // Render form fields for Sign Up
          currState === "Sign Up" ? (
            <>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-violet-500 bg-white/5 text-white placeholder-gray-400 transition" placeholder="Full Name" required/>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-violet-500 bg-white/5 text-white placeholder-gray-400 transition" placeholder="Email" required/>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-violet-500 bg-white/5 text-white placeholder-gray-400 transition" placeholder="Password" required/>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-violet-500 bg-white/5 text-white placeholder-gray-400 resize-none transition" placeholder="Short bio" />
              <button type="submit" className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition font-medium">Create account</button>
              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <button type="button" onClick={() => { setCurrState("Login"); resetForm(); }} className="text-violet-400 hover:text-violet-300 font-medium transition">
                  Login here
                </button>
              </p>
            </>
          ) : (
            // Render fields for Login
            <>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-violet-500 bg-white/5 text-white placeholder-gray-400 transition" placeholder="Email" required/>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:border-violet-500 bg-white/5 text-white placeholder-gray-400 transition" placeholder="Password" required/>
              <button type="submit" className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition font-medium">Login</button>
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <button type="button" onClick={() => { setCurrState("Sign Up"); resetForm(); }} className="text-violet-400 hover:text-violet-300 font-medium transition">
                  Sign up here
                </button>
              </p>
            </>
          )
        )}
      </form>
    </div>
  );
};

export default LoginPage

