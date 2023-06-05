const {isInvalidEmail, isEmptyPayload} = require('../validator')

test('valid email', function(){
    const testPayloaod = {
     name: "test name",
     email: "test.email@example.com",
     interests: "testing"
    }

    const result = isInvalidEmail(testPayloaod)
    expect(result).toBe(false)
})




test('invalid email', function(){
    const testPayloaod = {
     name: "test name",
     email: "test.email",
     interests: "testing"
    }

    const result = isInvalidEmail(testPayloaod)
    expect(result).toBe(true)
})


test('empty payload', function(){
    const testPayload = {}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})


test('non-empty payload', function(){
    const testPayload = {
        name: "test name",
       email: "test.email",
       interests: "testing"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})