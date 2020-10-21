global.print = (...input) => {
	if (process.env.NODE_ENV !== "production") {
		console.log(...input);
	}
}