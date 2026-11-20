export function pluralizePoints(points: number) {
	return points === 1 ? '1 punto' : `${points} punti`;
}

const dateFormatters = {
	short: new Intl.DateTimeFormat('it', { dateStyle: 'short' }),
	long: new Intl.DateTimeFormat('it', { dateStyle: 'long' }),
};

/** Formats a date in Italian, reusing the formatter across calls. */
export function formatDate(
	date: Date,
	style: keyof typeof dateFormatters = 'short',
) {
	return dateFormatters[style].format(date);
}
