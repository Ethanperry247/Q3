module.exports = function CreateAlterLid({ http }) {
    return async (state) => {
        const response = await http.get(`localhost:5000/lid/${state}`);
        if (response.data) {
            return true;
        } else {
            return false;
        }
    };
};