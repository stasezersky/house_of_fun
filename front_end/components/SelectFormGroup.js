const SelectFormGroup = (props) => (
    <div className="form-group">
        <label>
            {props.name}
            <br />
        <select value={props.value} onChange={props.handler} name={props.name}>
            {props.types.map(value =>  <option value={value}>{value}</option>)}
          </select>
          </label>
    </div>
)

export default SelectFormGroup