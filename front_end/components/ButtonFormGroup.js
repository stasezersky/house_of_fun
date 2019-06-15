const ButtonFormGroup = (props) => (
    <div className="form-group">
        <input id="login-button" type="submit" className="btn btn-primary w-100"
            flavor="primary-rev" value={props.value} />
    </div>
)

export default ButtonFormGroup