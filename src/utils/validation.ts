export const validateEmail = (email: string): string | null => {
	if (!email) return "Email is required";
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!re.test(email)) return "Enter a valid email address";
	return null;
};

export const validatePassword = (password: string): string | null => {
	if (!password) return "Password is required";
	if (password.length < 6) return "Password must be at least 6 characters";
	return null;
};

export const validatePhone = (phone: string): string | null => {
	if (!phone) return "Phone number is required";
	const digits = phone.replace(/\D/g, "");
	if (digits.length < 10) return "Enter a valid phone number";
	return null;
};

export const validateName = (name: string): string | null => {
	if (!name) return "Name is required";
	if (name.trim().length < 3) return "Name must be at least 3 characters";
	return null;
};

export const formatPrice = (price: number): string => {
	return `$${price.toFixed(2)}`;
};

export const calculateDiscount = (original: number, current: number): number => {
	return Math.round(((original - current) / original) * 100);
};
