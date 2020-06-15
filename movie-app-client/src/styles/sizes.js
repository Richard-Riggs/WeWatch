const sizes = {
	xs: '0px',
	sm: '650px',
	md: '960px',
	lg: '1280px',
	xl: '1920px'
};

export default {
	down: (size) => `@media (max-width: ${sizes[size]})`,
	up: (size) => `@media (min-width: ${sizes[size]})`
};
