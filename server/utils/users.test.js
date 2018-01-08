const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Dev'
        },{
            id: '2',
            name: 'Jen',
            room: 'VueJS Dev'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Dev'
        }];
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'John',
            room: 'Node Dev'
        }

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([resUser]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
    
    it('should find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    
    it('should not find a user', () => {
        var userId = '130984';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });

    it('should return names for Node Dev', () => {
        var names = users.getUserList('Node Dev');
        expect(names).toEqual(['Mike', 'Julie']);
    });
    
    it('should return names for React Dev', () => {
        var names = users.getUserList('VueJS Dev');
        expect(names).toEqual(['Jen']);
    });
});