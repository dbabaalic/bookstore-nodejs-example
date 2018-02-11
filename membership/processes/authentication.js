var AuthenticationResult = function(args) {
    let result = {};
    result.success = args.success || false;
    result.message = args.message || '';
    result.token = args.token;
    return result;
}

let Authentication = function(db) {

    function authenticateOk() {
        return new AuthenticationResult({
            success: true,
            message: 'Successfully authenticated user',
            token: 'sample token'
        });
    }

    function authenticateNotOk (message) {
        return new AuthenticationResult({
            success: false,
            message: message,
            token: null
        });
    }

    function existEmail(email) {
        return new Promise((resolve, reject) => {
            db.users.count({ email }, function (err, numberOfUsers) {
                if(err) reject(err);
                resolve(numberOfUsers === 1);
            });
        });
    }

    async function authenticate(email) {
        const emailExist = await existEmail(email);
        if(!emailExist){
            return authenticateNotOk('Email dont exist');
        }
        return authenticateOk();
    }

    return {
        authenticate
    }
}

module.exports = Authentication;