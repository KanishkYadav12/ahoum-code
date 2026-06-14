import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthScreen, Address, User } from "@/types";
import { api } from "@/lib/api";
import { DEMO_OTP, OTP_LENGTH } from "@/lib/constants";
import { isValidEmail, isValidOtp, isValidPhone } from "@/lib/utils";

type AuthMode = "signin" | "signup";

interface LoginFormState {
	email: string;
	password: string;
}

interface SignupFormState {
	name: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
}

interface LocationDraft {
	label: string;
	street: string;
	city: string;
	state: string;
	pincode: string;
	zone: string;
	area: string;
}

const defaultLoginForm: LoginFormState = {
	email: "",
	password: "",
};

const defaultSignupForm: SignupFormState = {
	name: "",
	email: "",
	phone: "",
	password: "",
	confirmPassword: "",
};

const defaultLocationDraft: LocationDraft = {
	label: "Home",
	street: "",
	city: "",
	state: "",
	pincode: "",
	zone: "",
	area: "",
};

interface AuthStore {
	currentScreen: AuthScreen;
	authMode: AuthMode;
	splashComplete: boolean;
	onboardingComplete: boolean;
	isAuthenticated: boolean;
	hasCompletedAuthFlow: boolean;
	isBootstrapped: boolean;
	isLoading: boolean;
	error: string | null;
	token: string | null;
	user: User | null;
	selectedAddress: Address | null;
	pendingPhone: string | null;
	otpSent: boolean;
	otpVerified: boolean;
	otpLength: number;
	loginForm: LoginFormState;
	signupForm: SignupFormState;
	locationDraft: LocationDraft;

	setBootstrapped: () => void;
	finishSplash: () => void;
	completeOnboarding: () => void;
	setAuthMode: (mode: AuthMode) => void;
	setCurrentScreen: (screen: AuthScreen) => void;
	updateLoginForm: (patch: Partial<LoginFormState>) => void;
	updateSignupForm: (patch: Partial<SignupFormState>) => void;
	updateLocationDraft: (patch: Partial<LocationDraft>) => void;
	clearError: () => void;
	resetAuthForms: () => void;
	sendOtp: (phone?: string) => Promise<boolean>;
	verifyOtp: (code: string) => Promise<boolean>;
	login: () => Promise<boolean>;
	signup: () => Promise<boolean>;
	completeLocationSelection: (address?: Partial<Address>) => boolean;
	setSelectedAddress: (address: Address | null) => void;
	completeMockLogin: (user?: Partial<User>) => void;
	logout: () => void;
}

function buildFallbackUser(name: string, email: string, phone: string): User {
	return {
		id: `u-${Date.now()}`,
		name,
		email,
		phone,
	};
}

function createAddressFromDraft(draft: LocationDraft): Address {
	return {
		id: `addr-${Date.now()}`,
		label: draft.label.trim() || "Home",
		street: draft.street.trim(),
		city: draft.city.trim(),
		state: draft.state.trim(),
		pincode: draft.pincode.trim(),
		zone: draft.zone.trim() || undefined,
		area: draft.area.trim() || undefined,
	};
}

function getInitialScreen(state: Pick<AuthStore, "onboardingComplete" | "isAuthenticated">): AuthScreen {
	if (!state.onboardingComplete) return AuthScreen.Onboarding;
	if (!state.isAuthenticated) return AuthScreen.SignIn;
	return AuthScreen.Location;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			currentScreen: AuthScreen.Splash,
			authMode: "signin",
			splashComplete: false,
			onboardingComplete: false,
			isAuthenticated: false,
			hasCompletedAuthFlow: false,
			isBootstrapped: false,
			isLoading: false,
			error: null,
			token: null,
			user: null,
			selectedAddress: null,
			pendingPhone: null,
			otpSent: false,
			otpVerified: false,
			otpLength: OTP_LENGTH,
			loginForm: defaultLoginForm,
			signupForm: defaultSignupForm,
			locationDraft: defaultLocationDraft,

			setBootstrapped: () => set({ isBootstrapped: true }),

			finishSplash: () =>
				set((state) => ({
					splashComplete: true,
					currentScreen: getInitialScreen(state),
				})),

			completeOnboarding: () =>
				set({
					onboardingComplete: true,
					currentScreen: AuthScreen.SignIn,
					error: null,
				}),

			setAuthMode: (mode) =>
				set({
					authMode: mode,
					currentScreen: mode === "signin" ? AuthScreen.SignIn : AuthScreen.SignUp,
					error: null,
				}),

			setCurrentScreen: (screen) => set({ currentScreen: screen, error: null }),

			updateLoginForm: (patch) =>
				set((state) => ({
					loginForm: { ...state.loginForm, ...patch },
				})),

			updateSignupForm: (patch) =>
				set((state) => ({
					signupForm: { ...state.signupForm, ...patch },
				})),

			updateLocationDraft: (patch) =>
				set((state) => ({
					locationDraft: { ...state.locationDraft, ...patch },
				})),

			clearError: () => set({ error: null }),

			resetAuthForms: () =>
				set({
					loginForm: defaultLoginForm,
					signupForm: defaultSignupForm,
					locationDraft: defaultLocationDraft,
					pendingPhone: null,
					otpSent: false,
					otpVerified: false,
					error: null,
				}),

			sendOtp: async (phone) => {
				const candidatePhone = (phone ?? get().signupForm.phone).trim();
				if (!isValidPhone(candidatePhone)) {
					set({ error: "Enter a valid phone number." });
					return false;
				}

				set({ isLoading: true, error: null });
				const response = await api.auth.sendOtp(candidatePhone);

				if (!response.success) {
					set({ isLoading: false, error: response.message ?? "Could not send OTP." });
					return false;
				}

				set({
					isLoading: false,
					pendingPhone: candidatePhone,
					otpSent: true,
					otpVerified: false,
					currentScreen: AuthScreen.OTP,
				});
				return true;
			},

			verifyOtp: async (code) => {
				const phone = get().pendingPhone;
				if (!phone) {
					set({ error: "Request an OTP first." });
					return false;
				}

				const trimmed = code.trim();
				if (!isValidOtp(trimmed)) {
					set({ error: `Enter the ${OTP_LENGTH}-digit verification code.` });
					return false;
				}

				set({ isLoading: true, error: null });
				const response = await api.auth.verifyOtp(phone, trimmed);

				const localPass = trimmed === DEMO_OTP || response.success;
				if (!localPass || !response.data.verified) {
					set({ isLoading: false, error: response.message ?? "Verification failed." });
					return false;
				}

				set({
					isLoading: false,
					otpVerified: true,
					currentScreen: AuthScreen.Location,
					isAuthenticated: true,
					hasCompletedAuthFlow: false,
				});

				if (typeof window !== "undefined") {
					document.cookie = "nectar_auth=true; path=/; max-age=604800";
				}
				return true;
			},

			login: async () => {
				const { email, password } = get().loginForm;
				if (!isValidEmail(email.trim())) {
					set({ error: "Enter a valid email address." });
					return false;
				}

				if (password.trim().length < 6) {
					set({ error: "Password must be at least 6 characters." });
					return false;
				}

				set({ isLoading: true, error: null });
				const response = await api.auth.login(email.trim(), password);

				if (!response.success) {
					set({ isLoading: false, error: response.message ?? "Login failed." });
					return false;
				}

				set({
					isLoading: false,
					isAuthenticated: true,
					token: response.data.token,
					user: buildFallbackUser(email.split("@")[0] || "Guest", email.trim(), get().signupForm.phone || ""),
					currentScreen: AuthScreen.Location,
					hasCompletedAuthFlow: false,
				});

				if (typeof window !== "undefined") {
					document.cookie = "nectar_auth=true; path=/; max-age=604800";
				}
				return true;
			},

			signup: async () => {
				const { name, email, phone, password, confirmPassword } = get().signupForm;
				if (!name.trim() || name.trim().length < 3) {
					set({ error: "Name must be at least 3 characters." });
					return false;
				}

				if (!isValidEmail(email.trim())) {
					set({ error: "Enter a valid email address." });
					return false;
				}

				const digits = phone.replace(/\D/g, "");
				if (!isValidPhone(phone.trim()) || digits.length < 10) {
					set({ error: "Enter a valid phone number." });
					return false;
				}

				if (password.trim().length < 6) {
					set({ error: "Password must be at least 6 characters." });
					return false;
				}

				if (password !== confirmPassword) {
					set({ error: "Passwords do not match." });
					return false;
				}

				set({ isLoading: true, error: null });
				const response = await api.auth.signup(name.trim(), email.trim(), phone.trim());

				if (!response.success) {
					set({ isLoading: false, error: response.message ?? "Sign up failed." });
					return false;
				}

				set({
					isLoading: false,
					authMode: "signup",
					pendingPhone: phone.trim(),
					currentScreen: AuthScreen.OTP,
					otpSent: true,
					otpVerified: false,
					user: {
						id: response.data.userId,
						name: name.trim(),
						email: email.trim(),
						phone: phone.trim(),
					},
				});
				return true;
			},

			completeLocationSelection: (address) => {
				const draft = get().locationDraft;
				const finalAddress = {
					...createAddressFromDraft(draft),
					...address,
				} satisfies Address;

				if (!finalAddress.street || !finalAddress.city || !finalAddress.state || !finalAddress.pincode) {
					set({ error: "Complete the address fields before continuing." });
					return false;
				}

				const currentUser = get().user;
				set({
					selectedAddress: finalAddress,
					user: currentUser ? { ...currentUser, address: finalAddress } : currentUser,
					hasCompletedAuthFlow: true,
					currentScreen: AuthScreen.Location,
					error: null,
				});

				if (typeof window !== "undefined") {
					document.cookie = `nectar_location=${encodeURIComponent(finalAddress.street)}; path=/; max-age=604800`;
				}
				return true;
			},

			setSelectedAddress: (address) =>
				set((state) => ({
					selectedAddress: address,
					user: state.user ? { ...state.user, address: address ?? undefined } : state.user,
				})),

			completeMockLogin: (user) =>
				set((state) => ({
					isAuthenticated: true,
					hasCompletedAuthFlow: true,
					token: `mock-social-token-${Date.now()}`,
					user: {
						id: user?.id ?? `u-${Date.now()}`,
						name: user?.name ?? "Guest",
						email: user?.email ?? "",
						phone: user?.phone ?? "",
						avatar: user?.avatar,
						address: user?.address,
					},
					currentScreen: state.currentScreen,
				})),

			logout: () =>
				set((state) => ({
					currentScreen: state.onboardingComplete ? AuthScreen.SignIn : AuthScreen.Onboarding,
					isAuthenticated: false,
					hasCompletedAuthFlow: false,
					token: null,
					user: null,
					selectedAddress: null,
					pendingPhone: null,
					otpSent: false,
					otpVerified: false,
					isLoading: false,
					error: null,
					loginForm: defaultLoginForm,
					signupForm: defaultSignupForm,
					locationDraft: defaultLocationDraft,
					authMode: "signin",
				}),
				() => {
					if (typeof window !== "undefined") {
						document.cookie = "nectar_auth=; path=/; max-age=0";
						document.cookie = "nectar_location=; path=/; max-age=0";
					}
				}),
		}),
		{
			name: "nectar-auth",
			partialize: (state) => ({
				currentScreen: state.currentScreen,
				authMode: state.authMode,
				splashComplete: state.splashComplete,
				onboardingComplete: state.onboardingComplete,
				isAuthenticated: state.isAuthenticated,
				hasCompletedAuthFlow: state.hasCompletedAuthFlow,
				token: state.token,
				user: state.user,
				selectedAddress: state.selectedAddress,
			}),
		}
	)
);
