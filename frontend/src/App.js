import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Home, Register, Login, Rooms } from "./pages";
import { Navigation, Loader } from "./components";
import { GuestRoute, PrivateRoute } from "./routes";
import { useLoading } from "./hooks";

const App = () => {
	const { loading } = useLoading();
	return loading ? (
		<Loader />
	) : (
		<Router className="container">
			<Navigation />
			<Routes>
				<Route
					path="/"
					exact
					element={
						<GuestRoute>
							<Home />
						</GuestRoute>
					}
				/>

				<Route path="/home" element={<Navigate to="/" />}></Route>

				<Route
					path="/login"
					exact
					element={
						<GuestRoute>
							<Login />
						</GuestRoute>
					}
				/>

				<Route
					path="/register"
					element={
						<GuestRoute>
							<Register />
						</GuestRoute>
					}
				/>

				<Route
					path="/rooms"
					element={
						<PrivateRoute>
							<Rooms />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
