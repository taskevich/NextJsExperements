export function LoginForm(props) {
    return (
        <>
            <div className="f-element">
                <input type="text" value={props.username} onChange={(e) => props.onChangeUsername(e.target.value)} name="username" placeholder="Имя пользователя"></input>
            </div>
            <div className="f-element">
                <input type="text" value={props.password} onChange={(e) => props.onChangePassword(e.target.value)} name="password" placeholder="Пароль"></input>
            </div>
            <div className="f-element">
                <button type="submit">Войти</button>
            </div>
        </>
    )
}