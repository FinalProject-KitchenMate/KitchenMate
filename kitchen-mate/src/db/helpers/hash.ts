import bcrypt from 'bcryptjs';

export const hashText = (text: string) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(text, salt);
	return hash;
};

export const compareTextWithHash = (text: string, hash: string) => {
	return bcrypt.compareSync(text, hash);
};