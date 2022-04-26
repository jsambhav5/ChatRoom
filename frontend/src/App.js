import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "./pages";
import { Navigation } from "./components";

const App = () => {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path="/" exact element={<Home />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</Router>
	);
};

export default App;
