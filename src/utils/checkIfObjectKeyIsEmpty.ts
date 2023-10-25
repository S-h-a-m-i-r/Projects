const checkIfObjectKeyIsEmpty = (obj: Object): boolean => {
	return Object.values(obj).some((v) => v === "" || v === null);
};

export default checkIfObjectKeyIsEmpty;
