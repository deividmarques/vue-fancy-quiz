const mixin = require("./mixin")
// @ponicode
describe("mixin.default.mounted", () => {
    test("0", () => {
        let callFunction = () => {
            mixin.default.mounted()
        }
    
        expect(callFunction).not.toThrow()
    })
})
