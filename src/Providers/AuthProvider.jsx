import { createContext, useEffect, useState } from "react";
import auth from "./../Firebase/firebase.config";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const axiosPublic = useAxiosPublic();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password)
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error creating user:", errorCode, errorMessage);
			})
			.finally(() => setLoading(false));
	};

	const userLogin = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password)
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error logging in user:", errorCode, errorMessage);
			})
			.finally(() => setLoading(false));
	};

	const provider = new GoogleAuthProvider();

	const loginWithGoogle = () => {
		setLoading(true);
		return signInWithPopup(auth, provider)
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error logging in with Google:", errorCode, errorMessage);
			})
			.finally(() => setLoading(false));
	};

	const logOut = () => {
		return signOut(auth)
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error logging out:", errorCode, errorMessage);
			});
	};

	const userUpdate = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error("Error updating user profile:", errorCode, errorMessage);
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				const userInfo = { email: currentUser.email };
				axiosPublic.post("/jwt", userInfo).then((res) => {
					if (res.data.token) {
						localStorage.setItem("access_token", res.data.token);
					}
				});
			} else {
				localStorage.removeItem("access_token");
			}
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, [axiosPublic]);

	const authInfo = {
		user,
		loading,
		createUser,
		userLogin,
		loginWithGoogle,
		logOut,
		userUpdate,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
