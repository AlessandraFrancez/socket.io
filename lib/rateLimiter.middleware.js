const { RateLimiter } = require('limiter');


class RateLimiting {
    constructor() {
        this.limiter = new RateLimiter(10, 500, true);
        this.index = this.index.bind(this);
    }
    
    index(req,res,next){
        try {
            this.limiter.removeTokens(1, function(err, remainingRequests) {
                console.log('Remaining', remainingRequests);
                if (remainingRequests < 1) {
                    res.writeHead(429, {'Content-Type': 'text/plain;charset=UTF-8'});
                    res.end('429 Too Many Requests - your IP is being rate limited');
                    // res.status(429).json({ message: 'Too many requests' });
                    console.log('Too many requests');
                }
            });
        }
        catch(err){
            console.log('Erro', err);
        }
    }
}

module.exports = new RateLimiting();