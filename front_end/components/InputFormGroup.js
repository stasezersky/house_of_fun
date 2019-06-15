const InputFormGroup = (props) => (
    <div className="form-group">
        <label>
            {props.name}
            <br />
            <input className="w-100" id={props.name} value={props.value}
                onChange={props.handler}
                type="text" name={props.name}
                placeholder={props.name} />
        </label>
    </div>
)

export default InputFormGroup