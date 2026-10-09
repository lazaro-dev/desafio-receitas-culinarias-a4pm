describe('sum', () => {
    it('1 + 1 = 2', () => {
        console.log('sum test', process.env.JWT_SECRET);

        // const crypto = require('crypto');
        // const key = crypto.randomBytes(32).toString('hex');
        // console.log(key);
        expect(1 + 1).toBe(2)
    })
})