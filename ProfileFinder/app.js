const profile = new Profile();
const ui = new UI();

const el_searchProfile = document.querySelector('#searchProfile');
const el_selectUser = document.getElementById('selectUser');

el_searchProfile.addEventListener('keyup', (event) => {
    ui.clear();
    let text = event.target.value;

    if (text !== '' && text.length > 3) {
        profile.getProfile(text)
            .then(res => {
                if (res.profile.length === 0) {
                    ui.showAlert(text);
                } else {
                    ui.showProfile(res.profile[0]);
                    ui.showTodo(res.todo);
                }
            })
            .catch(err => {
                ui.showAlert(text);
            })
    }
});

//load profiles
profile.getAllProfile().then(res => {
    for (let i = 0; i < res.profiles.length; i++) {
        el_selectUser.innerHTML += ` <option value=${res.profiles[i].id}>${res.profiles[i].username}</option>`;
    }
})

el_selectUser.addEventListener('change', function (e) {
    if (e.target.value === "") {
        ui.clear();
    }
    else {
        const text = e.target.options[e.target.selectedIndex].text;
        profile.getProfile(text)
            .then(res => {
                ui.showProfile(res.profile[0]);
                ui.showTodo(res.todo);
            })
    }
}, false)

