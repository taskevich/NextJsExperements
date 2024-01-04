export function RegistrationForm(props) {
    return (
        <>
            <div className="f-element">
                <input type="text" value={props.username} onChange={(e) => props.onChangeUsername(e.target.value)} name="username" placeholder="Имя пользователя"></input>
            </div>
            <div className="f-element">
                <input type="text" value={props.email} onChange={(e) => props.onChangeEmail(e.target.value)} name="email" placeholder="Почта"></input>
            </div>
            <div className="f-element">
                <input type="text" value={props.password} onChange={(e) => props.onChangePassword(e.target.value)} name="password" placeholder="Пароль"></input>
            </div>
            <div className="f-element">
                <input type="text" value={props.password2} onChange={(e) => props.onChangePassword2(e.target.value)} name="password2" placeholder="Подтверждение пароля"></input>
            </div>
            <div className="f-element">
                <button type="submit">Зарегистрироваться</button>
            </div>
        </>
    )
}