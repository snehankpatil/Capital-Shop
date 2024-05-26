const User = require("../Model/User");

exports.CreateNewUser = async (request, response) => {
    try {
        const {
            id, username, password, firstName, lastName,
            country, streetAddress, state, zipcode, city,
            mobile_no, gender
        } = request.body;

        console.log(id, username, firstName, lastName, country, streetAddress, state, zipcode, city, mobile_no, gender);

         
        const NewUser = await User.create({
            id, username, password, firstName, lastName,
            country, streetAddress, state, zipcode, city,
            mobile_no, gender
        });

        return response.status(200).json({
            success: true,
            data: NewUser,
            message: "User is created successfully"
        });

    } catch (e) {
        console.log(e);
        response.status(500).json({
            success: false,
            message: e.message
        });
    }
}
