module.exports = function CreateAlterSequence({ http }) {
    return async () => {
        const response = await http.get(`localhost:5000/sequence/`);
        if (response.data) {
            return true;
        } else {
            return false;
        }
    };
};