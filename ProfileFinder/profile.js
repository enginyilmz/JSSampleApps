class Profile {
    constructor() {
        this.clientid = '',
        this.clientSecret = ''
    }

    async getProfile(username) {
        const profileResponse = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
        const profile = await profileResponse.json();

        const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`)
        const todo = await todoResponse.json();

        return {
            profile,
            todo
        }

    }

    async getAllProfile(){
        const profilesResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const profiles = await profilesResponse.json();

        return{
            profiles
        }
    }

}