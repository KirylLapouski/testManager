import * as validation from '../../../src/modules/validation'
import deepFreeze from 'deep-freeze'
describe('validateEmail', () => {
    it('it does NOT mutate argumenets', () => {
        let email = {}
        expect(() => { validation.validateEmail(email) }).not.toThrow()
    })

    it('it return same value on same argumenets', () => {
        let email = 'check@check.ch'
        let res = []
        res.push(validation.validateEmail(email))
        res.push(validation.validateEmail(email))
        res.push(validation.validateEmail(email))
        expect(JSON.stringify(res)).toBe(JSON.stringify([true, true, true]))
    })

    it('email with domain more than 5 characters is NOT valid',()=>{
        let email = 'check@check.qweqwe'
        expect(validation.validateEmail(email)).toBe(false)
    })

    it('email with no domain name in it is NOT valid',()=>{
        let email ='check@check.'
        expect(validation.validateEmail(email)).toBe(false)
    })

    it('email with no @ is NOT valid', ()=>{
        let email = 'checkcheck.rt'
        expect(validation.validateEmail(email)).toBe(false)
    })

    it(' . is valid character for mail provider and mail name',()=>{
        let email = '....@....ru'
        expect(validation.validateEmail(email)).toBe(true)
    })

    it('number are valid mail provider and mail name',()=>{
        let email = '00000@00000.by'
        expect(validation.validateEmail(email)).toBe(true)
    })
})

describe('validateName', ()=>{
    it('name cannot contain numbers',()=>{
        let name = 'asdaasd1'
        expect(validation.validateName(name)).toBe(false)
        name = '1asdfasdf'
        expect(validation.validateName(name)).toBe(false)
        name = 'asd1sad'
        expect(validation.validateName(name)).toBe(false)
    })
    it('name can contain cyrillic`s alphabet number',()=>{
        let name = 'йцукенгшщзхъфывапролджэячсмитьбюёЙЦУКЕНГШЩЗХФЫВАПРОЛДЖЯЧСМИТЬБЮ'
        expect(validation.validateName(name)).toBe(true)
    })
})
