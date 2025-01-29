interface User {
	id: string;
	name: string;
	email: string;
}

const users: User[] = [];

export const getAllUsers = async (): Promise<User[]> => {
	return users;
};

export const getUser = async (id: string): Promise<User | undefined> => {
	return users.find((user) => user.id === id);
};

export const addUser = async (user: User): Promise<User> => {
	users.push(user);
	return user;
};
