module.exports = function CreateCalibrate({ http }) {
    return async () => {
        const response = await http.get(`localhost:5000/calibrate/`);
        if (response.data) {
            return true;
        } else {
            return false;
        }
    };
};