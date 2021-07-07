function validate(data) {
    const { login, password, confirmPassword, license, firstName, gender } = data;

    if (!login || !password) {
        alert('Укажите логин/пароль');
    } else if (login == 'beeline' || login == 'beeinterns' || login == 'bee') {
        alert('Указанный логин уже кем-то занят');
    } else if (password.length < 6) {
        alert('Пароль должен быть длинной не менее 6 символов');
    } else if (password !== confirmPassword) {
        alert('Пароли должны совпадать');
    } else if (!firstName) {
        alert('Укажите имя');
    } else if (!license) {
        alert('Необходимо согласие');
    } else {
        let dear = (gender == 'male') ? 'Уважаемый' : 'Уважаемая';
        alert(`${dear}, ${firstName} заявка создана`);
    }
}
